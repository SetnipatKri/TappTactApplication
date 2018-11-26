import React, {Component} from 'react';
import {StyleSheet, Image ,Text, TextInput, View, TouchableOpacity,PixelRatio,Alert,Platform,ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import * as Validator from 'email-validator';
import RNFetchBlob from 'rn-fetch-blob';
import firebase from 'firebase'
import randomString from 'random-string';

//init Firebase
const config = {
  apiKey: "AIzaSyAtCdzjsp1VDGpkOixEQSEloGjGIfL3RgI",
  authDomain: "tapptact-219009.firebaseapp.com",
  storageBucket: "tapptact-219009.appspot.com",
}
firebase.initializeApp(config)

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const uploadImage = (uri, imageName, mime = 'image/jpg') => {
  return new Promise((resolve,reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.uri.replace('file://', '') : uri
      let uploadBlob = null
      const imageRef = firebase.storage().ref('images').child(imageName)
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default class signUpText extends Component {

    state={
      isLoading: false,
      avatarSource: null,
      imagePath:'',
      imageHeight:150,
      imageWidth:150,
      username:'',
      password:'',
      email:'',
      fname:'',
      lname:'',
      phone:''
    }
    
    //Select Photo
    selectPhotoTapped() {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };
      ImagePicker.showImagePicker(options,(response)=>{
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled photo picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
          this.setState({
            avatarSource: source,
            imagePath: source
          });
        }
      });
    }

    // testRegisterHandle= () => {
    //     var ImageName = randomString({length: 30});
    //     console.log(ImageName);
    // }   

    registerHandle= () => {
      //Check Validate All Field
      if(this.state.username.length<6)
      {
        Alert.alert('Username is too short');
      }
      else if((this.state.username.length>18))
      {
        Alert.alert('Username is too long')
      }
      else if(!(/^[a-zA-Z0-9]+$/.test(this.state.username)))
      {
        Alert.alert('Username contain invalid letters')
      }
      else if(this.state.password.length<6)
      {
        Alert.alert('Password is too short');
      }
      else if((this.state.password.length>18))
      {
        Alert.alert('Password is too long');
      }
      else if(!(/^[a-zA-Z0-9]+$/.test(this.state.password)))
      {
        Alert.alert('Password contain invalid letters');
      }
      else if(!(Validator.validate(this.state.email)))
      {
        Alert.alert('Invalid Email');
      }
      else if(!(/^[a-zA-Z]+$/.test(this.state.fname)))
      {
        Alert.alert('Firstname contain invalid letters');
      }
      else if(!(/^[a-zA-Z]+$/.test(this.state.lname)))
      {
        Alert.alert('Lastname contain invalid letters');
      }
      else if(this.state.avatarSource==null){
        Alert.alert('Please select image');
      }
      else
      {
        this.setState ({isLoading: true})
        //Wait for image upload Finish
        var ImageName = randomString({length: 30});
        var TempImageName = ImageName + this.state.username;
        uploadImage(this.state.imagePath,TempImageName).
        then(temp => {
            this.state.imagePath = temp;
        }).then(
          (async () => {
            const rawResponse = await fetch('https://us-central1-tapptact-219009.cloudfunctions.net/Register', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                accountLoginEmail: this.state.email,
                accountUsername: this.state.username,
                accountPassword: this.state.password,
                accountFName: this.state.fname,
                accountLName: this.state.lname,
                accountEmail: [{
                    email : this.state.email,
                    isEmailVerified : true,
                    emailType : "General"
                }],
                accountImage:  this.state.imagePath,
                accountPhone: [{
                    phoneNum : this.state.phone,
                    isNumberVerified : true,
                    phoneNumType : "General"
                }],
                accountSocialMedia: [{
                    accountName : "",
                    URL : "",
                    socialMediaType : ""
                }]
              })
            });
            const content = await rawResponse.json();
            if(content.hasOwnProperty('_id'))
            {
              console.log(content);
              this.props.navigator.pop();
            }
            else
            {
              this.setState ({isLoading: false})
              Alert.alert("Please Try Again");
            }
          })
        )
        .catch(err => console.log("FAIL"+err));
        
      }
    }

    render() {
        return (
          this.state.isLoading
          ?
          <View>
              <ActivityIndicator size="large" color="#330066" animating />
          </View>
          :
        <View style={styles.containerSignUpForm}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
            { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                <Image style={styles.avatar} source={this.state.avatarSource} />
            }
            </View>
            </TouchableOpacity>
            <TextInput style = {styles.UserNameForm} placeholder="Username" onChangeText={username => this.setState({username})} placeholderTextColor="#191970"/>
            <TextInput style = {styles.PasswordForm} secureTextEntry={true} placeholder="Password" onChangeText={password => this.setState({password})} placeholderTextColor="#191970"/>
            <TextInput style = {styles.EmailForm} placeholder="Email" onChangeText={email => this.setState({email})} placeholderTextColor="#191970"/>         
            <TextInput style = {styles.PasswordForm} placeholder="Firstname" onChangeText={fname => this.setState({fname})} placeholderTextColor="#191970"/>
            <TextInput style = {styles.UserNameForm} placeholder="Lastname" onChangeText={lname => this.setState({lname})} placeholderTextColor="#191970"/>
            <TextInput style = {styles.PasswordForm} placeholder="Phone Number (Optional)" onChangeText={phone => this.setState({phone})} keyboardType = 'numeric' placeholderTextColor="#191970"/>
            <TouchableOpacity style = {styles.button} onPress={this.registerHandle}>
            <Text style = {styles.buttonText}> Register </Text>
          </TouchableOpacity>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    containerSignUpForm: {
      paddingVertical: 16,
      alignItems: 'center',
    },
    signUpText: {
        fontSize:24,
        fontWeight:'bold',
        color:'#1a6aab'
    },
    UserNameForm: {
        width:275,
        height:40,
        backgroundColor: '#BDDEEC',
        fontSize:18,
        borderRadius:15,
        paddingHorizontal:8
      },
      PasswordForm: {
        marginVertical:15,
        width:275,
        height:40,
        backgroundColor: '#BDDEEC',
        fontSize:18,
        borderRadius:15,
        paddingHorizontal:8
      },
      EmailForm: {
        width:275,
        height:40,
        backgroundColor: '#BDDEEC',
        fontSize:18,
        borderRadius:15,
        paddingHorizontal:8
      },
      avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
      },
      avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
      },
      button: {
        paddingVertical:10,
        backgroundColor: '#124874',
        width:275,
        borderRadius:15
      },
      buttonText: {
        fontSize:18,
        textAlign:'center',
        fontWeight:'500',
        color:'#ffffff'
      }
  });