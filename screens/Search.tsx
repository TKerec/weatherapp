import React,{useState} from 'react';
import { TextInput,Button, Card} from 'react-native-paper';
import {View,Text, FlatList} from 'react-native'
import Header from './Header'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const Search = () => {
    const [city,setCity] = useState('')
    const [cities,setCities] = useState([])
    /*const fetchCities = (text)=>{
        setCity(text)
        fetch("https://autocomplete.wunderground.com/aq?query="+text)
        .then(item=>item.json())
        .then(cityData=>{
            setCities(cityData.RESULTS.slice(0,9))
        })
    }*/

    return (
     <View style={{flex:1}}>
         <Header name="Poišči vreme na željeni lokaciji ☀️" />
          <TextInput
           label="Ime kraja"
           theme={{colors:{primary:"#00aaff"}}}
           value={city}
           onChangeText={(text)=>console.log('changed')/*fetchCities(text)*/}
          />
          <Button
           mode="contained" 
           theme={{colors:{primary:"#00aaff"}}}
           style={{margin:20}}
           onPress={() => console.log('pressed')}>
          <Text style={{color:"white"}}> Iskanje</Text> 

        </Button>
        <Card style={{margin:20,padding:20}}>
            <Text >Ljubljana 🌧️☀️🌪️🌫️                                                    ❤️10°C</Text>
        </Card>
        <Card style={{margin:20,padding:20}}>
            <Text >Maribor 🌧️☀️🌪️🌫️                                                      ❤️13°C</Text>
        </Card>
        <Card style={{margin:20,padding:20}}>
            <Text >Kranj 🌧️☀️🌪️🌫️                                                           ❤️9°C</Text>
        </Card>
        <Card style={{margin:20,padding:20}}>
            <Text >Kraj 4 🌧️☀️🌪️🌫️                                                          ❤️10°C</Text>
        </Card>
        <Card style={{margin:20,padding:20}}>
            <Text >Kraj 5 🌧️☀️🌪️🌫️                                                          ❤️15°C</Text>
        </Card>
        <Card style={{margin:20,padding:20}}>
            <Text >Kraj 6 🌧️☀️🌪️🌫️                                                          ❤️15°C</Text>
        </Card>
     </View>
    );
 
}
export default Search;