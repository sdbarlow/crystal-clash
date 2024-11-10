import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Animated, View, Image, Text } from "react-native";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

function VectorRight({ translateRightX }) {
  return (
    <Animated.View style={{position: 'absolute', width: wp(100), height: hp(100), transform: [{ translateX: translateRightX }], justifyContent: 'flex-start', alignItems: 'flex-end'}}>
        <Svg
        width={431}
        height={hp(100)}
        viewBox="0 0 431 929"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{position: 'absolute', top: -2, right: 0}}
        >
        <Path
            d="M73.847 89.38L5.225 73.49 2 1h428v926l-43.976-16.385 15.464-40.218-61.855-5.461 32.377-88.38-62.339-7.448 30.928-89.869-92.783-40.218 16.913-118.17-75.87-26.315 31.412-70.505-89.401-85.897 16.913-78.946-75.87-15.392 27.062-49.652-55.573-30.287L73.847 89.38z"
            fill="url(#paint0_linear_1_4)"
            stroke="#000"
            strokeWidth={2}
        />
        <Defs>
            <LinearGradient
            id="paint0_linear_1_4"
            x1={216}
            y1={1}
            x2={216}
            y2={927}
            gradientUnits="userSpaceOnUse"
            >
            <Stop stopColor="#282929" />
            <Stop offset={1} />
            </LinearGradient>
        </Defs>
        </Svg>
        <View style={{width: wp(30), height: hp(30), marginTop: hp(8), marginRight: wp(15)}}>
            <Image 
                style={{ height: '70%', width: '110%', overflow: 'hidden'}}
                resizeMode="contain"
                source={{uri: 'https://storage.googleapis.com/crystalclash/GreenSaber.png'}}
            />
            <Text style={{color: 'white', fontSize: 20, fontWeight: 500, textAlign: 'center'}}>John Smith</Text>
        </View>
    </Animated.View>
  )
}

export default VectorRight
