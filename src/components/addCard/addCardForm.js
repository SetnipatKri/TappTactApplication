import React, {Component} from 'react';
import {StyleSheet, Image ,Text, TextInput, View, TouchableOpacity,PixelRatio,Alert,Platform,ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import * as Validator from 'email-validator';
import RNFetchBlob from 'rn-fetch-blob';
import firebase from 'firebase'
import randomString from 'random-string';
import CacheStore from 'react-native-cache-store';

_isMounted = false;

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const uploadImage = (uri, imageName, mime = 'image/jpg') => {
  this._isMounted = true;
  if(this._isMounted){
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
}

export default class addCardForm extends Component {

    state={
      isLoading: false,
      accountID: '',
      avatarSource: null,
      imagePath:'',
      imageHeight:400,
      imageWidth:170,
      FName:'',
      LName:'',
      Email:'',
      Phone:'',
      SocialMedia:'',
      Company:'',
      Address:'',
      accountImage:'',
      AccountID:'',
      Expand:'',
      Purpose:''
    }
    
    componentWillUnmount() {
      console.log ("UNMOUNTED");
      this._isMounted = false;
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

    addCardHandle= () => {
      //Check Validate All Field
      if(!(/^[a-zA-Z]+$/.test(this.state.FName)))
      {
        Alert.alert('Firstname contain invalid letters');
      }
      else if(this.state.FName==="")
      {
        Alert.alert('Firstname is required')
      }
      else if(!(/^[a-zA-Z]+$/.test(this.state.LName)))
      {
        Alert.alert('Lastname contain invalid letters');
      }
      else if(this.state.LName==="")
      {
        Alert.alert('Lastname is required')
      }
      else if(!(Validator.validate(this.state.Email))&&(this.state.Email!=""))
      {
        Alert.alert('Invalid Email');
      }
      else if(this.state.Email==="")
      {
        Alert.alert('Email is required')
      }
      else if(!(/^[a-zA-Z0-9]+$/.test(this.state.Company)))
      {
        Alert.alert('Company contain invalid letters')
      }
      else if(this.state.Company==="")
      {
        Alert.alert('Company is required')
      }
      else if(this.state.Purpose==="")
      {
        Alert.alert('Cannot leave purpose empty')
      }
      else if(this.state.Phone==="")
      {
        Alert.alert('Cannot leave phone number empty')
      }
      else if(!(/^[a-zA-Z0-9 ]+$/.test(this.state.Purpose)))
      {
        Alert.alert('Purpose contain invalid letters')
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
                    //Send Info to Function
        }).then(
          (async () => {
            const rawResponse = await fetch('https://us-central1-tapptact-219009.cloudfunctions.net/addCard', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                cardFName: this.state.FName,
                cardLName: this.state.LName,
                cardEmail: [{
                    email : this.state.Email,
                    isEmailVerified : true,
                    emailType : "General"
                }],
                cardImage:  this.state.imagePath,
                cardUserPhone: [{
                    phoneNum : this.state.Phone,
                    isNumberVerified : true,
                    phoneNumType : "General"
                }],
                cardSocialMedia: [{
                    accountName : this.state.SocialMedia,
                    URL : "",
                    socialMediaType : ""
                }],
                cardCompany:[{
                  companyName : this.state.Company,
                  companyWebsite : "",
                  companyEmail : "",
                  companyPhoneNum : ""
                }],
                cardAddress:"",
                cardExpand:[{
                }],
                cardPurpose : this.state.Purpose,
                accountID:this.state.accountID,
                accountPic:this.state.accountImage
              })
            });
            const content = await rawResponse.json();
            if(content.hasOwnProperty('errorType'))
            {
              this.setState ({isLoading: false})
              Alert.alert("Please Try Again");
            }
            else
            {
              console.log(content);
              this.props.navigator.pop();
            }
          })
        )
        .catch(err => console.log("FAIL"+err));
      }
    }

    componentWillMount() {
      this._isMounted=true;
      CacheStore.get('AccountInfo').then((value) => {
        const tempAccount = JSON.parse(value)
        const tempID = tempAccount._id;
        const tempImage = tempAccount.accountImage
        if(this._isMounted){
        this.setState({
          accountImage: tempImage,
          accountID: tempID
        })}
      });
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
            <TextInput style = {styles.StarterTextForm} placeholder="Firstname" onChangeText={FName => this.setState({FName})} placeholderTextColor="#191970"/>
            <TextInput style = {styles.TextFieldForm} placeholder="Lastname" onChangeText={LName => this.setState({LName})} placeholderTextColor="#191970"/>
            <TextInput style = {styles.EndForm} placeholder="Email" onChangeText={Email => this.setState({Email})} placeholderTextColor="#191970"/>         
            <TextInput style = {styles.TextFieldForm} placeholder="Company" onChangeText={Company => this.setState({Company})} placeholderTextColor="#191970"/>
            <TextInput style = {styles.EndForm} placeholder="Facebook" onChangeText={SocialMedia => this.setState({SocialMedia})} placeholderTextColor="#191970"/>
            <TextInput style = {styles.TextFieldForm} placeholder="Phone Number" onChangeText={Phone => this.setState({Phone})} keyboardType = 'numeric' placeholderTextColor="#191970"/>
            <TextInput style = {styles.EndForm} placeholder="Purpose" onChangeText={Purpose => this.setState({Purpose})} placeholderTextColor="#191970"/>
            <TouchableOpacity style = {styles.button} onPress={this.addCardHandle}>
            <Text style = {styles.buttonText}> Create Card </Text>
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
    StarterTextForm: {
        width:275,
        height:40,
        backgroundColor: '#BDDEEC',
        fontSize:18,
        borderRadius:15,
        paddingHorizontal:8
      },
    TextFieldForm: {
        marginVertical:15,
        width:275,
        height:40,
        backgroundColor: '#BDDEEC',
        fontSize:18,
        borderRadius:15,
        paddingHorizontal:8
      },
      EndForm: {
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
        alignItems: 'center',
      },
      avatar: {
        width: 350,
        height: 200,

      },
      button: {
        marginVertical:15,
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