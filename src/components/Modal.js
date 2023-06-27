import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';

const CustomModal = (props) => {

  const setModalVisible =(option)=>{
    props.handleOptions(option)
  }

  return (
    <>
    <View style={styles.centeredView}>
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
        props.OnConfirm()
        setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.text}</Text>
            <View style={styles.containerButtons}>
                <Pressable
                style={[styles.navButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
                <Pressable
                style={[styles.navButton]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Enviar</Text>
                </Pressable>
            </View>
        </View>
        </View>
    </Modal>
    </View>
    {props.visible?<View style={styles.bg}></View>:false}
    </>
  );
};

const styles = StyleSheet.create({
    bg:{
        backgroundColor: '#00000059',
        width:'150%',
        height:1000,
        position:'absolute',
        top:-100,
        left:0,
        zIndex:10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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
});

export default CustomModal;