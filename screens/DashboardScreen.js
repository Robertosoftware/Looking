import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image
  } from "react-native";
  import { Container, Content, Icon, Header, Body, Button } from 'native-base';
  import { createDrawerNavigator, StackNavigator, DrawerItems, SafeAreaView, createAppContainer } from 'react-navigation';
  import * as firebase from 'firebase';
import NoticiasScreen from "../screens/NoticiasScreen";
import ClimaScreen from "../screens/ClimaScreen";
import PerfilScreen from '../screens/PerilScreen';
import ActividadesScreen from '../screens/ActividadesScreen';
import DistanciasScreen from '../screens/DistanciasScreen';
import LogOut from '../screens/LogOut';

export default class DashboardScreen extends Component{
    async Logout(){
        firebase.auth().signOut();
    }

    render() {
        return (
          <Dnavigator />
        )
    }

}

const CustomDrawerContentComponent = (props) => (

    

    <Container>
      <Header style={styles.drawerHeader}>
        <Body>
          <Image
            style={styles.drawerImage}
            source={require('../assets/travel.png')} />
            
        </Body>
        
      </Header>
      <Content>
      
        <DrawerItems {...props} />
       
      
      </Content>
      
      
  
    </Container>
  
  );    

const MyApp = createDrawerNavigator({

    // For each screen that you can navigate to, create a new entry like this:
    Home:{
      screen: PerfilScreen
    },
    'Consulta el clima': {
      screen: ClimaScreen
    },
    Noticias: {
      screen: NoticiasScreen
    },
    'Distancias a destinos populares': {
      screen: DistanciasScreen
    },
    Actividades:{
      screen: ActividadesScreen
    },
    'Cerrar sesión':{
      screen: LogOut
    }
  },    
    {
      initialRouteName: 'Home',
      drawerPosition: 'left',
      contentComponent: CustomDrawerContentComponent,
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle'
  });

  
  const Dnavigator = createAppContainer(MyApp)

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    drawerHeader: {
      height: 200,
      backgroundColor: 'white'
    },
    drawerImage: {
      height: 150,
      width: 150,
      borderRadius: 75
    }
   
  
  })
  



 {/* <View style={styles.container}>
                <Text>DashboardScreen</Text>
                <Button style={{ marginTop: 10 }}
          full
          rounded
          success
          onPress={() => this.LogoutFacebook()}
          title="Cerrar sesión">
          Cerrar Sesión
        </Button>
        </View>*/}

         {/* async LogoutFacebook(){
        firebase.auth().signOut();
    }*/}