import React, { useEffect, useState } from 'react';
import { Image,View,ScrollView , Text,StyleSheet,FlatList,Modal, TouchableOpacity,  } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import CustomHeader from "../components/menu/CustomHeader"
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';



const Patient = props => {
    const {navigation} = props
    const [patient, setPatient] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [qrcode, setQrcode] = useState(null);
    const [modalQr, setModalQr] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => { 
        if(isFocused){ 
            fetchPatient(props.route.params.id)
        }
    }, [props, isFocused]);
    
    const maskCpf = (cpf)=>{
        cpf = cpf.toString();
        const firstThreeNumbers = cpf.slice(0, 3); 
        const remainingLength = cpf.length - 3; 
        const maskedString = firstThreeNumbers + '*'.repeat(remainingLength); 
        return maskedString;
    }

    const renderImage = ( item,idx ) => (
        <TouchableOpacity key={idx} onPress={() => setSelectedImage(item)}>
            <Image source={{ uri: 'http://localhost:5000'+item}} style={styles.image} />
        </TouchableOpacity>
      );

    const fetchPatient = async (patient_id) => {
        await fetch(`http://localhost:5000/patient/${patient_id}`)
        .then(response => response.json())
        .then(async result => {
            if(result.success){
                var dataWorked = {... result.content}
                dataWorked.CPFMasked = maskCpf(dataWorked.CPF)
                setPatient(dataWorked || [])
            }else{
    
            }
        })
        .catch(error => console.log('error', error));
        // const data = await response.json();
    };

    const returnList = ()=>{
        setPatient(null)
        setQrcode(null)
        navigation.navigate("Home")
    }

    const getQrcode = async()=>{
        if(!qrcode){
            await fetch(`http://localhost:5000/qrcode/${patient.PID}`)
            .then(response => response.json())
            .then(async result => {
                setQrcode(result.qrcode)
                setModalQr(true)
            })
            .catch(error => console.log('error', error));
        }else{
            setModalQr(true)
        }
    }

  return (
    <>
    <CustomHeader navigation={navigation}/>
    <ScrollView >
      {patient ? (
        <>
            <View style={styles.topWarper}>
                <TouchableOpacity style={styles.back} onPress={() => returnList()}>
                    <Ionicons style={styles.textBar} name="arrow-back" size={22} />
                </TouchableOpacity>
                <Text style={styles.textBarHeader}>Paciente: #{patient.PID} </Text>
                <TouchableOpacity onPress={() => getQrcode()}>
                    <AntDesign style={styles.textBar} name="qrcode" size={40} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.patientData}>
                    <Text style={styles.patientDatatext}>Nome: {patient.nome}</Text>
                    <Text style={styles.patientDatatext}>Nascimento: {patient.nascimento}</Text>
                    <Text style={styles.patientDatatext}>Cpf: {patient.CPFMasked}</Text>
                    <Text style={styles.patientDatatext}>CNS: {patient.cns}</Text>
                </View>
                <View style={styles.patientAtendimento}>
                    {patient.dataAtendimento?<Text style={styles.text}>Atendimento {patient.dataAtendimento}</Text>:<Text style={styles.text}>Ainda não atendido</Text>}
                    {patient.dataAtendimento?<View>
                        <Text style={styles.patientDatatext}>Site:</Text>
                        <Text style={styles.patientDatatextRes}>{patient.site}</Text>
                        <Text style={styles.patientDatatext}>Colposcopista:</Text>
                        <Text style={styles.patientDatatextRes}>{patient.colposcopista}</Text>
                        <Text style={styles.patientDatatext}>Tipo de visita:</Text>
                        <Text style={styles.patientDatatextRes}>{patient.diag_trat==0?"Diagnóstico":"Tratamento"}</Text>
                        <Text style={styles.patientDatatext}>Resultado Citologia prévia:</Text>
                        <Text style={styles.patientDatatextRes}>{patient.cito_prev_text}</Text>
                        {patient.diag_trat==1?<Text style={styles.patientDatatext}>Resultado Histopatologia prévia: {patient.cito_prev}</Text>:false}
                        {patient.diag_trat==1?<Text style={styles.patientDatatext}>{patient.histo_prev_text}</Text>:false}
                        <Text style={styles.patientDatatext}>Superior esquerdo anterior 12 às 3 horas</Text>
                        <Text style={styles.patientDatatextRes}>{patient.sup_esq_ant}</Text>
                        <Text style={styles.patientDatatext}>Inferior esquerdo posterior  3 às 6 horas</Text>
                        <Text style={styles.patientDatatextRes}>{patient.sup_esq_ant}</Text>
                        <Text style={styles.patientDatatext}>Inferior direito posterior - 6 às 9 horas</Text>
                        <Text style={styles.patientDatatextRes}>{patient.sup_esq_ant}</Text>
                        <Text style={styles.patientDatatext}>Superior direito anterior - 9 às 12 horas</Text>
                        <Text style={styles.patientDatatextRes}>{patient.sup_esq_ant}</Text>
                        {patient.acetobranca>0?<Text style={styles.patientDatatext}>Área acetobranca no canal endocervical:</Text>:false}
                        {patient.acetobranca>0?<Text style={styles.patientDatatextRes}>{patient.acetobranca}</Text>:false}
                        {patient.acetobranca==0?<Text style={styles.patientDatatext}>Não possui áreas acetobrancas</Text>:false}
                        {patient.acetobranca==-1?<Text style={styles.patientDatatext}>0utro</Text>:false}
                        {patient.acetobranca==-1?<Text style={styles.patientDatatext}>0utro Especificações:</Text>:false}
                        {patient.acetobranca==-1?<Text style={styles.patientDatatextRes}>{patient.outro_esp}</Text>:false}
                        {patient.acetobranca==-1?<Text style={styles.patientDatatext}>0utro Total:</Text>:false}
                        {patient.acetobranca==-1?<Text style={styles.patientDatatextRes}>{patient.outro_total}</Text>:false}
                        <Text style={styles.patientDatatext}>Impressão Coloscopica:</Text>
                        <Text style={styles.patientDatatextRes}>{patient.impressao_coloscopica}</Text>
                        <Text style={styles.patientDatatext}>Adequabilidade e Zona de Transformação(ZT)/JEC:</Text>
                        <Text style={styles.patientDatatextRes}>{patient.adequabilidade_text}</Text>
                        {patient.adequabilidade==2?<Text style={styles.patientDatatextRes}>{patient.jec_text}</Text>:false}
                    </View>:false}
                </View>
                {patient.dataAtendimento?<View style={styles.patientAtendimento}>
                    <Text style={styles.text}>Imagens</Text>
                    <View style={styles.containerImg}>
                    {
                        patient.images.map((item,idx)=> renderImage(item,idx))
                    }
                    </View>
                </View>:false}
            </View>
        </>
      ) : (
        <Text>Carregando paciente...</Text>
        )}
    </ScrollView >
    <Modal visible={selectedImage !== null} transparent={true} onRequestClose={() => setSelectedImage(null)}>
        <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
            <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <Image source={{ uri: 'http://localhost:5000'+selectedImage}} style={styles.modalImage} resizeMode="contain" />
        </View>
    </Modal>
    <Modal visible={modalQr} transparent={true} onRequestClose={() => setModalQr(false)}>
        <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setModalQr(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <Image source={{uri: qrcode}} style={styles.modalImage} resizeMode="contain" />
        </View>
    </Modal>
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
  containerImg:{
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection:"row",
    flexWrap:"wrap"
  },
  topWarper:{
    marginTop:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    backgroundColor:"#7a4f94"
  },
  textBar:{
    color:"#fff",
  },
  textBarHeader:{
    color:"#fff",
    fontSize: 16,
    fontWeight: '700',
  },
  qrcode:{
    height:50,
    aspectRatio:1,
    marginTop:40
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#101010',
    fontWeight: '700',
    color:"#7b4e91"
  },
  patientData:{
    marginTop: 30,
    padding:20,
    borderWidth:2,
    borderRadius:12,
    borderColor:'#7b4e91'
  },
  patientAtendimento:{
    marginTop: 20,
    padding:20,
    borderWidth:2,
    borderRadius:12,
    borderColor:'#7b4e91'
  },
  back:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  backInside:{
    marginTop: 20,
    padding:20,
    borderWidth:2,
    borderRadius:12,
    borderColor:'#7b4e91',
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf:"center",
  },
  patientDatatext:{
    fontSize: 16,
    color: '#101010',
    fontWeight: '700',
    color:"#7b4e91",
  },
  patientDatatextRes:{
    fontSize: 14,
    color: '#101010',
    fontWeight: '400',
    color:"#7b4e91",
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 999,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
export default Patient;
