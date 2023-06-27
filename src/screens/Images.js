import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const Images = () => {
  const [apiImages, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "devID": 1234
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:5000/imagesAll", requestOptions)
          .then(response => response.json())
          .then(result => setImages(result.images))
          .catch(error => console.log('error', error));


      } catch (error) {
        console.error('Error fetching QR code data:', error);
      }
  };
  
  const renderImage = ({ item }) => (
    <Image source={{ uri: 'http://localhost:5000'+item.Image}} style={styles.image} />
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.heading}>Gallery</Text>
      {apiImages.length > 0 ? (
        <FlatList
          data={apiImages}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.container}
        />
      ) : (
        <Text>Loading images...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Images;
