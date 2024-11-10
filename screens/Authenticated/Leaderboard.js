import { FlashList } from '@shopify/flash-list';
import React from 'react'
import { View, Text, Image }from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

function Leaderboard() {
  const users = [{"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "tylersingleton@example.org", "games_played": 965, "id": 6, "losses": 360, "username": "curtismartinez", "wins": 605}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "darryl96@example.com", "games_played": 242, "id": 7, "losses": 180, "username": "morgancourtney", "wins": 62}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "sarajordan@example.org", "games_played": 84, "id": 8, "losses": 33, "username": "allison73", "wins": 51}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "samueldougherty@example.org", "games_played": 498, "id": 9, "losses": 371, "username": "kreed", "wins": 127}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "charlesadams@example.com", "games_played": 290, "id": 10, "losses": 264, "username": "price", "wins": 26}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "james96@example.com", "games_played": 784, "id": 11, "losses": 98, "username": "sanchezmichael", "wins": 686}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "robertsonanthony@example.net", "games_played": 347, "id": 12, "losses": 128, "username": "jparker", "wins": 219}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "fernandezveronica@example.net", "games_played": 365, "id": 13, "losses": 141, "username": "stephanie49", "wins": 224}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "karen67@example.com", "games_played": 215, "id": 14, "losses": 48, "username": "davidlewis", "wins": 167}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "kaylacabrera@example.net", "games_played": 876, "id": 15, "losses": 784, "username": "uoliver", "wins": 92}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "tchandler@example.net", "games_played": 818, "id": 16, "losses": 537, "username": "prattlaura", "wins": 281}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "amarshall@example.org", "games_played": 801, "id": 17, "losses": 780, "username": "wdiaz", "wins": 21}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "burtonjacqueline@example.net", "games_played": 368, "id": 18, "losses": 209, "username": "brendabowman", "wins": 159}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "browndeanna@example.net", "games_played": 525, "id": 19, "losses": 35, "username": "ccontreras", "wins": 490}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "christyalexander@example.org", "games_played": 805, "id": 20, "losses": 439, "username": "nbush", "wins": 366}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "vfarley@example.org", "games_played": 436, "id": 21, "losses": 48, "username": "pamelafreeman", "wins": 388}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "shaunmartin@example.com", "games_played": 197, "id": 22, "losses": 25, "username": "jcollier", "wins": 172}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "matthew23@example.net", "games_played": 863, "id": 23, "losses": 620, "username": "adamscole", "wins": 243}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "courtneysimmons@example.org", "games_played": 749, "id": 24, "losses": 344, "username": "garciacynthia", "wins": 405}]
  const sortedUsers = users.sort((a, b) => b.wins - a.wins);
  return (
    <View style={{height: hp(100), width: wp(100), backgroundColor: 'black'}}>
      <View style={{height: hp(50), width: wp(100), overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end'}}>
        {/* <View style={{height: 80, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row'}}>
            <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '1%'}}>
                <Text style={{color: 'white', fontSize: 25, fontWeight: 500, marginHorizontal: 'auto', zIndex: 30}}>Leaderboard</Text>
            </View>
        </View> */}
     
        <Svg height={hp(70)} width={wp(40)} style={{
            position: 'absolute',
            left: wp(29.7),
            top: -hp(5),
            transform: [{rotate: '180deg'}]
          }}>
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0" stopColor="#FFEB35" />
                <Stop offset="1" stopColor="#E1A10C" />
              </LinearGradient>
            </Defs>
            <Path
              d={`M${wp(20)} 0 L${wp(40)} ${hp(70)} L0 ${hp(70)} Z`}
              fill="url(#grad)"
              opacity={1}
            />
        </Svg>
        <Svg height={hp(70)} width={wp(40)} style={{
            position: 'absolute',
            left: wp(65),
            top: -hp(5),
            transform: [{rotate: '210deg'}]
          }}>
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0" stopColor="#FFEB35" />
                <Stop offset="1" stopColor="#E1A10C" />
              </LinearGradient>
            </Defs>
            <Path
              d={`M${wp(20)} 0 L${wp(40)} ${hp(70)} L0 ${hp(70)} Z`}
              fill="url(#grad)"
              opacity={1}
            />
        </Svg>
        <Svg height={hp(70)} width={wp(40)} style={{
            position: 'absolute',
            right: wp(65),
            top: -hp(5),
            transform: [{rotate: '150deg'}]
          }}>
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0" stopColor="#FFEB35" />
                <Stop offset="1" stopColor="#E1A10C" />
              </LinearGradient>
            </Defs>
            <Path
              d={`M${wp(20)} 0 L${wp(40)} ${hp(70)} L0 ${hp(70)} Z`}
              fill="url(#grad)"
              opacity={1}
            />
        </Svg>
        <View style={{width: '28%', height: '38%', backgroundColor: 'silver', borderRadius: 10, marginBottom: '25%', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, shadowColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{position: 'absolute', top: -40, left: 29, width: 60, height: 60, backgroundColor: '#FFFFFF', borderRadius: 100, justifyContent: 'center', alignItems: 'center', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, shadowColor: 'white'}}>
            <Text style={{fontSize: 20, fontWeight: 700}}>2nd</Text>
          </View>
          <Image
              style={{ height: '80%', width: '100%', overflow: 'hidden'}}
              source={{ uri: 'https://storage.googleapis.com/crystalclash/SecondEmoji.png' }}
              resizeMode="contain"
            />
            <Text style={{fontWeight: 700}}>travissmith</Text>
        </View>
        <View style={{width: '30%', height: '40%', backgroundColor: '#FFA302', borderRadius: 10, marginBottom: '30%', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, shadowColor: 'white', justifyContent: 'center', alignItems: 'center'}} onLayout={(e) => console.log('WIDTH', e.nativeEvent.layout.width)}>
          <View style={{position: 'absolute', top: -45, left: 29, width: 70, height: 70, backgroundColor: 'gold', borderRadius: 100, justifyContent: 'center', alignItems: 'center', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, shadowColor: 'white'}}>
            <Text style={{fontSize: 30, fontWeight: 700}}>1st</Text>
          </View>
          <Image
              style={{ height: '80%', width: '100%', overflow: 'hidden'}}
              source={{ uri: 'https://storage.googleapis.com/crystalclash/KingEmoji.png' }}
              resizeMode="contain"
            />
            <Text style={{fontWeight: 700}}>steven05</Text>
        </View>
        <View style={{width: '26%', height: '36%', backgroundColor: 'brown', borderRadius: 10,  marginBottom: '20%', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, shadowColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{position: 'absolute', top: -35, left: 29, width: 50, height: 50, backgroundColor: '#F6AB3B', borderRadius: 100, justifyContent: 'center', alignItems: 'center', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, shadowColor: 'white'}}>
            <Text style={{fontSize: 17, fontWeight: 700}}>3rd</Text>
          </View>
          <Image
              style={{ height: '80%', width: '90%', overflow: 'hidden'}}
              source={{ uri: 'https://storage.googleapis.com/crystalclash/ThumbsEmoji.png' }}
              resizeMode="contain"
            />
            <Text style={{fontWeight: 700}}>william85</Text>
        </View>
      </View>
      <View style={{height: hp(50), width: wp(100), zIndex: 30}}>
            <FlashList 
              data={sortedUsers}
              renderItem={({ item }) => (
                <View style={{height: 100, width: '100%', flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: 'white', justifyContent: 'center', alignItems: 'center', paddingLeft: '3%'}}>
                  <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 100}}>
                    <Image
                      style={{height: 50, width: 50, borderRadius: 100}}
                      source={{ uri: item.bitmoji_url }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{height: 100, width: '60%', justifyContent: 'center', paddingLeft: '3%'}}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>{item.username}</Text>
                    <Text style={{color: 'gray', fontSize: 15, fontWeight: 500}}>{item.email}</Text>
                  </View>
                  <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>{item.wins}</Text>
                  </View>

                </View>
              )}
              estimatedItemSize={100}
            />
      </View>
    </View>
  )
}

export default Leaderboard