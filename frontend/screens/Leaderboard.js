import * as React from "react";
import styles from '../components/Styles.js';
import NavigationBar from '../components/NavigationBar.js';
import { Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import axios from 'axios';
import { BASE_URL } from "../config.js";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';



export default function Leaderboard({ navigation }) {

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

  const getLeaderboard = async () => {
    try {
      const response = await axios.get(BASE_URL + 'leaderboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log("token " + token);
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access. Token might be invalid or expired.');
        // Handle the 401 error (e.g., refresh token, log out the user)
      } else {
        console.error('Error getting leaderboard:', error.message);
      }
    }
  };
  
  useEffect(() => {
    if (token) {
      getLeaderboard();
    }
  }, [token]);
  
  return (
    <View style={styles.container}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.appTitle}>TRASH.LY</Text>
      </View>

      {/* Your existing Heatmap content here */}

      <NavigationBar navigation={navigation} />
    </View>
  );
}

