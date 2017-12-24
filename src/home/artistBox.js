import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
//firebase
import { database, firebaseAuth } from '../services/firebaseService';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class ArtistBox extends Component {
    state = {
        liked: false,
        likesCount: 0,
        comented: false,
        commentsCount: 0,
    }
    //antes de que es componente se monte 
    componentWillMount() {
        //comprueva los likes
        //recupera del user logeado
        const uid = firebaseAuth.currentUser.uid;

        const postRef = database.ref('artist/' + this.props.artist.id);
        //cada ves que cambie de valor hara esto
        postRef.on('value', snapshot => {
            const artist = snapshot.val();
            if (artist) {
                //solo i existe datos
                this.setState({
                    likesCount: artist.likesCount,
                    //sihizo like el usuario  si no pone false
                    liked: artist.likes && artist.likes[uid],
                });
            }
        });

        //optener numero de coments
        // this.cerrarConsultaComent();
        //this.cerrarConsultaComent();
        const commentsRef = database.ref('coments/' + this.props.artist.id);
        commentsRef.on('value', this.showNumComent);
        // this.cerrarConsultaComent();

    }


    showNumComent = (snapshot) => {
        const comentsNum = snapshot.numChildren();
        
        if (comentsNum) {
            this.setState({ commentsCount: comentsNum });
            //console.warn('hola', coments);
            //determina si yo he comentado
            //para que pongo el color de que ya ha comentado
            
            const uid = firebaseAuth.currentUser.uid;
            snapshot.forEach( (item)=> {
                var obj = item.val();
                if(obj.uid==uid){
                    this.setState({comented:true});
                }
            }); 
            
        }

    }

    cerrarConsultaComent = () => {
        const commentsRef = database.ref('coments/' + this.props.artist.id);
        commentsRef.off('value', this.showNumComent);
    }

    pressLike = () => {
        //negara el valor
        //this.setState({ liked: !this.state.liked });
        this.saveLikeFireBase(this.state.liked);

    }
    saveLikeFireBase = (liked) => {
        //recupera del user logeado
        const uid = firebaseAuth.currentUser.uid;
        //conde vamos a guardar
        const postRef = database.ref('artist/' + this.props.artist.id);
        postRef.transaction(function (artist) {
            if (artist) {
                if (artist.likes && artist.likes[uid]) {
                    artist.likesCount--;
                    artist.likes[uid] = null;
                } else {
                    artist.likesCount++;
                    if (!artist.likes) {
                        artist.likes = {};
                    }
                    artist.likes[uid] = true;
                }
            }
            return artist ||//si es la primera ves 
                {
                    likesCount: 1,
                    likes: {
                        [uid]: true,
                    }
                };
        });

    }
    render() {
        //optiene lo que estan pasando en este caso como una variable  artist
        const artist = this.props.artist;
        //cambia el estado si pone like y el color
        const viewLike = this.state.liked ? <Icon name="ios-heart" style={styles.icon} size={35} color='red' /> : <Icon name="ios-heart-outline" style={styles.icon} size={35} color='gray' />;
        const viewCommentd = this.state.comented ? <Icon name='ios-chatboxes' size={35} color='red' /> : <Icon name='ios-chatboxes-outline' size={35} style={styles.icon} />;
        return (

            <View style={styles.boxArtist}>
                <Image source={{ uri: artist.urlImage }} style={styles.imagen} />
                <View style={styles.info}>
                    <Text style={styles.name}>{artist.name}</Text>
                    <View style={styles.likesComent}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={this.pressLike}>
                                {viewLike}
                            </TouchableOpacity>
                            <Text>{this.state.likesCount}</Text>
                        </View>
                        <View style={styles.row}>
                            {viewCommentd}
                            <Text>{this.state.commentsCount}</Text>
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    boxArtist: {
        marginBottom: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        //sombras en Ios solo en Ios 
        shadowColor: 'black',
        shadowOpacity: .9,
        shadowOffset: {
            height: 1,
            width: -2,
        },
        //sombras en Android solo para android       
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    imagen: {
        height: 100,
        width: 100,

    },
    info: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        justifyContent: 'center',

    },
    name: {
        fontSize: 20,
    },

    row: {
        flex: 1,
        paddingTop: 20,
        justifyContent: 'space-between',

        flexDirection: 'column',
        alignItems: 'center'

        // backgroundColor: 'red'
    },
    likesComent: {
        marginHorizontal: 40,
        flexDirection: 'row',
        // backgroundColor: 'red',
    },

});
