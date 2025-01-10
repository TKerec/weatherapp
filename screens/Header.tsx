import * as React from 'react';
import { Appbar, Title, Button } from 'react-native-paper';
import { View, Text } from 'react-native';
const Header = (props:any) => {

  
  const {name, onSettingsPress, onBarometerPress} = props; // za ikone gumbov

  return (
    <Appbar.Header theme={{
        colors:{primary:"#00aaff"} 
        
    }}
    style={{flexDirection:"row", justifyContent:"center"}}>
        <Title>
            {name}
        </Title>
       
        {onSettingsPress && (
        <Appbar.Action icon="cog" color="black" onPress={onSettingsPress} />
      )}
       {onBarometerPress && (
        <Appbar.Action icon="gauge" onPress={onBarometerPress} />
      )}
    </Appbar.Header>
  );
};

export default Header;