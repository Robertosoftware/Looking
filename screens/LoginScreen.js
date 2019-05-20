import React, { Component } from "react";
import { 
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Button,
  AppRegistry
} from "react-native";
import * as firebase from 'firebase';
import {firebaseConfig} from '../config/FirebaseConfig';

firebase.initializeApp(firebaseConfig);


class LoginScreen extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
};

onSignIn = googleUser => {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(
    function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(function(result) {
            console.log('user signed in ');
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now()
                })
                .then(function(snapshot) {
                  // console.log('Snapshot', snapshot);
                });
            } else {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .update({
                  last_logged_in: Date.now()
                });
            }
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this)
  );
};
    

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
          if (user != null) {
            console.log(user)
          }
        })
    }
    
      async loginWithFacebook(){
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('609042169609691', { permissions: ['public_profile', 'email'] })
        if(type=='success'){
          const credential = firebase.auth.FacebookAuthProvider.credential(token)
          firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error)=>{
            console.log(error)
          })
        }
      }

    signInWithGoogleAsync = async () =>{
        try{
            const result = await Expo.Google.logInAsync({
                behavior: 'web',
                androidClientId: '820048818141-522f5govbcfco07psovlh0je5te05l23.apps.googleusercontent.com',
                iosClientId: '820048818141-s5kqc4ro98ooikdlfmktvr6u5pldrns7.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });
            if(result.type==='success'){
              this.onSignIn(result);
              return result.accessToken;
            }else{
                return {cancelled: true};
            }
            }catch (e){
                return {error: true};
            }
            
        }
    
    
        render() {
          return (
            <ImageBackground
            source={require("../assets/look.jpg")}
            style={styles.container}>
              <View 
               style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 10,
            }}
            >
               <Image    style={styles.logo}
            source={require("../assets/logo2.png")}/>
             <TouchableOpacity
           style={styles.button}
           onPress={() => this.signInWithGoogleAsync()}       >
           <Text style={[styles.texto]}> Iniciar sesión con Google </Text>
         </TouchableOpacity>
                <Text>
                {"\n"}
                </Text>
                <TouchableOpacity
           style={styles.button}
           onPress={() => this.loginWithFacebook()}>
            <Text style={[styles.texto] }> Iniciar sesión con Facebook </Text>
         </TouchableOpacity>
              </View>
              </ImageBackground>
          );
      }
  }
  
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
  
      },
      logo: {
      width: null,
      resizeMode: 'contain',
      height: 220
    },
    button: {
      shadowColor: 'rgba(0,0,0, .4)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      backgroundColor: 'white',
      borderRadius: 15,
      borderWidth: 1,
      borderColor:'#2196F3',
      elevation: 2, // Android
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  
    },
    texto: {
      padding: 20,
      fontSize: 18,
      color: '#2196F3'
    },
  });