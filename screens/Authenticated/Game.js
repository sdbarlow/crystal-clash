import React from 'react'
import { View, Animated, Text, Easing, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import VectorLeft from '../../components/VectorLeft';
import VectorRight from '../../components/VectorRight';
import { useFocusEffect } from '@react-navigation/native';

function Game({ navigation }) {

    const translateLeftX = new Animated.Value(0);
    const translateRightX = new Animated.Value(0);
    const letterOpac = new Animated.Value(1);

    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(translateLeftX, {
                      toValue: -500,
                      duration: 300,
                      easing: Easing.out(Easing.ease),
                      useNativeDriver: true
                    }),
                    Animated.timing(translateRightX, {
                      toValue: 500,
                      duration: 300,
                      easing: Easing.out(Easing.ease),
                      useNativeDriver: true
                    }),
                    Animated.timing(letterOpac, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true // This improves animation performance
                    })
                  ]).start()
            }, 1000)
        }, [])
      );

  return (
    <View pointerEvents='auto' style={{height: hp(100), width: wp(100), backgroundColor: 'gray', justifyContent: 'center'}}>
        <Pressable 
            onPress={() => navigation.navigate("Home")} 
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1, 
              zIndex: 30, 
              marginLeft: '3%', 
              marginBottom: '180%',
              height: 40, 
              zIndex: -2,
              width: 40, 
              backgroundColor: '#413F42', 
              borderRadius: 100, 
              justifyContent: 'center', 
              alignItems: 'center'
            })}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={22} color="white"/>
          </Pressable>
        <VectorLeft  translateLeftX={translateLeftX}/>
        <VectorRight  translateRightX={translateRightX}/>
        <Animated.View style={{position: 'absolute', width: wp(36.4), height: hp(17.3), opacity: letterOpac, alignSelf: 'center'}}>
                <Text style={{position: 'absolute', top: -20, left: 5, fontSize: 128, fontFamily: 'RussoOne_400Regular', color: 'white'}}>V</Text>
                <Text style={{position: 'absolute', top: 20, right: 5, fontSize: 128, fontFamily: 'RussoOne_400Regular', color: 'white'}}>s</Text>
        </Animated.View>
    </View>
  )
}

export default Game