import React, { useEffect, useState } from 'react';
import { ScrollView,Button,View, Text,StyleSheet,FlatList,TouchableOpacity  } from 'react-native';
import CustomHeader from "../components/menu/CustomHeader"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused } from "@react-navigation/native";
import CustomModal from '../components/Modal';


const Patients = (props) => {
  const {navigation} = props
  const [patients, setPatients] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteU, setDelete] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => { 
    if(isFocused){ 
      fetchPatients()
      }
  }, [props, isFocused]);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:5000/patients');
      const data = await response.json();
      setPatients(data.content || [])
    } catch (error) {
      console.error('Error fetching QR code data:', error);
    }
  };

  const goToPatient = (id) =>{
    navigation.navigate("patient",{id})
  }

  const deletePatient =(id)=>{
    setModalOpen(true)
    setDelete(id)
  }

  const handleModaloption = (option)=>{
    setModalOpen(false)
    if(option){
      deleteInBack(deleteU)
    }
    setDelete(false)
  }

  const deleteInBack=(id)=>{
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({id});
  
      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch("http://127.0.0.1:5000/paciente", requestOptions)
      .then(response => response.text())
      .then(result => fetchPatients())
      .catch(error => console.log('error', error));
    }

  return (
    <>
    <ScrollView>
      <CustomHeader navigation={navigation}/>
    <View>
      {patients ? (
        <View style={styles.container}>
          <Text style={styles.text}>Pacientes</Text>
          {
            patients.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <TouchableOpacity  onPress={() => goToPatient(item.id)}>
                  <View>
                    <Text style={styles.listItemTitle}>Participante: {item.nome}</Text>
                    <Text style={styles.listItemText}>PID: {item.PID}</Text>
                    <Text style={styles.listItemText}>Fotos enviadas: {item.fotos_enviadas}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => deletePatient(item.id)}>
                    <FontAwesome5 name="trash-alt" size={20} color="#7b4e91" />
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
      ) : (
        <Text>Carregando pacientes...</Text>
      )}
    </View>
    </ScrollView>
      <View style={{flex:1}}>
        <View style={styles.plusButtonWarper}>
           <TouchableOpacity onPress={() =>  navigation.navigate("New")}
            style={styles.plusButton}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
        </View>
      </View>
      <CustomModal
			text="Deseja apagar o Paciente?"
			visible={modalOpen}
      handleOptions={(option)=>handleModaloption(option)}
		/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  plusButtonWarper:{
    position:'absolute',
    bottom:30,
    right:30,
    alignSelf:'flex-end',
    color: '#fff',
  },
  plusButton:{
    width: 50,
    height: 50,
    borderRadius:50,
    backgroundColor:'#7b4e91',
    justifyContent:'center',
    alignContent:'center'
  },
  plusButtonText:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold',
    textAlign:"center"
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700',
    color:"#7b4e91"
  },
  listItem: {
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'stretch',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor:"#7b4e91",
    flexDirection:'row',
    justifyContent:'space-between',
  },
  listItemText: {
    fontSize: 16,
    color:"#7b4e91"
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight:"700",
    color:"#7b4e91"
  }
});
export default Patients;
