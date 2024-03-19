import * as React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../components/Styles.js';
import NavigationBar from '../components/NavigationBar.js';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';



export default function Image({ navigation }) {
  const navigator = useNavigation();
  // Function to handle the image picking
  const handlePickImage = async () => {
    // Request camera permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required!');
      return;
    }

    // Launch the camera with these options
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Optional: allows user to edit the image
      aspect: [4, 3], // Aspect ratio to maintain
      quality: 1, // Highest quality
    });

    // Use the image uri from pickerResult if the image is picked
    if (!pickerResult.cancelled) {
      Alert.alert('Image Picked') //, pickerResult.uri);
      // You can set the picked image uri to state and use it as needed
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.appTitle}>TRASH.LY</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, paddingBottom: 200 }}>
        <View>
          <TouchableOpacity onPress={() => navigator.navigate("Leaderboard")}>
          <View style={styles.imageButton}>
            <Text style={styles.buttonText}>Rank</Text>
          </View>
          </TouchableOpacity>
          <View style={styles.imageButton}>
            <Text style={styles.buttonText}></Text>
          </View>
        </View>

        <View>
          <View style={styles.imageButton}>
            <Text style={styles.buttonText}>Photos</Text>
          </View>
          <View style={styles.imageButton}>
            <Text style={styles.buttonText}></Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{ borderRadius: 50, paddingLeft: 300, paddingBottom: 20 }}
        onPress={handlePickImage} // Attach the handler here
      >
        <Entypo name="camera" size={50} color="black" />
      </TouchableOpacity>

      <NavigationBar navigation={navigation} />
    </View>
  );
}
