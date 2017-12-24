import React, { Component } from 'react';
import ArtistBox from './artistBox';
//TouchableOpacity para hacer clic 
import {
    ListView,
    TouchableOpacity,
    Platform,//determina en que plataforma esta corriendo
} from 'react-native';
//router flux
import { Actions } from 'react-native-router-flux';
export default class ArtistListView1 extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(props.artists),
        };
    }
    componentWillReceiveProps(newArtists) {
        if (newArtists.artists != this.props.artists) {
            //console.warn('Cambio',newArtists);
            //cambio los datos 
            this.setState({ dataSource: this.state.dataSource.cloneWithRows(newArtists.artists) });
        }
    }
    PressItem(artist) {
       // console.warn('artis', artist);
        //para ir a una view mando paramepros 
        Actions.artistDetailsViewTag({ artist: artist });
    }
    render() {
        //para determianr en q plataforma estamos
        //const isAndroid=Platform.OS!='ios';
        //console.warn(isAndroid);
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(artist) => {
                    return (
                        <TouchableOpacity onPress={() => this.PressItem(artist)}>
                            <ArtistBox artist={artist}> </ArtistBox>
                        </TouchableOpacity>
                    )
                }}
            />
        );
    }
}

