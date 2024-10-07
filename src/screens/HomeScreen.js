import React from 'react';
import {Text, View, Image} from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Text></Text>
      {/* Exibindo a logo do app */}
      <Image source={require('./assets/images/logo.png')}/>
    </View>
  );
};

export default HomeScreen;