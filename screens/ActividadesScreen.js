import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    StatusBar,
    ListView,
    ImageBackground
} from "react-native";
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';
import * as firebase from 'firebase';
import firebaseConfig from '../config/FirebaseConfig';
var data=[]

class ActividadesScreen extends Component {

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>r1 !== r2})

        this.state = {
            listViewData: data,
            newContact: ""
        }
    }

    componentDidMount(){
        var that = this 
        firebase.database().ref('/actividades').on('child_added',function(data){
            var newData = [...that.state.listViewData]
            newData.push(data)
            that.setState({listViewData: newData})
        })
    }

    addRow(data){
        var key = firebase.database().ref('/actividades').push().key
        firebase.database().ref('/actividades').child(key).set({name:data})

    }

    async deleteRow(secId, rowId, rowMap, data) {

        await firebase.database().ref('actividades/' + data.key).set(null)
    
        rowMap[`${secId}${rowId}`].props.closeRow();
        var newData = [...this.state.listViewData];
        newData.splice(rowId, 1)
        this.setState({ listViewData: newData });
    
      }
    

    showInformation(){

    }
    
    render() {
        return (
            <ImageBackground
            source={require("../assets/plan.jpg")}
            style={styles.container}>
              <View 
               style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 10,
            }}
            >
                <Header style={styles.headtop}>
                    <Content>
                        <Item style={styles.boton}>
                            <Input style={styles.text}
                                onChangeText={(newContact) => this.setState({newContact})}
                                placeholder="Agregar Actividad"
                            />
                            <Button style={styles.botons}
                            onPress={()=>this.addRow(this.state.newContact)}>
                                <Icon  name="add"/>
                            </Button>
                        </Item>
                    </Content>
                </Header>
                <Content>
                    <List
                        enableEmptySections
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data=>
                            <ListItem>
                                <Text style={styles.texto}>{data.val().name}</Text>
                            </ListItem>
                        }
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={()=>this.deleteRow(secId, rowId, rowMap, data)}>
                                <Icon name="trash"/>
                            </Button>
                        }
                        rightOpenValue={-75}
                    />
                </Content>
            </View>
            </ImageBackground>
        );
    }
}
export default ActividadesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
  
      },
    text:{
        fontSize: 14,
        color: 'black',
        justifyContent: 'center',
    },
    texto:{
        fontSize: 16,
        paddingHorizontal: 15,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,

    },
    boton:{
        backgroundColor: 'white',
      },
    botons:{
        backgroundColor: 'gray',
      },
    headtop:{
        marginTop:StatusBar.currentHeight,
        backgroundColor: 'white',
    },
});