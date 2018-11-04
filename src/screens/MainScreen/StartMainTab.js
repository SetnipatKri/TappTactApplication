import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
const StartMainTab = () =>{
    Promise.all([
        Icon.getImageSource("md-contact",30),
        Icon.getImageSource("md-card",30),
        Icon.getImageSource("md-swap",30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "TappTact-PageContactList",
                    label: "Contact",
                    title: "Contact",
                    icon: sources[0]
                },
                {
                    screen: "TappTact-PageCardList",
                    label: "Card",
                    title: "Card",
                    icon: sources[1]               
                },
                {
                    screen: "TappTact-PageExchangeCard",
                    label: "Exchange",
                    title: "Exchange",
                    icon: sources[2]
                }
            ]
        });
    }).catch(); 
};

export default StartMainTab;