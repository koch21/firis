import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Dropdown from '../../components/Dropdown';


const Fase1 = (props) => {
    const [sites, setSites] = useState(false);
    const [colposcopistas, setColposcopistas] = useState(false);
    const [fase1, setFase1] = useState(props.data);

    useEffect(() => { 
        async function fetchData() {
            !sites?await getSites():false
            !colposcopistas?await getColposcopista():false
        }
        fetchData();
    });

    const getSites =()=>{
        fetch('http://127.0.0.1:5000/sites')
        .then(res => res.json())
        .then(data => setSites(data.content))
        .catch(err => console.log(err))
    }

    const getColposcopista= ()=>{
        fetch('http://127.0.0.1:5000/colposcopista')
        .then(res => res.json())
        .then(data => setColposcopistas(data.content))
        .catch(err => console.log(err))
    }

    const handleFase1 = (value)=>{
        let obj = fase1
        obj = {... obj, ... value}
        setFase1(obj)
        props.handledata(obj)
    }

    return (
        <>
            <View>
                {sites?
                <Dropdown value={fase1?.site} label="Sites" data={sites} setValue={value=>handleFase1({site:value})}/>
                :""}
                {colposcopistas?
                <Dropdown value={fase1?.colposcopista} label="Colposcopista" data={colposcopistas} setValue={value=>handleFase1({colposcopista:value})}/>
                :""}
            </View>
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
  
});
export default Fase1;
