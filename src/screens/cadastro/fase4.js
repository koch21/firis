import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import RadioButton from '../../components/radioButton';

const options = [
    { value: 'sim', label: 'Sim' },
    { value: 'nao', label: 'Não' },
    { value: 'nsa', label: 'Não se Aplica' }
  ];

const Fase4 = (props) => {
    const [fase4, setFase4] = useState(props.data);

    const handleFase4 = (value)=>{
        let obj = fase4
        obj = {... obj, ... value}
        setFase4(obj)
        props.handledata(obj)
    }

    return (
        <>
            <View style={styles.container}>
                <Text>Realizou a auto coleta para teste de HPV?</Text>
                <View style={styles.radio}>
                    <RadioButton
                        options={options}
                        selectedOption={fase4.hpv_teste}
                        onSelect={(value)=>handleFase4({hpv_teste:value})}
                    />
                </View>
                {fase4.hpv_teste && fase4.hpv_teste!=="sim"?
                    <View style={styles.input}>
                        <TextInput 
                            style={styles.inputText} 
                            {...props} 
                            placeholder="Motivo" 
                            value={fase4?.hpv_motivo}
                            onChangeText={(value)=>handleFase4({hpv_motivo:value})}
                            />
                    </View>
                :false}
                {fase4.hpv_teste && fase4.hpv_teste=="sim"?
                    <View style={styles.input}>
                        <TextInput 
                            style={styles.inputText} 
                            {...props} 
                            placeholder="Cod. Coleta" 
                            value={fase4?.hpv_coleta}
                            onChangeText={(value)=>handleFase4({hpv_coleta:value})}
                            />
                    </View>
                :false}
                 
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
    marginTop:20,
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
    textAlign:"center",
    color:'#7b4e91',
    width:"100%"
  }
});
export default Fase4;
