import React, { useState } from 'react';
import { KeyboardAvoidingView,View, TextInput, TouchableHighlight, StyleSheet,Image, Text, ImageBackground } from 'react-native';
import axios from 'axios';



const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendLogin = async () => {
    let data = JSON.stringify({
      "email": "fcalfaya@gmail.com",
      "password": 123456
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:5000/auth',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      const data = response.data;
      if (data.success){
          onLogin(data.content)
        } else {
          onLogin(false)
        }
    })
    .catch((error) => {
      console.log(error);
    });

  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
        <View style={styles.innerContainer}>
            <Image
            source={require('../assets/logo_sem_bg.png')}
            style={styles.image}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableHighlight
                style={styles.submit}
                onPress={sendLogin}
                underlayColor='#7b4e91'>
                <Text style={styles.submitText}>Entrar</Text>
            </TouchableHighlight>
            <TouchableHighlight>
                <Text style={styles.text}>Esqueci minha senha.</Text>
            </TouchableHighlight>
            <ImageBackground source={require('../assets/hands.png')} resizeMode="cover" style={styles.bg}/> 
        </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
    height:"100%",
  },
  innerContainer: {
    position:"absolute",
    width:"100%",
    alignItems: 'center',
    height:"70%",
    bottom:0
  },
  image: {
    width: '80%',
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: '70%',
    height: 40,
    borderColor: '#7b4e91',
    borderWidth: 2,
    borderRadius: 10,
    textAlign:'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  submit: {
    width: '40%',
    height: 50,
    marginTop: 15,
    paddingTop: 14,
    paddingBottom: 15,
    backgroundColor: '#7b4e91',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#7b4e91',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
  text:{
    marginTop: 15,
    color: '#333',
  },
  bg:{
    width:'80%',
    height : 250,
    marginLeft: 'auto'
  }
});

export default LoginScreen;
