import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';

const Home = () => {
    // podatki pridejo v takšni obliki iz API-ja
  const podatki = {
    city: 'London',
    temperature: '9.58',
    humidity: '76',
    description: 'scattered clouds',
    icon: 'https://openweathermap.org/img/wn/03d@2x.png',
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <View style={{ width: '100%', backgroundColor: '#00aaff', padding: 15, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Stanje Vremena</Text>
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{podatki.city}</Text>
      <Image source={{ uri: podatki.icon }} style={{ width: 100, height: 100, marginVertical: 10 }} />
      <Card style={{ width: '90%', marginVertical: 10, padding: 15 }}>
        <Text style={{ fontSize: 16 }}>Temperatura - {podatki.temperature}°C</Text>
      </Card>
      <Card style={{ width: '90%', marginVertical: 10, padding: 15 }}>
        <Text style={{ fontSize: 16 }}>Vlažnost - {podatki.humidity}%</Text>
      </Card>
      <Card style={{ width: '90%', marginVertical: 10, padding: 15 }}>
        <Text style={{ fontSize: 16 }}>Opis - {podatki.description}</Text>
      </Card>
    </View>
  );
};

export default Home;
