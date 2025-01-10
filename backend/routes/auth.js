const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config();

const router = express.Router()


// registracija novega uporabnika
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Uporabnik obstaja' });
    }
    
    //zašifriramo geslo
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Uspešna registracija uporabnika!' });
    } catch (error){
        res.status(500).json({ error: 'Server error' });
    }
})

// prijava obstoječega uporabnika
router.post('/login', async (req, res)=>{
    const { email, password } = req.body;
    try
    {
        //preveri se ali urporabnik obstaja
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Napacno uporabnisko ime ali geslo' });
        }

        //primerja se z geslom v bazi
        const seUjema = await bcrypt.compare(password, user.password);

        if (!seUjema) {
            return res.status(400).json({ error: 'Napacno uporabnisko ime ali geslo' });
        }
    
        //kreiranje jwt tokena
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
    
    
        res.json({message: 'Prijava uspešna', token, user: {name: user.name, email: user.email}})
    
    }
    catch (error){
        console.error('Napaka pri registraciji:', error.message);
        res.status(500).json({error: "Server error"});
    }
})

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch {
      res.status(403).json({ error: 'Invalid token' });
    }
  };

// operacija update
router.put('/update', async (req, res) => {
    const { id, name, email, password } = req.body;

    try {
        console.log('Update Request:', req.body); 

       
        if (!id) {
            return res.status(400).json({ error: 'ID manjka' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'Uporabnik ni bil najden' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        console.log('Uporabnik je bil uspešno posodobljen:', user); 

        return res.json({ 
            message: 'Uporabnik je bil uspešno posodobljen:y', 
            user: { id: user._id, name: user.name, email: user.email } 
        });
    } catch (error) {
        console.error('Update Error:', error.message); 
        return res.status(500).json({ error: 'Server error', details: error.message });
    }
});

//operacija get
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('-password'); 
        if (!user) {
            return res.status(404).json({ error: 'Uporabnik ni bil najden' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Fetch User Error:', error.message);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

//operacija delete
router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'Uporabnik ni bil najden' });
        }

        res.json({ message: 'Uporabnik je bil uspešno izbrisan:' });
    } catch (error) {
        console.error('Delete User Error:', error.message);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;
