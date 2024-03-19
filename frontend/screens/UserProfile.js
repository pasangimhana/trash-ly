import * as React from "react";
import styles from '../components/Styles.js';
import NavigationBar from '../components/NavigationBar.js';
import { View, Text, TouchableOpacity } from "react-native";
import { logoutUser, firebaseAuth } from '../config';

export default function UserProfile({ navigation }) {
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
