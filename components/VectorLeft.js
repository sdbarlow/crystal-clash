import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Animated, View, Image, Text } from "react-native";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

function VectorLeft({ translateLeftX }) {
  return (
    <Animated.View style={{position: 'absolute', height: hp(100), width: wp(100), transform: [{ translateX: translateLeftX }], justifyContent: 'flex-end', alignItems: 'flex-start'}}>
        <Svg
        width={430}
        height={hp(102)}
        viewBox="0 0 430 930"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{position: 'absolute', bottom: -10, left: 0}}
        >
        <Path
            d="M385 910.5l44 16.5H1V1l3 72.5 69 16L42.5 164 98 194.5l-27 49 76 16-17 79 89.5 85.5-31.5 70.5 76 26.5-17.5 118 93 40.5-31 89.5 62.5 7.5-32.5 88.5 62 5.5-15.5 40z"
            fill="url(#paint0_linear_1_5)"
            stroke="#000"
            strokeWidth={2}
        />
        <Defs>
            <LinearGradient
            id="paint0_linear_1_5"
            x1={215}
            y1={1}
            x2={215}
            y2={927}
            gradientUnits="userSpaceOnUse"
            >
            <Stop stopColor="#313131" />
            <Stop offset={1} stopColor="#2E3031" />
            </LinearGradient>
        </Defs>
    </Svg>
    <View style={{width: wp(30), height: hp(30), marginBottom: hp(8), marginLeft: wp(15)}}>
        <Image 
            style={{ height: '70%', width: '110%', overflow: 'hidden'}}
            resizeMode="contain"
            source={{uri: 'https://storage.googleapis.com/crystalclash/PurpSaber.png'}}
        />
        <Text style={{color: 'white', fontSize: 20, fontWeight: 500, textAlign: 'center'}}>Seth Barlow</Text>
    </View>
    </Animated.View>
  )
}

export default VectorLeft
