/**
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Button, View, Alert, TextInput} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
      ticket: undefined
   }

   handleTicket = (text) => {
      this.setState({ ticket: text })
   }

   state = {
      password: undefined
   }

   handlePassword = (text) => {
      this.setState({ password: text })
   }

   state = {
      user: undefined
   }

   handleUser = (text) => {
      this.setState({ user: text })
   }

   state = {
      endpoint: undefined
   }

   handleEndpoint = (text) => {
      this.setState({ endpoint: text });
   }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>FAD SDK </Text>
        <Text style={styles.instructions}>Implementacion de ejemplo de biometria y multifirma</Text>
        <Text/>
           <TextInput
          name="endpoint"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 , margin: 16}}
          onChangeText = {this.handleEndpoint}
          placeholder="URL"/>
          <Text/>
             <TextInput
          name="user"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 , margin: 16}}
          onChangeText = {this.handleUser}
          placeholder="User"/>
          <Text/>
             <TextInput
          name="password"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 , margin: 16}}
          onChangeText = {this.handlePassword}
          placeholder="Password"/>
        <Button
         style={styles.actionButtonsContainer}
        title="FAD Biometría" onPress={() => startFadBIO(this.state.user, this.state.password, this.state.endpoint)} />
        <Text/>
        <Button
         style={styles.actionButtonsContainer}
        title="FAD" onPress={() => startFad(this.state.ticket, this.state.endpoint)} />
        <Text/>
        <Button
         style={styles.actionButtonsContainer}
        title="Process Info" onPress={() => getValidationInfo("ba7a41cd-5930-4064-8057-cd71747baed2")} />
        <TextInput
          name="username"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 , margin: 16}}
          onChangeText = {this.handleTicket}
          placeholder="Ticket"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

import { NativeModules } from 'react-native';
var FadBio = NativeModules.FadBio;
var Fad = NativeModules.Fad;

function startFad(ticket = "prueba", endpoint = "https://uat.firmaautografa.com"){
  console.log(endpoint);
  var json = {
    "endpoint": `${endpoint}`,
    "preventScreenCapture": false,
    "ticket": `${ticket}`,
    "timeVideoAgreement":28
  };
  console.log(JSON.stringify(json));
  Fad.initFad( JSON.stringify(json)
    ,() => {
      showAlert("Success");
    }, (error) => {
      showAlert("Error: " + error);
  });
}

var ticket = ""
var user = "avillanueva@na-at.com.mx"
var password = "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646"
var endpoint = "https://uat.firmaautografa.com"

function startFadBIO(user = "avillanueva@na-at.com.mx", password = "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646", endpoint = "https://uat.firmaautografa.com"){
  console.log(endpoint);
  var json = {
    "fadCredentials": {
      "client": "fad",
      "secret": "fadsecret",
      "grantType": "password",
      "username": `${user}`,
      "password": `${password}`,
      "tokenType": null,
      "accessToken": null
    },
    "endpoint": `${endpoint}`,
    "processId": null,
    "preventScreenCapture": false,
    "onlineProcess":true,
    "modules": [
      {
        "module": "identity",
        "config": {
          "showIsValidity": false,
          "showSecurityFeatures": false,
          "showDialogConfirm": false,
          "validityINE": false,
          "ocrApiKey": "14ef87fb55dee5ea755e7ee9ce04ab817275577d167c10768e68d88c6bf31941",
          "ocrModuleName": "SDK Engie",
          "isIne": true,
          "isPassport": false,
          "isIneManual": true,
          "includeOthers": true,
          "isGenericPassport": true,
          "showOcrFormValidation": false,
          "isAcuantCapture": true,
          "providerConfiguration":{
            "acUserName": "Acuant_Admin@BdC.com",
            "acPassword": "J6Jqt2XbQ6^)GefD",
            "acSubscriptionId": "ce8066aa-1196-4071-a4c3-ededff1c3f17",
            "acFrmEndpoint": "https://frm.acuant.net",
            "acAssureIdEndpoint": "https://services.assureid.net",
            "acMediscanEndpoint": "https://medicscan.acuant.net",
            "acPassiveLivenessEndpoint": "https://us.passlive.acuant.net",
            "acAcasEndpoint": "https://acas.acuant.net",
            "acOzoneEndpoint": "https://ozone.acuant.net"
          }
        }
      },
      {
        "module": "other_docs",
        "config": {
          "isOptionalMode": true,
          "limitDocuments": 5
        }
      },
      {
        "module": "face",
        "config": {
          "mode": 0,
          "captureTime": 0,
          "sequenceNumber": 0,
          "onlyFrontCamera": true,
          "onlyRearCamera": false,
          "faceCompareInfo": true,
          "faceCompareId": false,
          "availableGestures": [1, 2, 3, 4 ]
        }
      },
      {
        "module": "resume",
        "config": {
          "showResult" : "true",
          "deleteOnSuccess" : false,
          "extras": {
            "llave": "valor"
          }
        }
      }
    ]
  };

  console.log(JSON.stringify(json));
  console.log("FadBio = " + FadBio);

  FadBio.initFadBio(
    JSON.stringify(json),
    // success callback
    (success, processId) => {
      processSuccess(success, processId);
    },
    // error callback
    (error, processId) => {
      processFailed(error, processId);
  });
}

function processSuccess(success, processId) {
  if (success) {
    showAlert("Proceso terminado con éxito.\nID: " + processId);
    getValidationInfo(processId);
  } else {
    showAlert("Proceso terminado sin éxito.");
  }
}

function getValidationInfo(processId) {
  var startTime = new Date().getTime();
  FadBio.getValidationInfo(processId,
      // success callback
      (data) => {
        console.log(data);
        var endTime = new Date().getTime();
        showAlert("Result in: " + (endTime - startTime) + " millis.");
      },
      // error callback
      (error) => {
        showAlert("Error: " + error);
    });
}

function showAlert(msg){
  Alert.alert(
    'Alert Title',
    msg,
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}

// ----------------------------------------------------------------------

/*import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import image from './assets/free.png'
*/
/**
 * Para utilizar un gestor de imagenes podemos instalar uno de expo:
 * https://docs.expo.dev/versions/latest/sdk/imagepicker/
 * > expo install expo-image-picker
 */
/*import * as ImagePicker from 'expo-image-picker'

const App = () => {

  const [selectedImage, setSelectedImage] = useState(null)

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera is required')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    console.log(pickerResult)

    if (pickerResult.cancelled === true) {
      return
    }

    setSelectedImage({ localUri: pickerResult.uri })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <Image
        style={styles.images_radius}
        source={{
          uri: selectedImage !== null
            ? selectedImage.localUri
            : 'https://picsum.photos/200/200'
        }} />
      <Image
        style={styles.images}
        source={image} />
      <Button
        color='#123456'
        title='Enter'
        onPress={() => showAlert()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={openImagePickerAsync}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929'
  },
  title: {
    color: '#fff',
    fontSize: 30
  },
  images: {
    height: 200,
    width: 200
  },
  images_radius: {
    height: 200,
    width: 200,
    borderRadius: 10,
    resizeMode: 'contain'
  },
  button: {
    backgroundColor: 'blue',
    padding: 7,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  }
})

function showAlert() {
  console.log('Button Click')
  ToastAndroid.show("Button Click!", ToastAndroid.SHORT)
  Alert.alert('Button Click')
}

export default App;*/