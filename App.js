import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Button,
  Alert,
} from 'react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import { useState } from 'react';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const uri =
  'https://cdn.pixabay.com/photo/2020/03/12/00/20/background-texture-4923570_1280.jpg';
const profilePicture = 'https://randomuser.me/api/portraits/men/75.jpg';

function HomeScreen() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

function LoginScreen() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Account created!');
        const user = userCredential.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Signed in!');
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('Failed to sign in: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
      <View
        contentContainerStyle={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={styles.login}>
          <Image
            source={{ uri: profilePicture }}
            style={styles.profilePicture}
          />
          <View>
            <Text style={{ fontSize: 20, fontWeight: '400' }}>Email</Text>
            <TextInput
              onChangeText={text => setEmail(text)}
              style={styles.input}
              placeholder='john@doe.com'
            />
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: '400' }}>Password</Text>
            <TextInput
              onChangeText={text => setPassword(text)}
              style={styles.input}
              placeholder='password'
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#00CFEB60' }]}
            onPress={handleSignIn}
          >
            <Text style={{ fontSize: 20, fontWeight: '400', color: 'white' }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#6792F090' }]}
            onPress={handleCreateAccount}
          >
            <Text style={{ fontSize: 20, fontWeight: '400', color: 'white' }}>
              Create Acount
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login'>
        <Stack.Screen name='Login' component={LoginScreen}   />
        <Stack.Screen name='Home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    marginVertical: 30,
  },
  input: {
    width: 280,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },
  button: {
    width: 280,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
});
