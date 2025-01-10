import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { setUpdateIntervalForType, SensorTypes, accelerometer, barometer, gyroscope } from 'react-native-sensors';
import Header from './Header';

const SensorScreen = ({ navigation }) => {
  // Stanje barometra
  const [pressure, setPressure] = useState<number | null>(null);
  const [isBarometerAvailable, setIsBarometerAvailable] = useState(false);
  // Stanje accelerometra
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [isAccelerometerAvailable, setIsAccelerometerAvailable] = useState(false);
  // Stanje žiroskopa
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [isGyroscopeAvailable, setIsGyroscopeAvailable] = useState(false);

  useEffect(() => {
    let barometerSubscription: any = null;
    let accelerometerSubscription: any = null;
    let gyroscopeSubscription: any = null;
    // nastavitev barometra
    const setupBarometer = async () => {
      try {
        setUpdateIntervalForType(SensorTypes.barometer, 1000); // posodovitev vsako sekundo

        barometerSubscription = barometer.subscribe(({ pressure }) => {
          setPressure(pressure);
        });

        setIsBarometerAvailable(true);
      } catch (error) {
        console.error('Napaka na senzorju barometra:', error);
        setIsBarometerAvailable(false);
      }
    };

    // nastavitev accelerometra
    const setupAccelerometer = async () => {
      try {
        setUpdateIntervalForType(SensorTypes.accelerometer, 500); // posodobitev vsake pol sekunde
        accelerometerSubscription = accelerometer.subscribe(({ x, y, z }) => {
          setAcceleration({ x, y, z });
        });

        setIsAccelerometerAvailable(true);
      } catch (error) {
        console.error('Napaka na senzorju pospeškometra:', error);
        setIsAccelerometerAvailable(false);
      }
    };

    // nastavitev ziroskopa
    const setupGyroscope = async () => {
      try {
        setUpdateIntervalForType(SensorTypes.gyroscope, 500); // posodobitev vsake pol sekunde
        gyroscopeSubscription = gyroscope.subscribe(({ x, y, z }) => {
          setGyroscopeData({ x, y, z });
        });

        setIsGyroscopeAvailable(true);
      } catch (error) {
        console.error('Napaka na senzorju žiroskopa:', error);
        setIsGyroscopeAvailable(false);
      }
    };
    setupBarometer();
    setupAccelerometer();
    setupGyroscope();


    return () => {
      if (barometerSubscription) barometerSubscription.unsubscribe();
      if (accelerometerSubscription) accelerometerSubscription.unsubscribe();
      if (gyroscopeSubscription) gyroscopeSubscription.unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header 
        name="Senzorji" 
        onSettingsPress={() => navigation.navigate('UserSettings')} 
      />
      
      {/*podatki barometra*/}
      <Card style={styles.card}>
        <Text style={styles.text}>
          {isBarometerAvailable
            ? `Trenutni zračni tlak: ${pressure !== null ? pressure.toFixed(2) : 'Merjenje...'} hPa`
            : 'Merilnik zračnega tlaka ni na voljo na tej napravi.'}
        </Text>
      </Card>

      {/*podatki pospeškometra*/}
      <Card style={styles.card}>
        <Text style={styles.text}>Podatki pospeškometra:</Text>
        {isAccelerometerAvailable ? (
          <>
            <Text style={styles.sensorText}>X: {acceleration.x.toFixed(2)}</Text>
            <Text style={styles.sensorText}>Y: {acceleration.y.toFixed(2)}</Text>
            <Text style={styles.sensorText}>Z: {acceleration.z.toFixed(2)}</Text>
          </>
        ) : (
          <Text style={styles.text}>Pospeškometer ni na voljo na tej napravi.</Text>
        )}
      </Card>

      {/*podatki žiroskopa*/}
      <Card style={styles.card}>
        <Text style={styles.text}>Podatki žiroskopa:</Text>
        {isGyroscopeAvailable ? (
          <>
            <Text style={styles.sensorText}>X: {gyroscopeData.x.toFixed(2)}</Text>
            <Text style={styles.sensorText}>Y: {gyroscopeData.y.toFixed(2)}</Text>
            <Text style={styles.sensorText}>Z: {gyroscopeData.z.toFixed(2)}</Text>
          </>
        ) : (
          <Text style={styles.text}>Žiroskop ni na voljo na tej napravi.</Text>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 20,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#e0f7fa',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  sensorText: {
    fontSize: 16,
    color: '#004d40',
  },
});

export default SensorScreen;
