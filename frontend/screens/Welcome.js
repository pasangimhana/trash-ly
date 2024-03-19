
import { Text, View, TouchableOpacity} from 'react-native';
import Button from '../components/Button.js';
import styles from '../components/Styles.js';

export default function Welcome({navigation}) {
  
  const handleCommunityMemberPress = () => {
    navigation.navigate("Login")
    
  };

  const handleOrganiserPress = () => {
    // Set isOrganiser to true when Organiser button is clicked
    navigation.navigate('Login', { isOrganiser: true });
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.appTitle}>TRASH.LY</Text>
        <Text style={styles.moto}> Volunteer events to make your </Text>
        <Text style={styles.moto} >community a better place</Text>
      </View> 

      <View style={styles.footerContainer}>
        
       <TouchableOpacity style={{ width: 300, height: 60,  backgroundColor: 'white',  justifyContent: 'center',alignItems: 'center', borderRadius: 10, marginBottom:10 }} onPress={handleCommunityMemberPress}>
          <Text style={styles.buttonText} lab>Community Member</Text></TouchableOpacity>

          <TouchableOpacity style={{width: 300, height: 60,  backgroundColor: 'white',  justifyContent: 'center',alignItems: 'center', borderRadius: 10 }} onPress={handleOrganiserPress}>
          <Text style={styles.buttonText} >Organiser</Text>
          </TouchableOpacity>
              
        
      </View>
      
      
    </View>
  );

}


  