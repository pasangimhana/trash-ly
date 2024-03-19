import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from '../components/Styles.js';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { firebaseAuth } from '../config';

export default function NavigationBar({ navigation }) {
  const route = useRoute();
  const [profileImage, setProfileImage] = useState(null);

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  const fetchProfileImage = async () => {
    const user = firebaseAuth.currentUser;
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'users', user.email);

    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfileImage(userData.profileImage);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []); // Fetch the profile image when the component mounts

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        onPress={() => navigateTo('Image')}
        style={[
          styles.bottomBarItem,
          route.name === 'Image' && styles.highlightedIcon
        ]}
      >
        <Ionicons
          name={route.name === 'Image' ? 'camera' : 'camera-outline'}
          size={24}
          color={route.name === 'Image' ? 'green' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateTo('Heatmap')}
        style={[
          styles.bottomBarItem,
          route.name === 'Heatmap' && styles.highlightedIcon
        ]}
      >
        <Ionicons
          name={route.name === 'Heatmap' ? 'map' : 'map-outline'}
          size={24}
          color={route.name === 'Heatmap' ? 'green' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateTo('Leaderboard')}
        style={[
          styles.bottomBarItem,
          route.name === 'Leaderboard' && styles.highlightedIcon
        ]}
      >
        <Ionicons
          name={route.name === 'Leaderboard' ? 'trophy' : 'trophy-outline'}
          size={24}
          color={route.name === 'Leaderboard' ? 'green' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateTo('ViewEvent')}
        style={[
          styles.bottomBarItem,
          route.name === 'ViewEvent' && styles.highlightedIcon
        ]}
      >
        <Ionicons
          name={route.name === 'ViewEvent' ? 'calendar' : 'calendar-outline'}
          size={24}
          color={route.name === 'ViewEvent' ? 'green' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateTo('EducationalContent')}
        style={[
          styles.bottomBarItem,
          route.name === 'EducationalContent' && styles.highlightedIcon
        ]}
      >
        <Ionicons
          name={route.name === 'EducationalContent' ? 'book' : 'book-outline'}
          size={24}
          color={route.name === 'EducationalContent' ? 'green' : 'black'}
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => navigateTo('UserProfile')}
        style={[
          styles.bottomBarItem,
          route.name === 'UserProfile' && styles.highlightedIcon
        ]}
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Ionicons
            name={route.name === 'UserProfile' ? 'person' : 'person-outline'}
            size={24}
            color={route.name === 'UserProfile' ? 'green' : 'black'}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
