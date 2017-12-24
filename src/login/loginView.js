import React, { Component } from 'react';
import Icon, { Button } from 'react-native-vector-icons/FontAwesome';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,


} from 'react-native';
import { Actions } from 'react-native-router-flux';
//logeo con facebook instalar react-native-fbsdk
import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';
//firebase
import firebase,{firebaseAuth,database} from '../services/firebaseService';
const { FacebookAuthProvider } = firebase.auth;



export default class LoginView extends Component {
    //state
    state = {
        userLogeado: null,
        activeBntContinuar: true
    }
    componentWillMount() {
        this.guardarDatosFireBase();
    };
    guardarDatosFireBase = () => {
        AccessToken.getCurrentAccessToken().then(
            (data) => {

                if (data) {
                    const credential = FacebookAuthProvider.credential(data.accessToken);//pasamos el token 
                    firebaseAuth.signInWithCredential(credential).then((user) => {
                        // console.warn("Sign In Success", user);

                        this.setState({ userLogeado: user, activeBntContinuar: false });
                        //console.warn('data', this.state.userLogeado);
                        
                    }).catch(function (error) {
                        console.warn("Sign In Error", error);
                    });
                }
            })
    }

    logear = (error, result) => {
        if (error) {
            console.error('login', error);
        } else if (result.isCancelled) {
            alert("login is cancelled.");
        } else {
            // alert(data.accessToken.toString());
            this.guardarDatosFireBase();
            // Actions.home({});
            //   console.warn('data', data);
        }
    }
    render() {
        return (
            <Image source={require('../img/imgback.jpeg')} style={styles.container}>
                <Text style={styles.wellcome}>Bienvenidos  AppMusic</Text>
                <Image source={require('../img/icon.png')} style={styles.imagenlogo} />
                <View style={styles.datos}>
                    <Text style={styles.userName} >{this.state.userLogeado && this.state.userLogeado.displayName}</Text>
                    <Image source={{ uri: this.state.userLogeado ? this.state.userLogeado.photoURL : 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png' }} style={styles.imagen} />
                </View>
                <LoginButton
                    style={styles.buttonLogin}
                    readPermissions={['public_profile', 'email']}
                    onLoginFinished={this.logear}
                    onLogoutFinished={() => { alert("logout."); this.setState({ activeBntContinuar: true }) }}
                />
                <View style={styles.continuar}>
                    <Button
                        style={styles.btncontinuar}
                        disabled={this.state.activeBntContinuar}
                        onPress={() => { Actions.home() }} >
                        Continuar
                     </Button>
                </View>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
        paddingTop: 2,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        //paga que la img se estire
        width:null,
        height:null
    },
    wellcome: {
        marginBottom: 20,
        fontSize: 25,
        color: 'white',
        fontWeight: '700',
        backgroundColor: 'transparent'
    },
    userName: {
        marginBottom: 10,
        fontSize: 16,
        color: 'white',
        backgroundColor:'transparent',
        fontWeight: '500',
    },
    datos: {
        marginBottom: 50
    },
    imagenlogo:{
        height: 80,
        width: 80,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom:40,
    },
    imagen: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white'
    },
    continuar: {
        marginTop: 10,
    },
    btncontinuar: {
        backgroundColor: 'lightgray'
    }


});
