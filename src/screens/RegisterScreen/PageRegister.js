
import React, {Component} from 'react';
import {StyleSheet, Text, View , ScrollView} from 'react-native';
import RegisterText from '../../components/register/RegisterText'
import RegisterForm from '../../components/register/RegisterForm'

  /*<Icon size={30} name = "ios-trash"/>*/
class PageRegister extends Component {
    render(){
        return(
        <View style={styles.containerRegisterPage}>
            <ScrollView>
              <RegisterText/>
              <RegisterForm navigator={this.props.navigator}/>     
            </ScrollView>
        </View>
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