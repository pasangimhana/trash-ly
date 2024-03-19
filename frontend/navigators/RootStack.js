import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Welcome from './../screens/Welcome';
import Login from './../screens/Login';
import SignUp from './../screens/SignUp';
import Heatmap from './../screens/Heatmap';
import ImageScreen from './../screens/Image';
import Leaderboard from './../screens/Leaderboard';
import ViewEvent from './../screens/ViewEvent';
import OrganiseEvent from './../screens/OrganiseEvent';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#69c9ab',
          },
          headerTransparent: 'false',
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="Heatmap"
          component={Heatmap}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Image"
          component={ImageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewEvent"
          component={ViewEvent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrganiseEvent"
          component={OrganiseEvent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
