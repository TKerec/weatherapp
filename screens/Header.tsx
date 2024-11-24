import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import { View, Text } from 'react-native';
const Header = (props:any) => {

  return (
    <Appbar.Header theme={{
        colors:{primary:"#00aaff"} 
        
    }}
    style={{flexDirection:"row", justifyContent:"center"}}>
        <Title>
            {props.name}
        </Title>

    </Appbar.Header>
  );
};

export default Header;