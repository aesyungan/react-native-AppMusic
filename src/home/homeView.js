import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import ArtistListView from './artistListView';
import { getArtists } from '../services/artistClientService';
export default class HomeView extends Component {
  //inicializar estados
  state = {
    artists: null
  }
  componentWillMount() {
    getArtists().then(data =>
      // console.warn('data2',data);
      this.setState({ artists: data })
    );
  }
  render() {
    /*
        const artist = {
          urlImage: "https://1.bp.blogspot.com/-cuFyQdp8Dyc/UgVPAQcP5lI/AAAAAAAFj2Q/LuokZK-E1NE/s1600/images.jpg",
          name: 'Daft Punk',
          comment: 100,
          like: 500,
        }
        
        const dataArtists = [artist, artist, artist, artist, artist, artist,];
        */
    const dataArtists = this.state.artists;
    if (dataArtists == []) {
      return (
        <View style={styles.container}>

        </View>
      );
    }
    return (
      <View style={styles.container}>
        {dataArtists == null ? <ActivityIndicator size='large' color='white' /> : <ArtistListView artists={dataArtists}></ArtistListView>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: Platform.select({
      ios: 20,
      android: 1,
    }),
  },
});
