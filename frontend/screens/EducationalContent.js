import * as React from "react";
import styles from '../components/Styles.js';
import NavigationBar from '../components/NavigationBar.js';
import { Image, TouchableOpacity, TextInput } from "react-native";
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper.js';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, ImageBackground } from "react-native";



export default function EducationalContent({ navigation }) {
  const handleSearch = () => {
    // Perform the search operation, you can pass the entered text to the parent component or perform the search here.
    console.log('Performing search...');
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.appTitle}>TRASH.LY</Text>
      </View>
      
      <KeyboardAvoidingWrapper>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for events"
            placeholderTextColor="gray"
          />

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingWrapper>

      <NavigationBar navigation={navigation} />
    </View>
    
  );
}

