import React, { useEffect, useState } from 'react';
import { TextInput,View, StyleSheet  } from 'react-native';
import RadioButton from '../../components/radioButton';
import Dropdown from '../../components/Dropdown';

const options = [
    { value: -1, label: 'Não posui áreas acetobrancas' },
    { value: 0, label: 'outro' }
  ];

const Fase5 = (props) => {
    const [fase5, setFase5] = useState(props.data);
    const [impressoes, setImpressao] = useState(false);

	useEffect(() => { 
        async function fetchData() {
            !impressoes?await getImpressao():false
        }
        fetchData();
    });

    const handleFase5 = (value)=>{
        let obj = fase5
        obj = {... obj, ... value}
        setFase5(obj)
        props.handledata(obj)
    }

	const getImpressao= ()=>{
        fetch('http://127.0.0.1:5000/impressoes')
        .then(res => res.json())
        .then(data => setImpressao(data.content))
        .catch(err => console.log(err))
    }

    return (
        <>
        <View>
			<View style={styles.input}>
				<TextInput 
					style={styles.inputText} 
					keyboardType='numeric'
					{...props} 
					placeholder="Sup. Esquerdo Ant. 12-3hr" 
					value={fase5?.sup_esq_ant}
					onChangeText={(value)=>handleFase5({sup_esq_ant:value})}
				/>
				<TextInput 
					style={styles.inputText} 
					keyboardType='numeric'
					{...props} 
					placeholder="Sup. Direito Ant. 9-12hr" 
					value={fase5?.sup_dir_ant}
					onChangeText={(value)=>handleFase5({sup_dir_ant:value})}
				/>
        	</View>
			<View style={styles.input}>
				<TextInput 
					style={styles.inputText} 
					keyboardType='numeric'
					{...props} 
					placeholder="Inf. Esquerdo Post. 3-6hr" 
					value={fase5?.inf_esq_pos}
					onChangeText={(value)=>handleFase5({inf_esq_pos:value})}
				/>
				<TextInput 
					style={styles.inputText} 
					keyboardType='numeric'
					{...props} 
					placeholder="Inf. Direito Post. 6-9hr" 
					value={fase5?.inf_dir_pos}
					onChangeText={(value)=>handleFase5({inf_dir_pos:value})}
				/>
        	</View>
			<View style={styles.input2}>
				<TextInput
					keyboardType='numeric'  
					style={styles.inputText2} 
					{...props} 
					placeholder="Área aceto branca no canal Endocervical" 
					value={fase5?.acetobranca}
					onChangeText={(value)=>handleFase5({acetobranca:value})}
				/>
        	</View>
        </View>
		<View style={styles.container}>
			<View style={styles.radio}>
				<RadioButton
					options={options}
					selectedOption={fase5.nAceto}
					onSelect={(value)=>handleFase5({nAceto:value})}
				/>
			</View>
			{impressoes?
                <Dropdown value={fase5?.impressao_coloscopica} label="Impressão Colposcópica" data={impressoes} setValue={value=>handleFase5({impressao_coloscopica:value})}/>
                :""}
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
    width: '100%',
    textAlign:'center',
    flexDirection:'row',
    paddingTop:5,
    alingContent:"center",
	justifyContent:"space-between",
    marginTop:20
},
input2:{ 
    width: '100%',
    textAlign:'center',
    flexDirection:'row',
    paddingTop:5,
    alingContent:"center",
	justifyContent:"center",
    marginTop:20
},
inputText:{
	borderColor: '#7b4e91',
	height: 40,
	borderRadius: 10,
	borderWidth: 2,
    textAlign:"center",
    color:'#7b4e91',
    width:"45%"
  },
inputText2:{
	borderColor: '#7b4e91',
	height: 40,
	borderRadius: 10,
	borderWidth: 2,
    textAlign:"center",
    color:'#7b4e91',
    width:"80%"
  }
});
export default Fase5;
