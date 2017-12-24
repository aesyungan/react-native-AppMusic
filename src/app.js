import React, { Component } from 'react';
//navegacion 
import { Router, Stack, Scene } from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HomeView from './home/homeView';
import ArtistDetailsView from './home/artistDetailsView';
import LoginView from './login/loginView';

export default class appMusic extends Component {

  render() {
    return (

      <Router>
        <Stack key="root">
          <Scene key="login" component={LoginView} title="Login" hideNavBar init />
          <Scene key="home" component={HomeView} title="Home" hideNavBar />
          <Scene key="artistDetailsViewTag" component={ArtistDetailsView} title="Details" hideNavBar={false} />
        </Stack>

      </Router>

    );
  }
}
AppRegistry.registerComponent('appMusic', () => appMusic);