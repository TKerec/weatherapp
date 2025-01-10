import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Header from './Header';
import axios from 'axios';



const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const API_URL = 'http://10.0.2.2:3000/api/auth';



  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Napaka', 'Vsa polja morajo biti izpolnjena.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      Alert.alert('Uspešno', response.data.message);
      setIsLogin(true); 
    } catch (error) {
      console.error(error);
      Alert.alert(
       'Prišlo je do napake med registracijo'
      );
    }
  };


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Napaka', 'Vsa polja morajo biti izpolnjena.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const loggedUser = response.data.user;

      Alert.alert('Uspešno', `Prijavljeni ste kot $${loggedUser.name}`);
      navigation.navigate('Search', { user: loggedUser}); 
    } catch (error) {
      console.error(error);
      Alert.alert(
         'Prišlo je do napake med prijavo'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header name={isLogin ? 'Prijava' : 'Registracija Uporabnika 📝'} />
      <View style={styles.innerContainer}>
        {!isLogin && (
          <TextInput
            label="Ime in Priimek"
            theme={{ colors: { primary: '#00aaff' } }}
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        )}
        <TextInput
          label="E-pošta"
          theme={{ colors: { primary: '#00aaff' } }}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          label="Geslo"
          theme={{ colors: { primary: '#00aaff' } }}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button
          mode="contained"
          theme={{ colors: { primary: '#00aaff' } }}
          onPress={isLogin ? handleLogin : handleRegister}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isLogin ? 'Prijava' : 'Registracija'}
          </Text>
        </Button>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>
            {isLogin
              ? 'Še nimate računa? Registracija'
              : 'Že imate račun? Prijava'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    margin: 20,
    marginTop: 50,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  toggleText: {
    textAlign: 'center',
    color: '#00aaff',
    marginTop: 10,
    fontSize: 14,
  },
});

export default AuthScreen;
