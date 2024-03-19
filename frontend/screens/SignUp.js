import React, {useState} from 'react';
import{View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../components/Styles.js';
//for the input field components
//import { Formik } from 'formik';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

import { BASE_URL, firebaseApp, firebaseAuth } from '../config';
//importing keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper.js';
import { useNavigation } from '@react-navigation/native';
import{Octicons, Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const MyTextInput = ({ label, icon, placeholder, placeholderTextColor, onChangeText,  value, keyboardType, autoCapitalize, isPassword, hidePassword, setHidePassword}) => {
  return (
    <View>
      <View style={styles.inputLabelLeftIcon}>
        <Octicons name={icon} size={30} color={'green'} />
      </View>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={isPassword && hidePassword}
      />
      {isPassword &&(
        <TouchableOpacity style={styles.inputLabelRightIcon} onPress={()=> setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword? "eye-off": "eye"} size={30} color={'green'} />{/*to change the icon we use useState */}
        </TouchableOpacity>

      )}
    </View>
  );
};


const SignUpInputField = ({ isOrganiser, name, email, password, confirmPassword, setName, setEmail, setPassword, setConfirmPassword }) => {
  const [hidePassword, setHidePassword] = useState(true);
  return(
    <View>
    {isOrganiser ? (
      <MyTextInput
        label="Organisation Name"
        icon="organization"
        placeholder="Enter organisation name"
        placeholderTextColor='#d3d3d3'
        value={name}
        onChangeText={(text) => setName(text)}
      />
    ) : (
      <MyTextInput
        label="Name"
        icon="person"
        placeholder="Enter your name"
        placeholderTextColor='#d3d3d3'
        value={name}
        onChangeText={(text) => setName(text)}
      />
    )}
      <MyTextInput
        label="Email Address"
        icon="mail"
        placeholder="Email"
        placeholderTextColor='#d3d3d3'
        value={email}
        onChangeText={(text) => setEmail(text)}       
        keyboardType="email-address" //indicates that the input is expected to be an email address.
        autoCapitalize='none'
      />
      <MyTextInput
        label="Password"
        icon="lock"
        placeholder="* * * * * *"
        placeholderTextColor='#d3d3d3'
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize='none'
        secureTextEntry={hidePassword} //setting true to hide password
        isPassword={true}
        //passing the hidePassword value and the set function to myTextInput so the right icon can be accessed
        hidePassword={hidePassword}
        setHidePassword={setHidePassword}
      />
      <MyTextInput
        label="Confirm Password"
        icon="lock"
        placeholder="* * * * * *"
        placeholderTextColor='#d3d3d3'
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        autoCapitalize='none'
        secureTextEntry={hidePassword} //setting true to hide password
        isPassword={true}
        //passing the hidePassword value and the set function to myTextInput so the right icon can be accessed
        hidePassword={hidePassword}
        setHidePassword={setHidePassword}
      />
      </View>
  )
}


//each screen in our stack navigator will receive an navigation object as a property. This object allows navigation between the screens
export default function SignUp(){
  const navigation = useNavigation();
  const firestore = getFirestore();
  const [isOrganiser, setIsOrganiser] = useState(); // State to track if the user is an organizer
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  signInUser = async (email,password) => {
    try{
      // Validate passwords match before attempting to create an account
      if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      const auth=firebaseAuth;
      const userCredential=await createUserWithEmailAndPassword(auth, email, password);
      const user=userCredential.user;
      const idToken = await user.getIdToken();
      
      const response = await axios.post(BASE_URL + 'user/create', {
          username: name,
          email: email,
          role: isOrganiser ? 'organiser' : 'community user',
        }, {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        });
        console.log(response.data);

      // Save user data to Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        email,
        password, // Note: You may want to avoid storing passwords directly and use proper authentication methods.
        name,
      });
      
      await SecureStore.setItemAsync('idToken', idToken).then(() => {navigation.navigate('Image')});
      console.log('Token stored successfully');

    } catch(error){
      alert("Sign in failed: "+error.message);
    }
  };
  


    


    return(
      <SafeAreaView style={{flex:1, backgroundColor:'#69c9ab'}}>
      <KeyboardAvoidingWrapper>
        <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'center',}}>
          <Text style={styles.appTitle}>TRASH.LY</Text>
          <Text style={styles.subTitle}>
          Account Signup - {isOrganiser ? 'Organiser' : 'Community User'}
          </Text>
        </View>
          <View style={styles.formArea}>
          <SignUpInputField
              isOrganiser={isOrganiser}
              name={name}
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
           

              email={email}
       
              password={password}
    
              confirmPassword={confirmPassword}
           
            />
         </View>
          
            
       
          <Text style={styles.msgBox}>...</Text>
              
              <TouchableOpacity style={styles.button} onPress={() => signInUser(email,password)}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              
              <View style={styles.extraView}>
                <Text style={styles.extraText}>Already have an account? </Text>
                <TouchableOpacity style={styles.textLink} ><Text style={styles.textLinkContent} onPress={()=>navigation.navigate("Login")}>Login</Text></TouchableOpacity>
              </View>
          
        </View>
        </KeyboardAvoidingWrapper>
        </SafeAreaView>
    );
}
