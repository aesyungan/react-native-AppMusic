import React, { Component } from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';

export default class ComentarioBox extends Component {
    render() {
        //console.warn('data',this.props);
        return (
            <View style={styles.coments}>
                 <Image source={{ uri: this.props.coment.userPhoto }} style={styles.imagen} />
                <Text style={styles.text}>
                    {this.props.coment.text}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    coments: {
        flexDirection:'row',
        backgroundColor: '#ecf0f1',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems:'center'
    },
    text: {
        fontSize: 16,
    },
    imagen:{
        height: 30,
        width: 30,
        margin:2,
        borderRadius:14,
        marginRight:10,
    }


});

