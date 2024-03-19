import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../components/Styles.js';
//for the input field components
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { firebaseAuth } from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
//importing keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper.js';
import * as SecureStore from 'expo-secure-store';


const MyTextInput = ({ label, icon, placeholder, placeholderTextColor, onChangeText, value, keyboardType, autoCapitalize, isPassword, hidePassword, setHidePassword }) => {
  
  return (
    <View>
      <View style={styles.inputLabelLeftIcon}>
        <Octicons name={icon} size={30} color={'green'} />
      </View>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={isPassword && hidePassword}
      />
      {isPassword && (
        <TouchableOpacity style={styles.inputLabelRightIcon} onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={'green'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const InputField = ({ email, setEmail, password, setPassword })=>{
  const [hidePassword, setHidePassword] = useState(true);
 
  return(
   <View>
      <MyTextInput
        label="Email Address"
        icon="mail"
        value={email}
        placeholder="Email"
        placeholderTextColor="#d3d3d3"
     
        onChangeText={i=>setEmail(i)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
     


      <MyTextInput
        label="Password"
        icon="lock"
        value={password}
        placeholder="* * * * * *"
        placeholderTextColor="#d3d3d3"
        
        onChangeText={v=>setPassword(v)}
        autoCapitalize="none"
        secureTextEntry={hidePassword}
        isPassword={true}
        hidePassword={hidePassword}
        setHidePassword={setHidePassword}
      />
      </View>
  )
};
/*
const InputField2 = ({value,onChangeText})=>{
  const [hidePassword, setHidePassword] = useState(true);
  return(
   <View>

      <MyTextInput
        label="Password"
        icon="lock"
        value={value}
        placeholder="* * * * * *"
        placeholderTextColor="#d3d3d3"
        onChangeText={onChangeText}
        autoCapitalize="none"
        secureTextEntry={hidePassword}
        isPassword={true}
        hidePassword={hidePassword}
        setHidePassword={setHidePassword}
      />
      
    </View>
  



  )
};
*/

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const auth = firebaseAuth;

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      console.log(idToken);
      
          await SecureStore.setItemAsync('idToken', idToken).then(() => {navigation.navigate('Image')});
          console.log('Token stored successfully');

    } catch (error) {
      alert('Log in failed: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#69c9ab' }}>
      <KeyboardAvoidingWrapper>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>ZEROTRASH</Text>
            <Text style={styles.subTitle}>Account Login</Text>
          </View>
          <View style={styles.formArea}>

          <InputField email={email} setEmail={setEmail} password={password} setPassword={setPassword} />

          

         {/*} <InputField2
            value={password}
            onChangeText={v=>setPassword(v)}
          />*/}
         
          </View>

 

          <View style={styles.line}></View>

          <Text style={styles.msgBox}>...</Text>

          <TouchableOpacity style={styles.button} onPress={() => loginUser(email,password)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.extraView}>
            <Text style={styles.extraText}>Don't have an account yet? </Text>
            <TouchableOpacity style={styles.textLink}>
              <Text style={styles.textLinkContent} onPress={() => navigation.navigate("SignUp")}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
}

