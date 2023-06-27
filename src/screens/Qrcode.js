import React, { useEffect, useState } from 'react';
import { View, Text, Image,StyleSheet } from 'react-native';
import CustomHeader from "../components/menu/CustomHeader"

const Qrcode = ({navigation}) => {
  const [qrcode, setQRCodeBase64] = useState('');

  useEffect(() => {
    fetchQRCodeData();
  }, []);

  const fetchQRCodeData = async () => {
    try {
      const response = await fetch('http://localhost:5000/qrcode');
      const data = await response.json();
      setQRCodeBase64(data.qrcode);
    } catch (error) {
      console.error('Error fetching QR code data:', error);
    }
  };

  const decodeBase64Image = (base64String) => {
    const imageData = `data:image/png;base64,${base64String}`;
    return imageData;
  };

  return (
    <View>
      {qrcode ? (
        <>
        <CustomHeader navigation={navigation}/>
        <Image source={{uri: qrcode}} style={{ width: 400, height: 400 }} />
        </>
      ) : (
        <Text>Loading QR Code...</Text>
      )}
      <Text>Qrcode</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
});

export default Qrcode;
