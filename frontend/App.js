//import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useState,useEffect} from 'react';


//importing the screens
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Heatmap from './screens/Heatmap';
import ImageScreen from './screens/Image';
import Leaderboard from './screens/Leaderboard';
import ViewEvent from './screens/ViewEvent';
import OrganiseEvent from './screens/OrganiseEvent';
import EducationalContent from './screens/EducationalContent';
import UserProfile from './screens/UserProfile';

import { onAuthStateChanged } from 'firebase/auth';
import { firebaseApp, firebaseAuth } from './config'; // Importing the app instance

//new imports according to the new video

import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();

//importing the react navigation stack
//import RootStack from './navigators/RootStack';



function App() {
  const[initialising,setInitialising] =useState(true);
  const [user, setUser] = useState();


  function handleAuthStateChanged(user) {
    setUser(user);
    //console.log("User", user);
    if (initialising) setInitialising(false);
  }
  const auth = firebaseAuth;

  useEffect(() => {
   
   onAuthStateChanged(auth, handleAuthStateChanged);
   
   //return subscriber;
   }, [auth]);  // Add 'auth' as a dependency to useEffect



  if (initialising) return null;

  if (!user){
    return(
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#69c9ab',
          },
          headerTransparent: 'false',
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );

  }
  return (
    <Stack.Navigator >
      <Stack.Screen
          name="Image"
          component={ImageScreen}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="Heatmap"
          component={Heatmap}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewEvent"
          component={ViewEvent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrganiseEvent"
          component={OrganiseEvent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EducationalContent"
          component={EducationalContent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
}
export default () =>{
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <App />
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#69c9ab',
    alignItems: 'center',
    justifyContent:'center',
  },
});
