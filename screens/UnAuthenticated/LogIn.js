import React from 'react'
import { View, Text, StatusBar, Pressable, Image, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faSnapchat } from '@fortawesome/free-brands-svg-icons';
import { faMobileNotch } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppleAuth from '../../components/AppleAuth';
import SnapAuth from '../../components/SnapAuth';

function LogIn() {
    const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
    {isLoading && <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>Loading...</Text>
    </View>}
    <StatusBar barStyle="light-content" />
      <View style={{height: '100%', width: '100%', backgroundColor: 'black'}}>
        <Image
            style={{ height: '200%', width: '200%', position: 'absolute', top: -120, left: -20, zIndex: -1}}
            source={{ uri: 'https://storage.googleapis.com/crystalclash/GradientBlob' }}
            resizeMode="stretch"
            />
        <View style={{height: hp(65), width: '100%', justifyContent: 'flex-end', alignItems: 'flex-start'}}>
            <View style={{position: 'absolute', top: hp(11), right: wp(13), shadowOffset: {width: 0, height: 0}, shadowColor: '#5DC928', shadowRadius: 30, shadowOpacity: 1}}>
                <Image style={{width: 151.35, height: 182.5}} source={{ uri: 'https://storage.googleapis.com/crystalclash/TopRightGreen.png' }}
                resizeMode="fit" />
            </View>
            <View style={{position: 'absolute', top: hp(11), right: wp(13), shadowOffset: {width: 0, height: 0}, shadowColor: '#5DC928', shadowRadius: 50, shadowOpacity: 1}}>
                <Image style={{width: 151.35, height: 182.5}} source={{ uri: 'https://storage.googleapis.com/crystalclash/TopRightGreen.png' }}
                resizeMode="fit" />
            </View>
            <View style={{position: 'absolute', top: hp(11), left: wp(13), shadowOffset: {width: 0, height: 0}, shadowColor: '#F9589A', shadowRadius: 30, shadowOpacity: 1}}>
                <Image style={{width: 151.35, height: 182.5}} source={{ uri: 'https://storage.googleapis.com/crystalclash/RedTopLeft.png' }}
                resizeMode="fit" />
            </View>
            <View style={{position: 'absolute', top: hp(11), left: wp(13), shadowOffset: {width: 0, height: 0}, shadowColor: '#F9589A', shadowRadius: 50, shadowOpacity: 1}}>
                <Image style={{width: 151.35, height: 182.5}} source={{ uri: 'https://storage.googleapis.com/crystalclash/RedTopLeft.png' }}
                resizeMode="fit" />
            </View>
            <View style={{position: 'absolute', top: hp(26), left: wp(32.2), shadowOffset: {width: 0, height: 0}, shadowColor: '#09A6CC', shadowRadius: 30, shadowOpacity: 1}}>
                <Image style={{width: 151.35, height: 182.5}} source={{ uri: 'https://storage.googleapis.com/crystalclash/BlueBottomCenter.png' }}
                resizeMode="fit" />
            </View>
            <View style={{position: 'absolute', top: hp(26), left: wp(32.2), shadowOffset: {width: 0, height: 0}, shadowColor: '#09A6CC', shadowRadius: 50, shadowOpacity: 1}}>
                <Image style={{width: 151.35, height: 182.5}} source={{ uri: 'https://storage.googleapis.com/crystalclash/BlueBottomCenter.png' }}
                resizeMode="fit" />
            </View>
            <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontFamily: 'RussoOne_400Regular', fontSize: 80, transform: [{skewX: '-25deg'}], backgroundColor: 'black', paddingHorizontal: '5%'}}>Crystal</Text>
            </View>
            <View style={{flex: 1, width: '100%', borderColor: 'green', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text style={{color: 'white', fontFamily: 'RussoOne_400Regular', fontSize: 60, transform: [{skewX: '-25deg'}], backgroundColor: 'black', paddingHorizontal: '5%'}}>Clash</Text>
            </View>

                <View style={{width: wp(40), height: hp(20)}}>
                    <Image style={{width: '100%', height: '100%'}} source={{ uri: 'https://storage.googleapis.com/crystalclash/HomeBitmoji.png' }}
                    resizeMode="fit" />
                </View>
        </View>
        <View style={{height: hp(35), width: '100%', backgroundColor: 'white', borderTopRightRadius: 20}}>
            <SnapAuth/>
            <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, height: hp(7), width: wp(80), backgroundColor: 'black', borderRadius: 5, justifyContent: 'center', overflow: 'hidden', alignItems: 'center', alignSelf: 'center', marginTop: hp(3)})}>
                <LinearGradient colors={['#740EFF', '#350DFF']} style={{width: '100%', height: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '15%'}}>
                    <FontAwesomeIcon icon={faMobileNotch} size={30} color='white' /><Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>Continue with Phone</Text>
                </LinearGradient>
            </Pressable>
            <AppleAuth setIsLoading={setIsLoading}/>
        </View>
    </View>
    </>
  )
}

export default LogIn