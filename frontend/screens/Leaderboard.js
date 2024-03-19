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

  useEffect(() => {
      console.log('Token:', token);
      const getLeaderboard = async (token) => {
        const response1 = await axios.get(BASE_URL + 'leaderboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log(response1.data);
      };
    getLeaderboard();
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

