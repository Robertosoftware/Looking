import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import * as firebase from 'firebase';


class LogOut extends Component {
     LogoutFacebook(){
        firebase.auth().signOut();
    }
    render() {
        return (
            <View style={styles.container}>
                {this.LogoutFacebook()}
            </View>
        );
    }
}
export default LogOut;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});