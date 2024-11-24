import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from './Header';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <Header name={isLogin ? 'Prijava' : 'Registracija Uporabnika 📝'} />
      <View style={styles.container}>
        {!isLogin && (
          <TextInput
            label="Ime in Priimek"
            theme={{ colors: { primary: '#00aaff' } }}
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
        )}
        <TextInput
          label="E-pošta"
          theme={{ colors: { primary: '#00aaff' } }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          label="Geslo"
          theme={{ colors: { primary: '#00aaff' } }}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <Button
          mode="contained"
          theme={{ colors: { primary: '#00aaff' } }}
          onPress={() => console.log(isLogin ? 'Login pressed' : 'Register pressed')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{isLogin ? 'Prijava' : 'Registracija'}</Text>
        </Button>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>
            {isLogin ? 'Še nimate računa? Registracija' : 'Že imate račun? Prijava'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
  },
  toggleText: {
    textAlign: 'center',
    color: '#00aaff',
    marginTop: 10,
  },
});

export default AuthScreen;
