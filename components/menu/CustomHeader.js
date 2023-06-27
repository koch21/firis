import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ImageBackground } from 'react-native';

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <ImageBackground
          source={require('../../assets/user-profile.jpg')}
          style={styles.profile}
          imageStyle={{borderRadius: 25}}
        />
      </TouchableOpacity>
      <Text style={styles.title}>I-Cervicais</Text>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7a4f94',
    height: 100,
    paddingTop:50,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft:-50
    },
  profile:{
    width: 35, 
    height: 35,
    marginLeft:20
  }
});

export default CustomHeader;