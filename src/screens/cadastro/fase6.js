import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RadioButton from '../../components/radioButton';
import Dropdown from '../../components/Dropdown';

const Fase6 = (props) => {
    const [jecs, setJecs] = useState(false);
    const [adequabilidades, setAdequabilidades] = useState(false);
    const [insatisfatorios, setInsatisfatorios] = useState(false);
    const [fase6, setFase6] = useState(props.data);

    useEffect(() => { 
        async function fetchData() {
            !jecs?await getJecs():false
            !adequabilidades?await getAdequabilidade():false
            !insatisfatorios?await getInsatisfatorios():false
        }
        fetchData();
    });

    const getJecs =()=>{
        fetch('http://127.0.0.1:5000/jecs')
        .then(res => res.json())
        .then(data => setJecs(data.content))
        .catch(err => console.log(err))
    }
    
    const getAdequabilidade =()=>{
        fetch('http://127.0.0.1:5000/adequabilidades')
        .then(res => res.json())
        .then(data => {
            console.log(data.content)
            setAdequabilidades(data.content)
        })
        .catch(err => console.log(err))
    }

    const getInsatisfatorios =()=>{
        fetch('http://127.0.0.1:5000/insatisfatorios')
        .then(res => res.json())
        .then(data => setInsatisfatorios(data.content))
        .catch(err => console.log(err))
    }

    const handleFase6 = (value)=>{
        let obj = fase6
        obj = {... obj, ... value}
        setFase6(obj)
        props.handledata(obj)
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>Adequabilidade e Zona de Transformação (ZT)/JEC</Text>
                <View style={styles.radio}>
                    {adequabilidades?<RadioButton
                        options={adequabilidades}
                        selectedOption={fase6.adequabilidade}
                        onSelect={(value)=>handleFase6({adequabilidade:value})}
                    />:false}
                </View>
                {fase6.adequabilidade==2?<View>
                    <Dropdown value={fase6?.jec} label="Jec" data={jecs} setValue={value=>handleFase6({jec:value})}/>
                </View>:false}
                {fase6.adequabilidade==3?
                    <Dropdown value={fase6?.motivo_ins} label="Motivo insatisfatório" data={insatisfatorios} setValue={value=>handleFase6({motivo_ins:value})}/>
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
  text:{
    fontSize: 17,
    alignItems:"center",
    textAlign:"center",
    marginBottom:10
  }
});
export default Fase6;
