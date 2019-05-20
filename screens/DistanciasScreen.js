import React, { Component } from 'react';

import { Constants, Location, Permissions } from 'expo';
import {
  Platform,
  StyleSheet,
  CardView,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';


export default class App extends Component<{}> {
   distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

   state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    longitud: null,
    latitude: null
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permiso denegado',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
  
   this.setState({ longitud: location.coords.longitude });
   this.setState({ latitud: location.coords.latitude });
  };

  render() {
    return (
      <ScrollView> 
      <View style={styles.container}>
      {
           this.state.locationResult === null ?
          <Text>Buscando gps...</Text> :
          this.state.hasLocationPermissions === false ?
            <Text>No tenemos permisos</Text>:null
     
        }
        <ImageBackground
            source={require("../assets/fondo.jpg")}
            style={styles.container}>
        <Text>
        {"\n"}
        </Text>
       <View style={styles.fourthrow}><Text style={styles.texto5}>POSICIÓN ACTUAL</Text>
      <Text style={styles.texto6}>
               LONGUITUD: {this.state.longitud}  
           </Text>
            <Text style={styles.texto6}>
                LATITUD: {this.state.latitud}
           </Text>
           <Text>
        {"\n"}
        </Text>
      </View>
      </ImageBackground>
      <View style={styles.firstrow}><Text style={styles.texto1}>Londres          
      </Text>
       <Text style={styles.texto4}>  
           DISTANCIA:
           {
        Math.round(this.distance(this.state.latitud,this.state.longitud,51.5072,-0.1275,'K')*100/100)
           }
           km
        </Text>
        <Image source={{uri: 'https://www.nationalgeographic.com.es/medio/2018/02/27/londres__1280x720.JPG'}}
       style={styles.logo} />
      </View>
      <View style={styles.secondrow}><Text style={styles.texto2}>El Cairo</Text>
      <Text style={styles.texto4}>
       DISTANCIA:
           {
        Math.round(this.distance(this.state.latitud,this.state.longitud,30.0446,31.2456 ,'K')*100/100)
           }
          km
           </Text>
            <Image source={{uri: 'https://cdn.civitatis.com/egipto/el-cairo/galeria/giza.jpg'}}
       style={styles.logo} />
      </View>
      <View style={styles.thirdrow}><Text style={styles.texto3}>Nueva York</Text>
      <Text style={styles.texto4}>
       DISTANCIA:
           {
        Math.round(this.distance(this.state.latitud,this.state.longitud,40.6643,-73.9385,'K')*100/100)
           }
           km
      </Text>
       <Image source={{uri: 'https://images.musement.com/cover/0002/49/thumb_148242_cover_header.jpeg?w=1200&h=630&q=60&fit=crop'}}
       style={styles.logo} />
      </View>
       <View style={styles.firstrow}><Text style={styles.texto1}>Ciudad de Mexico</Text>
       <Text style={styles.texto4}>       
       DISTANCIA:
           {
        Math.round(this.distance(this.state.latitud,this.state.longitud,19.4978, -99.1269,'K')*100/100)
           }
           km
           </Text>
            <Image source={{uri: 'https://static01.nyt.com/images/2017/02/04/universal/5cdmxES2/5cdmxES2-master1050.jpg'}}
       style={styles.logo} />
       </View>
        <View style={styles.fourthrow}><Text style={styles.texto2}>Munich</Text>
        <Text style={styles.texto4}>
        DISTANCIA:
           {
        Math.round(this.distance(this.state.latitud,this.state.longitud,48.1369,11.5753,'K')*100/100)
           }
           km
        </Text>
         <Image source={{uri: 'https://cdn.civitatis.com/alemania/munich/munich.jpg'}}
       style={styles.logo} />
        </View>
      <View style={styles.thirdrow}><Text style={styles.texto3}>Madrid</Text>
      <Text style={styles.texto4}>
      DISTANCIA:
           {
        Math.round(this.distance(this.state.latitud,this.state.longitud,22.34323,105.564,'K')*100/100)
           }
           km
      </Text>
       <Image source={{uri: 'https://static.vueling.com/cms/media/1216306/madrid.jpg'}}
       style={styles.logo} />
       </View>
      </View>
           </ScrollView>

    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
    //flexDirection: "row"
  },
logo: {
        alignItems: 'center',
        width: 370,
        height: 200,
        marginTop: 10,
    },
 texto1: {   textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'black',
    fontSize: 22,
    marginTop: 0, },
  texto2: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'black',
    fontSize: 22,
    marginTop: 0,
  },
  texto3: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'black',
    fontSize: 22,
    marginTop: 0,
  },
texto4: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'black',
    fontSize: 14,
    marginTop: 0,
  },
  texto5: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'white',
    fontSize: 22,
    marginTop: 0,
  },
texto6: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
    marginTop: 0,
  },
  firstrow: {
    flex: 1,
    backgroundColor: 'white',
        marginTop: 20,
 
  },

  secondrow: {
    flex: 1,
    backgroundColor: 'white',
        marginTop: 20
  },

  thirdrow: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20
  },

  fourthrow: {
    flex: 1,
        marginTop: 20
    },
});
