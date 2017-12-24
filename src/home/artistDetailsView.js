import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import ArtistBox from './artistBox';
//firebase
import { database, firebaseAuth } from '../services/firebaseService';
//comentarios
import CommentListView from './comentListView';

export default class HomeView extends Component {
    state = {
        text: '',
        comments: new Array()
    }
    componentWillMount() {
        //optiene los comentarios al agregar uno  s
        //se van añadiendo de uno a uno
        //console.warn('coment',this.props.artist.id);

        const commentsRef = database.ref('coments/' + this.props.artist.id);
        commentsRef.on('child_added', this.showAddComent);


    }

    //cuando cierra
    componentWillUnmount() {
        //se desuscribe como es una data de base real time
        this.cerrarConsultaComent();
    }


    //crear 
    cerrarConsultaComent = () => {
        const commentsRef = database.ref('coments/' + this.props.artist.id);
        commentsRef.off('child_added', this.showAddComent);
    }



    showAddComent = (data) => {
        const coment = data.val();
        const comentNow = this.state.comments;
        comentNow.push(coment);
        this.setState({ comments: comentNow.concat() });
        //console.warn('coment:', this.state.comments);
    }
    pressSendComent = () => {
        // console.warn('enviar',this.state.text);
        //para listas 
        //const uid = firebaseAuth.currentUser.uid;//id del comentario
        const user = firebaseAuth.currentUser
        const postRef = database.ref('coments/' + this.props.artist.id);

        var newPostRef = postRef.push();
        newPostRef.set({
            text: this.state.text,//el comentario
            userPhoto: user.photoURL,
            uid:user.uid,
        });
        //ponemos el texto en blanco
        this.setState({ text: '' });
    }
    render() {
        const artist = this.props.artist;
        return (
            <View style={styles.container}>

                <ArtistBox artist={artist}> </ArtistBox>

                <View style={styles.containerComents}>
                    <View style={styles.containerCome}>
                        <Text style={styles.header}>Comentarios</Text>

                        <CommentListView comments={this.state.comments} />

                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                            placeholder="Write Yours Coments"
                        />
                        <TouchableOpacity onPress={this.pressSendComent}>
                            <Icon name='ios-send-outline' size={35} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        paddingTop: 0
        ,
    },
    containerComents: {

        flex: 1,

    },
    containerCome: {
        flex: 1,
        // backgroundColor: 'red'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        flex: 0.08

    },
    input: {
        flex: 1,
        height: 40


    },
    icon: {
        flex: 0.9
    },
    header: {
        fontSize: 16,
        padding: 10,
        color: 'white',
        backgroundColor: '#444',
        margin: 0,

    }

});
