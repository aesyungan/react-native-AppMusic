import React, { Component } from 'react';
import ComentarioBox from './comentarioBox';
//TouchableOpacity para hacer clic 
import {
    ListView,
    Platform,//determina en que plataforma esta corriendo

} from 'react-native';

export default class ArtistListView1 extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(props.comments),
        };
       // console.warn('hola', props.comments);
    }
    componentWillReceiveProps(newComents) {
        if (newComents.comments != this.props.comments) {
            //console.warn('Cambio',newArtists);
            //cambio los datos 
            this.setState({ dataSource: this.state.dataSource.cloneWithRows(newComents.comments) });
            //console.warn('cambio', this.state.dataSource);
        }
    }

    render() {
        //para determianr en q plataforma estamos
        //const isAndroid=Platform.OS!='ios';
        //console.warn(isAndroid);
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(coment) => {
                    return (
                        <ComentarioBox coment={coment} ></ComentarioBox>
                    )
                }}
            />
        );
    }
}