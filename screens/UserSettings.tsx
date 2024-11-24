import React, { useState } from 'react';
import { TextInput, Button, Switch, Card } from 'react-native-paper';
import { View, Text } from 'react-native';
import Header from './Header';

const UserSettings = () => {
  const [name, setName] = useState('Janez Novak');
  const [email, setEmail] = useState('janez.novak@example.com');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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

        <TextInput
          label="Novo Geslo"
          theme={{ colors: { primary: '#00aaff' } }}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{ marginBottom: 20 }}
        />

        <Card style={{ marginBottom: 20, padding: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Obvestila</Text>
            <Switch
              value={notifications}
              onValueChange={() => setNotifications(!notifications)}
              color="#00aaff"
            />
          </View>
        </Card>

        <Card style={{ marginBottom: 20, padding: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Temni Način</Text>
            <Switch
              value={darkMode}
              onValueChange={() => setDarkMode(!darkMode)}
              color="#00aaff"
            />
          </View>
        </Card>

        <Button
          mode="contained"
          theme={{ colors: { primary: '#00aaff' } }}
          onPress={() => console.log('Changes saved')}
          style={{ marginBottom: 20 }}
        >
          <Text style={{ color: 'white' }}>Shrani Spremembe</Text>
        </Button>

        <Button
          mode="outlined"
          theme={{ colors: { primary: '#00aaff' } }}
          onPress={() => console.log('User logged out')}
        >
          <Text style={{ color: '#00aaff' }}>Odjava</Text>
        </Button>
      </View>
    </View>
  );
};

export default UserSettings;
