import React, { useEffect, useState } from 'react';
import { TextInput,Image,View, Text,StyleSheet,TouchableOpacity  } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaskInput from 'react-native-mask-input';

const dateMask = [/\d/, /\d/, "/", [/\d/], [/\d/], "/", [/\d/], [/\d/],[/\d/], [/\d/]];
const cpfMask = [/\d/, /\d/,/\d/, ".", [/\d/],[/\d/],[/\d/], ".", [/\d/], [/\d/],[/\d/],"-", [/\d/],[/\d/]];
const celMask = ["(",/\d/,/\d/, ") ", [/\d/],[/\d/],[/\d/],[/\d/],[/\d/], " ", [/\d/], [/\d/],[/\d/],[/\d/]];

const Fase1 = (props) => {
    const [fase2, setFase2] = useState(props.data);

    const handleFase2 = (value)=>{
        let obj = fase2
        obj = {... obj, ... value}
        setFase2(obj)
        props.handledata(obj)
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.input}>
                    <FontAwesome5 name="user-alt" size={22} style={{color:'#7b4e91'}}/>
                    <TextInput 
                        style={styles.inputText} 
                        {...props} 
                        placeholder="Nome" 
                        value={fase2?.nome}
                        onChangeText={(value)=>handleFase2({nome:value})} 
                    />
                </View>
                <View style={styles.input}>
                    <FontAwesome5 name="calendar-alt" size={22} style={{color:'#7b4e91'}}/>
                    <MaskInput
                        style={styles.inputText}
                        value={fase2?.nascimento}
                        onChangeText={(mask)=>handleFase2({nascimento:mask})}
                        mask={dateMask}
                    />
                </View>
                <View style={styles.input}>
                    <FontAwesome5 name="id-card" size={22} style={{color:'#7b4e91'}}/>
                    <MaskInput
                        style={styles.inputText}
                        value={fase2?.cpf}
                        onChangeText={(value)=>handleFase2({cpf:value})}
                        placeholder="CPF" 
                        mask={cpfMask}
                    />
                </View>
                <View style={styles.input}>
                    <FontAwesome5 name="heartbeat" size={22} style={{color:'#7b4e91'}}/>
                    <TextInput 
                        style={styles.inputText} 
                        {...props} 
                        placeholder="CNS" 
                        value={fase2?.cns}
                        onChangeText={(value)=>handleFase2({cns:value})}
                    />
                </View>
                <View style={styles.input}>
                    <MaterialCommunityIcons name="cellphone" size={22} style={{color:'#7b4e91'}}/>
                    <MaskInput
                        style={styles.inputText}
                        value={fase2?.contato}
                        onChangeText={(value)=>handleFase2({contato:value})}
                        placeholder="Contato" 
                        mask={celMask}
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop:40
  },
  input:{ 
    width: '70%',
    height: 40,
    borderColor: '#7b4e91',
    borderWidth: 2,
    borderRadius: 10,
    textAlign:'center',
    paddingHorizontal: 10,
    flexDirection:'row',
    paddingTop:5,
    alingContent:"center",
    marginTop:20
  },
  inputText:{
    marginLeft: 10,
    color:'#7b4e91',
    width:"100%"
  }
  
});
export default Fase1;
