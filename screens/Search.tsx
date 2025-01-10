import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button, Card, IconButton } from 'react-native-paper';
import Header from './Header';

// API KLJUČ!
const WEATHER_API_KEY = '99006a27af4a140efcefac3ab5eeabe9';

// imena ikon glede na string, ki pride iz API-ja
const ikoneZaVreme = {
  Clear: 'weather-sunny',
  Clouds: 'weather-cloudy',
  Rain: 'weather-rainy',
  Snow: 'weather-snowy',
  Drizzle: 'weather-pouring',
  Thunderstorm: 'weather-lightning',
  Mist: 'weather-fog',
  Smoke: 'weather-fog',
  Haze: 'weather-hazy',
  Dust: 'weather-dust',
  Fog: 'weather-fog',
  Sand: 'weather-dust',
  Ash: 'weather-fog',
  Squall: 'weather-windy',
  Tornado: 'weather-tornado',
};

// Začetni seznam priljubljenih krajev
const initialFavorites = [
  {
    id: 1,
    name: 'Ljubljana',
    country: 'SI',
    temp: 15,
    description: 'clear sky',
    icon: 'Clear',
  },
  {
    id: 2,
    name: 'Maribor',
    country: 'SI',
    temp: 18,
    description: 'few clouds',
    icon: 'Clouds',
  },
  {
    id: 3,
    name: 'Kranj',
    country: 'SI',
    temp: 12,
    description: 'rainy',
    icon: 'Rain',
  },
  {
    id: 4,
    name: 'Celje',
    country: 'SI',
    temp: 16,
    description: 'snowy',
    icon: 'Snow',
  },
  {
    id: 5,
    name: 'Koper',
    country: 'SI',
    temp: 20,
    description: 'drizzle',
    icon: 'Drizzle',
  },
];

const Search = ({ route, navigation }) => {
  const user = route.params?.user;

  const [city, setCity] = useState('');
  // SHrani vreme kraja
  const [weatherData, setWeatherData] = useState(null);
  // Shrani kvaliteto zraka
  const [airQualityData, setAirQualityData] = useState(null);
  // Nastavljanje priljubljenih
  const [favorites, setFavorites] = useState(initialFavorites);


  const fetchAirQuality = async (lat, lon) => {
    try {
      const airQualityUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(airQualityUrl);
      const aqData = await response.json();

      if (aqData?.list) {
        setAirQualityData(aqData);
      } else {
        setAirQualityData(null);
      }
    } catch (error) {
      console.error('Napaka pri klicu AirQuality API:', error);
      setAirQualityData(null);
    }
  };


  const fetchWeather = async (cityName) => {
    if (!cityName) {
      setWeatherData(null);
      setAirQualityData(null);
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        // Ko so pridobljeni podatki o vremenu naredi s pomočjo pridobljenih koordinat še fetch za kakovorst zraka
        if (data.coord?.lat && data.coord?.lon) {
          fetchAirQuality(data.coord.lat, data.coord.lon);
        }
      } else {
        setWeatherData(null);
        setAirQualityData(null);
        console.warn('Napaka pri iskanju mesta:', data.message);
      }
    } catch (error) {
      console.error('Napaka pri klicu API:', error);
      setWeatherData(null);
      setAirQualityData(null);
    }
  };


  const clearSearch = () => {
    setCity('');
    setWeatherData(null);
    setAirQualityData(null);
  };

  //dodaj med priljubljene
  const addToFavorites = () => {
    if (!weatherData) return;

    const exists = favorites.some((fav) => fav.id === weatherData.id);
    if (!exists) {
      setFavorites([
        ...favorites,
        {
          id: weatherData.id,
          name: weatherData.name,
          country: weatherData.sys?.country,
          temp: weatherData.main.temp,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].main,
        },
      ]);
    }
  };

  // klik na priljubljen kraj iz seznama
  const handleFavoritePress = async (item) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${item.name}&units=metric&appid=${WEATHER_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        
        if (data.coord?.lat && data.coord?.lon) {
          fetchAirQuality(data.coord.lat, data.coord.lon);
        }
      } else {
        setWeatherData(null);
        setAirQualityData(null);
        console.warn('Napaka pri pridobivanju detajlov za:', item.name);
      }
    } catch (error) {
      console.error('Napaka pri klicu API (FavoritePress):', error);
      setWeatherData(null);
      setAirQualityData(null);
    }
  };

  //prikaz vseh priljubljenih krajev (render)
  const FavoriteItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleFavoritePress(item)}>
      <Card style={{ marginBottom: 10, padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16 }}>
            {item.name} ({item.country})
          </Text>
          <IconButton
            icon={ikoneZaVreme[item.icon] || 'weather-partly-cloudy'}
            size={24}
            color="#00aaff"
          />
        </View>
        <Text style={{ fontSize: 14 }}>
          {item.temp} °C - {item.description}
        </Text>
      </Card>
    </TouchableOpacity>
  );

  //prikaz vseh vremeske kartice (render)
  const renderWeatherCard = () => {
    if (!weatherData) return null;

    return (
      <Card style={{ margin: 20, padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {weatherData.name} ({weatherData.sys?.country})
          </Text>
          <IconButton
            icon={ikoneZaVreme[weatherData.weather[0].main] || 'weather-partly-cloudy'}
            size={30}
            color="#00aaff"
          />
        </View>
        <Text>Vreme: {weatherData.weather[0].description}</Text>
        <Text>Temperatura: {weatherData.main.temp} °C</Text>
        <Text>Vlažnost: {weatherData.main.humidity}%</Text>
        <Text>Veter: {weatherData.wind.speed} m/s</Text>

        {/* kakovost zraka */}
        {airQualityData && airQualityData.list && airQualityData.list.length > 0 && (
          <View style={{ backgroundColor: '#f0f8ff', marginTop: 10, padding: 10, borderRadius: 5 }}>
            <Text style={{ fontWeight: 'bold' }}>Kakovost zraka:</Text>

            <Text>AQI: {airQualityData.list[0].main.aqi}</Text>
            <Text>PM2.5: {airQualityData.list[0].components.pm2_5}</Text>
            <Text>PM10: {airQualityData.list[0].components.pm10}</Text>
            <Text>CO: {airQualityData.list[0].components.co}</Text>
            <Text>O3: {airQualityData.list[0].components.o3}</Text>
          </View>
        )}

        {/* dodaj med priljubljene */}
        <Button
          icon="heart"
          mode="text"
          onPress={addToFavorites}
          style={{ marginTop: 10 }}
        >
          Dodaj med priljubljene
        </Button>
      </Card>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Header
        name="Poišči vreme na željeni lokaciji"
        onSettingsPress={() => navigation.navigate('UserSettings', { user })}
        onBarometerPress={() => navigation.navigate('SensorScreen')}
      />

      {/* polje za vnos besedila za iskanje */}
      <TextInput
        label="ime kraja"
        theme={{ colors: { primary: "#00aaff" } }}
        value={city}
        onChangeText={setCity}
        style={{ margin: 20 }}
      />

      {/* Gumb za iskanje */}
      <Button
        mode="contained"
        theme={{ colors: { primary: "#00aaff" } }}
        style={{ marginHorizontal: 20 }}
        onPress={() => fetchWeather(city)}
      >
        <Text style={{ color: "white" }}>Iskanje</Text>
      </Button>

      {/* Gumb počisti */}
      <Button
        mode="outlined"
        theme={{ colors: { primary: "#00aaff" } }}
        style={{ marginHorizontal: 20, marginTop: 10 }}
        onPress={clearSearch}
      >
        <Text>Počisti/Vrni se</Text>
      </Button>
      {renderWeatherCard()}

      {/* če je weatherData prazen pokaži seznam priljubljenih */}
      {!weatherData && (
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Priljubljeni kraji:
          </Text>
          {favorites.length > 0 ? (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <FavoriteItem item={item} />}
            />
          ) : (
            <Text>Ni priljubljenih krajev.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default Search;
