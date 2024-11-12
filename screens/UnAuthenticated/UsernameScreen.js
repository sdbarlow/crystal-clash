import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import { useAuth } from '../../app/context/AuthContext';

function UsernameScreen({ route, navigation }) {
const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { userData, temporaryToken } = route.params;

  const handleSubmit = async () => {
    try {
      if (username.length < 3) {
        setError('Username must be at least 3 characters');
        return;
      }

      // Use the complete-signup endpoint with the temporary token
      const response = await axios.post(
        'http://127.0.0.1:5000/complete-signup', 
        { username },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${temporaryToken}`
          }
        }
      );

      if (response.data.token) {
        await login(response.data.token);
        navigation.navigate('Home'); // Or wherever you want to navigate after signup
      }

    } catch (error) {
      console.error('Signup error:', error);
      if (error.response?.data?.error === 'Username already taken') {
        setError('Username already taken');
      } else {
        Alert.alert('Error', 'Failed to create account. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
        <View style={{height: hp(50), width: wp(100), justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text style={styles.title}>Create a Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter username"
                    placeholderTextColor={'#FFFFFF50'}
                    autoFocus={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={15}
                />
                {error ? <Text style={[styles.errorText, {position: 'absolute', bottom: -hp(4)}]}>{error}</Text> : null}
        </View>
        <View style={{height: hp(50), width: wp(100), justifyContent: 'flex-end', alignItems: 'center'}}>  
            <TouchableOpacity style={{backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: hp(5), width: wp(90)}} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

export default UsernameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white'
  },
  input: {
    borderRadius: 8,
    textAlign: 'center',
    fontFamily: 'RussoOne_400Regular',
    marginBottom: 10,
    color: 'white',
    fontSize: 42,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});