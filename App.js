
import {Navigation} from 'react-native-navigation';
import PageLogin from './src/screens/LoginScreen/PageLogin';
import PageRegister from './src/screens/RegisterScreen/PageRegister';
import PageContactList from './src/screens/ContactListScreen/PageContactList';
import PageCardList from './src/screens/CardListScreen/PageCardList';
import PageExchangeCard from './src/screens/ExchangeCardScreen/PageExchangeCard';
//Login Screen
Navigation.registerComponent("TappTact-PageLogin" , () => PageLogin);
//Register Screen
Navigation.registerComponent("TappTact-PageRegister" , () => PageRegister);
//Tabbed
Navigation.registerComponent("TappTact-PageContactList" , () => PageContactList);
Navigation.registerComponent("TappTact-PageCardList" , () => PageCardList);
Navigation.registerComponent("TappTact-PageExchangeCard" , () => PageExchangeCard);

Navigation.startSingleScreenApp({
  screen: {
    screen: "TappTact-PageLogin",
    title: "Login"
  }
});