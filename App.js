import React, { useState } from 'react';
import { StyleSheet,PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Qrcode from './screens/Qrcode'; // Import the Qrcode screen component
import Images from './screens/Images'; // Import the Images screen component
import LoginScreen from './screens/Login'; // Import the LoginScreen component
import Patients from './screens/Patients'; // Import the Patients component
import Patient from './screens/Patient'; // Import the Patients component
import New from './screens/New';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './components/menu/CustomDrawer';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const screens = [
  //{ name: 'Images', component: Images, iconName: 'images' },
  // Add more screen configurations here
];

const Drawer = createDrawerNavigator();

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Iris App Camera Permission',
        message:
          'Iris App needs access to your camera ',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setuser] = useState(false);

  const handleLogin = (status) => {
    // requestCameraPermission()

    console.log(status)
    if(status){
      setuser(status);
      setLoggedIn(true);
      return true
    }
  };
  const handleLogout = () => {
      setuser({});
      setLoggedIn(false);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator
          drawerContent={props => <CustomDrawer {...props} user={user} logout={handleLogout}/>}
          screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: '#aa18ea',
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#333',
            drawerLabelStyle: {
              marginLeft: -25,
              fontSize: 15,
            },
      }}>
        <Drawer.Screen
          name="Home"
          component={Patients}
          user={user}
          options={{
            drawerIcon: ({color}) => (
              <FontAwesome5 name="home" size={22} color={color} />
            ),
          }}
        />
        {screens.map(screen=>(
          <Drawer.Screen
          key={screen.name}
          name={screen.name}
          user={user}
          component={screen.component}
          options={{
            drawerIcon: ({color}) => (
              <FontAwesome5 name={screen.iconName} size={22} color={color} /> 
              ),
            }}
          />
        ))
        }
        <Drawer.Screen
          name="patient"
          component={Patient}
          user={user}
          styles={styles.hide}
          options={{
            drawerItemStyle: { height: 0 },
            drawerIcon: ({color}) => (
              <FontAwesome5 name="home" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="New"
          component={New}
          user={user}
          styles={styles.hide}
          options={{
            drawerItemStyle: { height: 0 },
            drawerIcon: ({color}) => (
              <FontAwesome5 name="home" size={22} color={color} />
            ),
          }}
        />

        {/* Add more drawer screens here */}
      </Drawer.Navigator>
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  hide:{
    display: 'none'
  }
})

export default App;