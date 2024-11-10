import React, { useRef } from 'react'
import { View, Text, Pressable, StatusBar, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlay } from '@fortawesome/pro-solid-svg-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';

function Home({ navigation, fadeTabBar }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(1);
    }, [])
  );
  
  const angle = 20;
  const end = {
    x: Math.cos(angle * Math.PI / 180),
    y: Math.sin(angle * Math.PI / 180)
  };

  const handlePress = () => {
      fadeTabBar();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      navigation.push("Lobby");
    });
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient 
        start={{ x: 0, y: 0 }}
        end={end}
        colors={['black', 'purple', 'black']} 
        style={{height: hp(100), width: wp(175), justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View style={{
          position: 'absolute', 
          height: hp(100), 
          width: wp(100), 
          justifyContent: 'center', 
          alignItems: 'center', 
          borderWidth: 1, 
          left: 0,
          opacity: fadeAnim
        }}>
          <Pressable 
            onPress={handlePress} 
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1, 
              shadowOffset: {width: 0, height: 0}, 
              shadowRadius: pressed ? 30 : 10, 
              shadowOpacity: 1, 
              shadowColor: 'white', 
              transform: [{scale: pressed ? 0.9 : 1}]
            })}
          >
            <FontAwesomeIcon icon={faPlay} size={120} color="white"/>
          </Pressable>
          <View style={{
            height: '6%', 
            width: '100%', 
            justifyContent: 'center', 
            flexDirection: 'row', 
            marginTop: '5%'
          }}>
            <View style={{
              position:'absolute', 
              left: wp(24), 
              height: 15, 
              width: 15, 
              borderRadius: 100, 
              backgroundColor: 'green'
            }}/>
            <View style={{justifyContent: 'center', alignItems: 'center'}}> 
              <Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>
                105 players online
              </Text>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>
    </>
  )
}

export default Home