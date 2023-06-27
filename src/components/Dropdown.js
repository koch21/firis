import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, StyleSheet } from 'react-native';

const Dropdown = (props) => {
    const placeholder = {
        label: props.label,
        value: null,
        color: '#9EA0A4',
    };
    return (
        <View style={style.container}>
            <RNPickerSelect
                onValueChange={(value) => props.setValue(value)}
                items={props.data}
                placeholder={placeholder}
                style={dropdown}
                value={props.value}
                useNativeAndroidPickerStyle ={false}
            />
        </View>
    );
}

const dropdown = StyleSheet.create({
    inputIOS: {
        width: '70%',
        height: 40,
        borderColor: '#7b4e91',
        borderWidth: 2,
        borderRadius: 10,
        textAlign:'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        width: 300,
        height: 40,
        borderColor: '#7b4e91',
        borderWidth: 2,
        borderRadius: 10,
        textAlign:'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingRight: 30, // to ensure the text is never behind the icon
      },
    
  });
const style = StyleSheet.create({
   container:{
    marginTop:20,
    alignItems:"center",
    width:"100%"
   }
  });
export default Dropdown;