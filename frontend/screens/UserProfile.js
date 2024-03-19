import * as React from "react";
import styles from '../components/Styles.js';
import NavigationBar from '../components/NavigationBar.js';
import { View, Text, TouchableOpacity } from "react-native";
import { logoutUser, firebaseAuth, BASE_URL } from '../config';
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function UserProfile({ navigation }) {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const retrieveToken = async () => {
        const storedToken = await SecureStore.getItemAsync('idToken');
        if (storedToken) {
          setToken(storedToken);
          return;
        }
    };

    retrieveToken();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(BASE_URL + 'user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log(response.data);
      } catch (error) {
        console.error('Error getting user:', error.message);
      }
    };
  
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser(firebaseAuth);
      navigation.replace('Login'); // Redirect to the login screen after logout
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.appTitle}>TRASH.LY</Text>
      </View>

      {/* Your existing UserProfile content here */}
      
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      <NavigationBar navigation={navigation} />
    </View>
  );
}
