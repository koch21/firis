import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet,TouchableOpacity  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useIsFocused } from "@react-navigation/native";
import Fase1 from './cadastro/fase1';
import Fase2 from './cadastro/fase2';
import Fase3 from './cadastro/fase3';
import Fase4 from './cadastro/fase4';
import Fase5 from './cadastro/fase5';
import Fase6 from './cadastro/fase6';
import CustomModal from '../components/Modal';
import CustomHeader from "../components/menu/CustomHeader"

const New = (props) => {
  const {navigation} = props
  const [pid, setPid] = useState(null);
  const [dados, setDados] = useState({});
  const [blockFoward, setBlockFoward] = useState({});
  const [fase, setfase] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [faseAtual, setfaseAtual] = useState(<Fase1 data={dados} handledata={(data)=>handledata(1,data)}/>);
  const numberOfDigits = 7
  const isFocused = useIsFocused();

  useEffect(() => { 
    if(isFocused && !pid){ 
      generatePID()
      }
  }, [props, isFocused]);

  const handledata = (fase,data)=>{
    var configData = dados

    configData = {... configData, ... data}
    // if(fase==1){
    //   if(configData.site && configData.colposcopista){
    //     setBlockFoward(false)
    //   }
    // }
    // if(fase==2){
    //   if( configData.nome && 
    //       configData.nascimento && 
    //       configData.cpf &&
    //       configData.cns &&
    //       configData.contato){
    //     setBlockFoward(false)
    //   }
    // }
    setDados(configData)
  }

  const generatePID = ()=>{
    const timestamp = Date.now();
    const randomNumber = Math.floor(timestamp);
    setPid(randomNumber.toString().slice(-numberOfDigits))
  }

  const returnList = ()=>{
    setPid(null)
    navigation.navigate("Home")
  }

  const handleFaseChange = (lfase)=>{
    lfase<0?setBlockFoward(false):false
    let nfase = fase+(lfase) 
    setfase(nfase)
    switch (nfase) {
      case 2:
        setfaseAtual(<Fase2 data={dados} handledata={(data)=>handledata(2,data)}/>);
        setBlockFoward(true)
      break;
      case 3:
        setfaseAtual(<Fase3 data={dados} handledata={(data)=>handledata(3,data)}/>);
      break;
      case 4:
        setfaseAtual(<Fase4 data={dados} handledata={(data)=>handledata(4,data)}/>);
      break;
      case 5:
        setfaseAtual(<Fase5 data={dados} handledata={(data)=>handledata(5,data)}/>);
		break;
      case 6:
        setfaseAtual(<Fase6 data={dados} handledata={(data)=>handledata(6,data)}/>);
      break;
      default:
        setfaseAtual(<Fase1 data={dados} handledata={(data)=>handledata(1,data)}/>);
    }
  }

  const save = ()=>{
    setModalOpen(true)
	var configData = dados
	configData = {... configData, pid:pid}
	setDados(configData)
  }

  const handleModaloption = (option)=>{
    setModalOpen(false)
    if(option){
      console.log("save")
      sendToback()
    }
  }

  const sendToback = ()=>{
	  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(dados);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/paciente", requestOptions)
    .then(response => response.text())
    .then(result => returnList())
    .catch(error => console.log('error', error));
  }

  return (
    <>
    <CustomHeader navigation={navigation}/>
    <View style={styles.topWarper}>
        <TouchableOpacity style={styles.back} onPress={() => returnList()}>
          <Ionicons style={styles.textBar} name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.textBar}>Paciente: #{pid} </Text>
        <TouchableOpacity onPress={() => getQrcode()}>
          <AntDesign style={styles.textBar} name="qrcode" size={40} />
        </TouchableOpacity>
    </View>
    <View style={styles.containerNumber}>
      <View style={styles.numberWarper}>
        <View style={styles.numbersSelected}><Text style={{color:"#fff"}}>1</Text></View>
        <View style={fase>=2?styles.numbersSelected:styles.numbers}><Text style={fase>=2?{color:"#fff"}:{color:"#333"}}>2</Text></View>
        <View style={fase>=3?styles.numbersSelected:styles.numbers}><Text style={fase>=3?{color:"#fff"}:{color:"#333"}}>3</Text></View>
        <View style={fase>=4?styles.numbersSelected:styles.numbers}><Text style={fase>=4?{color:"#fff"}:{color:"#333"}}>4</Text></View>
        <View style={fase>=5?styles.numbersSelected:styles.numbers}><Text style={fase>=5?{color:"#fff"}:{color:"#333"}}>5</Text></View>
        <View style={fase>=6?styles.numbersSelected:styles.numbers}><Text style={fase>=6?{color:"#fff"}:{color:"#333"}}>6</Text></View>
      </View>
    </View>
    <View style={styles.container}>
        {faseAtual}
    </View>
    <View style={styles.warpButton}>
		<View style={styles.containerButtons}>
			<TouchableOpacity 
				disabled={fase==1?true:false}
				onPress={() =>  handleFaseChange(-1)}
				style={fase==1?styles.navButtonDisabled:styles.navButton}>
					<Text style={styles.buttonText}>Voltar</Text>
			</TouchableOpacity>
			{fase!=6?<TouchableOpacity 
				onPress={() => handleFaseChange(1)}
				style={fase==5||blockFoward?styles.navButtonDisabled:styles.navButton}>
					<Text style={styles.buttonText}>Avançar</Text>
			</TouchableOpacity>:false}
			{fase==6?<TouchableOpacity 
				onPress={() => save()}
				style={styles.navButton}>
					<Text style={styles.buttonText}>Finalizar</Text>
			</TouchableOpacity>:false}
	    </View>
    </View>
    <CustomModal
			text="Deseja enviar os dados?"
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
  warpButton: {
	marginTop:50,
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  containerButtons:{
	width:"80%",
	alignContent:"center",
	justifyContent:"space-between",
	flexDirection:"row",
  },
  navButton:{
	backgroundColor: '#7b4e91',
	padding:30,
	paddingTop:10,
	paddingBottom:10,
	borderRadius:7
  },
  navButtonDisabled:{
	backgroundColor: '#3a2642',
	padding:30,
	paddingTop:10,
	paddingBottom:10,
	borderRadius:7
  },
  buttonText:{
	color: '#fff',
  },
  containerNumber:{
    alignItems: 'center',
  },
  numberWarper:{
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "space-between",
    width:"70%",
    marginTop: 20,
    color:"#7b4e91",
  },
  numbers:{
    borderWidth:1,
    borderColor:"#7b4e91",
    width:40,
    height:40,
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 100,
    color:"#7b4e91",
    fontWeight:"600"
  },
  numbersSelected:{
    borderWidth:1,
    borderColor:"#7b4e91",
    width:40,
    height:40,
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 100,
    color:"#7b4e91",
    fontWeight:"600",
	backgroundColor:"#7b4e91"
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
    color:"#fff"
  },
  patientDatatext:{
    fontSize: 16,
    color: '#101010',
    fontWeight: '700',
    color:"#7a4f94",
  },
  back:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  backInside:{
    borderWidth:2,
    borderRadius:12,
    borderColor:'#7a4f94',
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf:"center",
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700',
    color:"#7a4f94"
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  qrcode:{
    height:50,
    aspectRatio:1
  },
});
export default New;
