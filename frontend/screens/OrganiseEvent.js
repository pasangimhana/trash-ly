import * as React from "react";
import styles from '../components/Styles.js';
import { Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import NavigationBar from '../components/NavigationBar.js';


export default function OrganiseEvent({ navigation }) {
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

