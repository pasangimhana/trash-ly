import * as React from "react";
import styles from '../components/Styles.js';
import NavigationBar from '../components/NavigationBar.js';
import { Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, ImageBackground } from "react-native";




export default function Leaderboard({ navigation }) {
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

