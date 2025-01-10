import React, { useState } from 'react';
import { TextInput, Button, Switch, Card } from 'react-native-paper';
import { View, Text, Alert } from 'react-native';
import Header from './Header';
import axios from 'axios';

// API naslov za klic
const API_URL = 'http://10.0.2.2:3000/api/auth';

const UserSettings = ({ route, navigation }) => {
  const passedUser = route.params?.user || {}; //podatki prijavljenega uproabnika

  const [name, setName] = useState(passedUser?.name || '');
  const [email, setEmail] = useState(passedUser?.email || '');

  return (
    <View style={{ flex: 1 }}>
      <Header name="Nastavitve Uporabnika ⚙️" />
      <View style={{ margin: 20 }}>
        <TextInput
          label="Ime in Priimek"
          theme={{ colors: { primary: '#00aaff' } }}
          value={name}
          onChangeText={(text) => setName(text)}
          style={{ marginBottom: 20 }}
        />

        <TextInput
          label="E-pošta"
          theme={{ colors: { primary: '#00aaff' } }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{ marginBottom: 20 }}
        />

        <Button
          mode="outlined"
          theme={{ colors: { primary: '#00aaff' } }}
          onPress={() => navigation.navigate('AuthScreen')}
        >
          <Text style={{ color: '#00aaff' }}>Odjava</Text>
        </Button>
      </View>
    </View>
  );
};

export default UserSettings;
