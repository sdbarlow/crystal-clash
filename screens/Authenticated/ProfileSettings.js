import React from 'react'
import { View, Text, Pressable, Alert } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../../app/context/AuthContext';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

function ProfileSettings({ navigation }) {
    const { logout } = useAuth();

    const handleDeleteAccount = async () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const token = await SecureStore.getItemAsync('userToken');
                            
                            const response = await axios.delete(
                                'https://crystal-clash-backend.onrender.com/delete-account',
                                {
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                    }
                                }
                            );

                            if (response.status === 200) {
                                await logout();
                                Alert.alert('Success', 'Your account has been deleted.');
                            }
                        } catch (error) {
                            console.error('Error deleting account:', error);
                            Alert.alert(
                                'Error', 
                                'Failed to delete account. Please try again.'
                            );
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    };

    const handleSignOut = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'Failed to sign out. Please try again.');
        }
    };
  return (
    <View style={{height: hp(100), width: wp(100), backgroundColor: 'black'}}>
        <View style={{height: 80, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row'}}>
            <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => ({opacity: pressed ? 0.5 : 1, zIndex: 30, marginLeft: '6%', height: 40, width: 40, backgroundColor: '#413F42', borderRadius: 100, justifyContent: 'center', alignItems: 'center'})}>
              <FontAwesomeIcon icon={faArrowLeft} size={22} color="white"/>
            </Pressable>
            <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '1%'}}>
                <Text style={{color: 'white', fontSize: 25, fontWeight: 500, marginHorizontal: 'auto'}}>Settings</Text>
            </View>
        </View>
        <View style={{height: 50, width: '100%', backgroundColor: '#413F42', marginTop: '15%', borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>Notification Settings</Text>
            <FontAwesomeIcon icon={faChevronRight} size={22} color="white"/>
        </View>
        <View style={{height: 50, width: '100%', backgroundColor: '#413F42', borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>Advanced Settings</Text>
            <FontAwesomeIcon icon={faChevronRight} size={22} color="white"/>
        </View>
        <Pressable onPress={() => handleSignOut()} style={({ pressed }) => ({opacity: pressed ? 0.5 : 1, height: 50, width: '100%', backgroundColor: '#413F42', marginTop: '15%', borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%'})}>
            <Text style={{color: 'red', fontSize: 20, fontWeight: 500}}>Sign Out</Text>
        </Pressable>
        <Pressable onPress={() => handleDeleteAccount()} style={({ pressed }) => ({opacity: pressed ? 0.5 : 1, height: 50, width: '100%', backgroundColor: '#413F42', marginTop: '15%', borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%'})}>
            <Text style={{color: 'red', fontSize: 20, fontWeight: 500}}>Delete Account</Text>
        </Pressable>
    </View>
  )
}

export default ProfileSettings