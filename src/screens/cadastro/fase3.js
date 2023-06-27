import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RadioButton from '../../components/radioButton';
import Dropdown from '../../components/Dropdown';

const options = [
    { value: 0, label: 'Diagnóstico' },
    { value: 1, label: 'Tratamento' }
  ];

const Fase3 = (props) => {
    const [cito_prev, setCito_prev] = useState(false);
    const [histo_prev, setHisto_prev] = useState(false);
    const [fase3, setFase3] = useState(props.data);

    useEffect(() => { 
        async function fetchData() {
            !cito_prev?await getCito_prev():false
            !histo_prev?await getHisto_prev():false
        }
        fetchData();
    });

    const getCito_prev =()=>{
        fetch('http://127.0.0.1:5000/cito_prev')
        .then(res => res.json())
        .then(data => setCito_prev(data.content))
        .catch(err => console.log(err))
    }

    const getHisto_prev= ()=>{
        fetch('http://127.0.0.1:5000/histo_prev')
        .then(res => res.json())
        .then(data => setHisto_prev(data.content))
        .catch(err => console.log(err))
    }

    const handleFase3 = (value)=>{
        let obj = fase3
        obj = {... obj, ... value}
        setFase3(obj)
        props.handledata(obj)
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.radio}>
                    <RadioButton
                        options={options}
                        selectedOption={fase3.diag_trat}
                        onSelect={(value)=>handleFase3({diag_trat:value})}
                    />
                </View>
                {fase3.diag_trat>=0?<View>
                    <Dropdown value={fase3?.cito_prev} label="Resultado Citologia prévia" data={cito_prev} setValue={value=>handleFase3({cito_prev:value})}/>
                    {fase3.diag_trat>0?
                        <Dropdown value={fase3?.histo_prev} label="Resultado Histopatologia prévia" data={histo_prev} setValue={value=>handleFase3({histo_prev:value})}/>
                    :false}
                </View>:false}
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
  radio:{
    width:"80%",
    justifyContent: "space-between", 
    alignItems: "center",
    flexDirection:"row"
  },
  
  
});
export default Fase3;
