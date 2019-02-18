
import React, {Component} from 'react';
import {StyleSheet, Text, View , ScrollView} from 'react-native';
//import RegisterText from '../../components/register/RegisterText'
import RegisterForm from '../../components/register/RegisterForm'

  /*<Icon size={30} name = "ios-trash"/>*/
class PageRegister extends Component {
    render(){
        return(
         <ScrollView>
            <View styles={styles.containerRegisterPage}>
              <RegisterForm navigator={this.props.navigator}/>     
            </View>
          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  containerRegisterPage: {
    flex: 1,
    paddingTop:20,
    alignItems: 'center',
  }

});

export default PageRegister;