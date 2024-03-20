import * as React from "react";
import styles from "../components/Styles.js";
import NavigationBar from '../components/NavigationBar.js';
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import axios from 'axios';
import { BASE_URL } from "../config.js";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export default function Leaderboard({ navigation, data = []}) {
  const [user, setUser] = useState();
  useEffect(() => {
    const getLeaderboard = async () => {
      const response1 = await axios.get(BASE_URL + 'leaderboard', {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTY2MjY5MzcsImV4cCI6MTcyODE2MjkzNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjoiTWFuYWdlciIsInVzZXJfaWQiOiJTRlVUS0tFREhGVUcifQ.wmmdFydZcC5QJ037Ak6tFcJa4hmxpo_RuPSM5aVs_v4`,
        },
      });
  
      console.log(response1.data);
      setUser(response1.data);
      console.log(user);
    };
    getLeaderboard();
  }, []);

    const UserCard = ({user}) => {
      return (
        <View style={styles1.userCard}>
      <View style={styles1.userCardRow}>
        <Text style={styles1.userCardLabel}>Username:</Text>
        <Text style={styles1.userCardValue}>{user.username}</Text>
      </View>
      <View style={styles1.userCardRow}>
        <Text style={styles1.userCardLabel}>Email:</Text>
        <Text style={styles1.userCardValue}>{user.email}</Text>
      </View>
      <View style={styles1.userCardRow}>
        <Text style={styles1.userCardLabel}>Role:</Text>
        <Text style={styles1.userCardValue}>{user.role}</Text>
      </View>
      <View style={styles1.userCardRow}>
        <Text style={styles1.userCardLabel}>Points:</Text>
        <Text style={styles1.userCardValue}>{user.points}</Text>
      </View>
    </View>
      );
    };
  
  return (
    <View style={styles1.container}>
      <View style={{paddingTop:50, alignItems: 'center'}}>
        <Text style={styles.appTitle}>TRASH.LY</Text>
      </View>
      <ScrollView flex={0.5}>
      {user ? (
      <View style={styles1.container}>
        {user.map((user) => (
          <UserCard key={user.userid} user={user} />
        ))}
      </View>
    ) : (
      <Text>Loading leaderboard...</Text>
    )}
      </ScrollView>

      <NavigationBar navigation={navigation} />
    </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#69c9ab'
  },
  userCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  userCardRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  userCardLabel: {
    flex: 1, // Adjust for label-to-value ratio
    marginRight: 5,
    fontWeight: 'bold',
  },
  userCardValue: {
    fontWeight: 'bold',
  },
});
