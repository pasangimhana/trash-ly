import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({ label }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.welcomeButton} onPress={() => alert('You pressed a button.')}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    //marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 3,
  },
  welcomeButton: {
    borderRadius: 50,
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    
  },
  buttonLabel: {
    color: 'black',
    fontSize: 16,
  },
});
