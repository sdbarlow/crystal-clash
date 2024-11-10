import React, { useEffect } from 'react'
import { View, Text, Pressable, StatusBar, Animated, Easing } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlay } from '@fortawesome/pro-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Timer from '../../components/Timer';
import VectorLeft from '../../components/VectorLeft';
import VectorRight from '../../components/VectorRight';
import { useFocusEffect } from '@react-navigation/native';

function Lobby({ navigation }) {
  // Create animated value for opacity
  const fadeAnim = new Animated.Value(0);
  const translateModal = new Animated.Value(900);
  const translateLeftX = new Animated.Value(-500);
  const translateRightX = new Animated.Value(500);
  const letterOpac = new Animated.Value(0);

  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      translateModal.setValue(900)
      translateLeftX.setValue(-500)
      translateRightX.setValue(500)
      letterOpac.setValue(0)
    }, [])
  );

  useEffect(() => {
    // Start the fade-in animation when component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true // This improves animation performance
    }).start();
    Animated.timing(translateModal, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.ease), // Adds smooth easeOut
      useNativeDriver: true
    }).start();
  }, []);

  function closeDoors() {
    Animated.parallel([
      Animated.timing(translateLeftX, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(translateRightX, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      })
    ]).start(() => {
      Animated.timing(letterOpac, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true // This improves animation performance
      }).start(() => {
        navigation.push('Game')
      });
    });
  }

  const angle = 20;
  const end = {
    x: Math.cos(angle * Math.PI / 180),
    y: Math.sin(angle * Math.PI / 180)
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient 
        start={{ x: 0, y: 0 }}
        end={end}
        colors={['black', 'purple', 'black']} 
        style={{height: hp(100), width: wp(175), justifyContent: 'flex-start', alignItems: 'center'}}
      >
        <Animated.View 
          style={{
            height: 100, 
            width: '100%', 
            justifyContent: 'flex-start', 
            alignItems: 'flex-end', 
            flexDirection: 'row',
            opacity: fadeAnim // Add the animated opacity
          }}
        >
          <Pressable 
            onPress={() => navigation.goBack()} 
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1, 
              zIndex: 30, 
              marginLeft: '3%', 
              height: 40, 
              width: 40, 
              backgroundColor: '#413F42', 
              borderRadius: 100, 
              justifyContent: 'center', 
              alignItems: 'center'
            })}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={22} color="white"/>
          </Pressable>
        </Animated.View>
        <View pointerEvents='none' style={{position: 'absolute', height: hp(100), width: wp(100), justifyContent: 'center', alignItems: 'center', left: 0}}>
            <Animated.View style={{height: hp(30), width: wp(90), alignSelf: 'center', justifyContent: 'space-between', backgroundColor: 'purple', borderRadius: 30, shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowColor: 'white', shadowRadius: 20, transform: [{ translateY: translateModal }]}}>
                <Timer  onComplete={() => closeDoors()}/>
                <View style={{height: '47%', width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: '5%'}}>
                    <Text style={{fontFamily: 'RussoOne_400Regular', color: '#B289FA', fontSize: 30, textAlign: 'center'}}>LOOKING FOR OPPONENT</Text>
                </View>
            </Animated.View>
            <VectorLeft translateLeftX={translateLeftX}/>
            <VectorRight translateRightX={translateRightX}/>
            <Animated.View style={{position: 'absolute', width: wp(36.4), height: hp(17.3), opacity: letterOpac}}>
                <Text style={{position: 'absolute', top: -20, left: 5, fontSize: 128, fontFamily: 'RussoOne_400Regular', color: 'white'}}>V</Text>
                <Text style={{position: 'absolute', top: 20, right: 5, fontSize: 128, fontFamily: 'RussoOne_400Regular', color: 'white'}}>s</Text>
            </Animated.View>
        </View>
      </LinearGradient>
    </>
  )
}

export default Lobby