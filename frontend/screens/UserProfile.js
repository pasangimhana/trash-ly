import * as React from "react";
import styles from '../components/Styles.js';
import NavigationBar from '../components/NavigationBar.js';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { logoutUser, firebaseAuth, BASE_URL } from '../config';
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function UserProfile({ navigation }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response1 = await axios.get(BASE_URL + 'user', {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTY2MjY5MzcsImV4cCI6MTcyODE2MjkzNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjoiTWFuYWdlciIsInVzZXJfaWQiOiJTRlVUS0tFREhGVUcifQ.wmmdFydZcC5QJ037Ak6tFcJa4hmxpo_RuPSM5aVs_v4`,
      },
    });

    console.log(response1.data);
    setUser(response1.data);
  };

  const handleLogout = async () => {
    try {
      await logoutUser(firebaseAuth);
      navigation.replace('Login'); // Redirect to the login screen after logout
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <View style={styles1.container}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.appTitle}>TRASH.LY</Text>
        <Text style={styles.subTitle}>User Profile</Text>
        <View>
      {user ? (
        <View style={styles1.userCard}>
        <View style={styles1.userCardRow}>
          <Text style={styles1.userCardLabel}>Username:</Text>
          <Text style={styles1.userCardValue}>{user.username}</Text>
        </View>
        <View style={styles1.userCardRow}>
          <Text style={styles1.userCardLabel}>Role:</Text>
          <Text style={styles1.userCardValue}>{user.role}</Text>
        </View>
        <View style={styles1.userCardRow}>
          <Text style={styles1.userCardLabel}>Email:</Text>
          <Text style={styles1.userCardValue}>{user.email}</Text>
        </View>
        
      </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
      </View>
      {/* Your existing UserProfile content here */}
      
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      <NavigationBar navigation={navigation} />
    </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#69c9ab',
    alignItems: 'center',
  },
  userCard: {
    backgroundColor: '#f5f5f5',
    padding: 25,
    borderRadius: 5,
  },
  userCardRow: {
    flexDirection: 'row',
  },
  userCardLabel: {
    flex: 1, // Adjust for label-to-value ratio
    fontWeight: 'bold',
  },
  userCardValue: {
    fontWeight: 'bold',
  },
});
