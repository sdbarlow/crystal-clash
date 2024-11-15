import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/pro-regular-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import React from 'react'
import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function Profile({ navigation }) {
  return (
    <View style={{height: hp(100), width: wp(100), backgroundColor: 'black', paddingHorizontal: '3%'}}>
      <ScrollView
        style={{backgroundColor: 'transparent', zIndexStyle: 20, zIndex: 20}}
      >
        <View style={{height: hp(30), width: '100%', justifyContent: 'space-between'}}>
          <View style={{height: 80, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: '6%'}}>
            <Pressable onPress={() => navigation.push('ProfileSettings')} style={({ pressed }) => ({opacity: pressed ? 0.5 : 1, height: 40, width: 40, backgroundColor: '#413F42', borderRadius: 100, justifyContent: 'center', alignItems: 'center'})}>
              <FontAwesomeIcon icon={faGear} size={22} color="white"/>
            </Pressable>
          </View>
          <View style={{width: wp(30), height: wp(30), justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'black'}}>
            <View style={{width: '100%', height: '100%', borderRadius: 100, borderColor: 'white', borderWidth: 2, justifyContent: 'flex-end', alignItems: 'center', overflow: 'hidden', backgroundColor: 'black'}}>
              <Image
                style={{ height: '90%', width: '90%', overflow: 'hidden'}}
                source={{ uri: 'https://storage.googleapis.com/crystalclash/BitmojiAvatar.png' }}
                resizeMode="contain"
              />
            </View>
              <View style={{width: 50, height: 50, position: 'absolute', right: -10, bottom: -10}}>
                <Image
                     style={{ height: '100%', width: '100%', overflow: 'hidden'}}
                     source={{ uri: `https://storage.googleapis.com/verba_assets/Rank23x` }}
                     resizeMode="contain"
                   />
              </View>
          </View>
        </View>
        <View style={{height: hp(160), width: '100%'}}>
          <View style={{height: '5%', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: '60%'}}>
              <Text style={{color: 'white', fontSize: 30, fontWeight: 700}}>Seth Barlow</Text>
            </View>
            <View style={{width: '40%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
              <Pressable style={({ pressed }) => ({opacity: pressed ? 0.5 : 1, paddingRight: '6%'})}>
                <FontAwesomeIcon icon={faInstagram} size={30} color="white"/>
              </Pressable>
              <Pressable style={({ pressed }) => ({opacity: pressed ? 0.5 : 1, paddingRight: '6%'})}>
                <FontAwesomeIcon icon={faTiktok} size={30} color="white"/>
              </Pressable>
            </View>
          </View>
          <View style={{height: '5%', width: '100%', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{height: '90%', width: '30%', backgroundColor: '#413F42', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 600, marginBottom: '5%'}}>36</Text>
                <Text style={{color: 'white', fontSize: 17, fontWeight: 600}}>Friends</Text>
            </View>
            <View style={{height: '90%', width: '30%', backgroundColor: '#413F42', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 600, marginBottom: '5%'}}>13</Text>
                <Text style={{color: 'white', fontSize: 17, fontWeight: 600}}>Wins</Text>
            </View>
            <View style={{height: '90%', width: '30%', backgroundColor: '#413F42', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 14, fontWeight: 600, marginBottom: '5%'}}>Nov 9th 2024</Text>
                <Text style={{color: 'white', fontSize: 17, fontWeight: 600}}>Joined</Text>
            </View>
          </View>
          <View style={{height: '5%', width: '100%', justifyContent: 'center'}}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 600}}>Just a simple person living life day by day. Coffee addict ☕️. Dog lover 🐕. Foodie 🍕. Living my best life ✨.</Text>
          </View>
          <View style={{height: '3%', width: '100%', justifyContent: 'center'}}>
            <Text style={{color: 'white', fontSize: 28, fontWeight: 700}}>Badges:</Text>
          </View>
          <View style={{height: '10%', width: '100%', justifyContent: 'center'}}>
            <ScrollView
                  horizontal={true}
                  decelerationRate="fast"
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={1}
                  centerContent={true}
                  contentContainerStyle={{alignItems: 'center',borderColor: 'white'}}
                >
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <View style={{height: '80%', width: wp(40)}} key={index}>
                     <Image
                     style={{ height: '50%', width: '50%', overflow: 'hidden'}}
                     source={{ uri: `https://storage.googleapis.com/verba_assets/Rank${item}3x` }}
                     resizeMode="contain"
                   />
                   </View>
                  ))}
                </ScrollView>
          </View>
          <View style={{height: '3%', width: '100%', justifyContent: 'center'}}>
            <Text style={{color: 'white', fontSize: 28, fontWeight: 700}}>Cards:</Text>
          </View>
          <View style={{height: '60%', width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
              return (
                <View style={{width: '40%', height: hp(25)}} key={index}>
                    <Image 
                      style={{ height: '100%', width: '100%', overflow: 'hidden'}}
                      source={{ uri: `https://storage.googleapis.com/crystalclash/Card${item}.png` }}
                      resizeMode="contain"
                    />
                </View>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile