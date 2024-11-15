import { FlashList } from '@shopify/flash-list';
import React from 'react'
import { View, Text, Image, Pressable }from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown'
import PodiumRect from '../../components/ui/PodiumRect';

const data = [
  { label: 'Matches Won', value: 'words_learned' },
  { label: 'Words Scanned', value: 'words_scanned' },
  { label: 'Quizzes Completed', value: 'quizzes_taken' },
  { label: 'Words Pronounced', value: 'words_pronounced' },
  { label: 'Words Spelled', value: 'words_spelled' },
  { label: 'Sentences Created', value: 'sentences_created' },
];

console.log("EHIGHT IS", hp(50) * 0.38)

function Leaderboard() {
  const users = [{"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "tylersingleton@example.org", "games_played": 965, "id": 6, "losses": 360, "username": "curtismartinez", "wins": 605}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "darryl96@example.com", "games_played": 242, "id": 7, "losses": 180, "username": "morgancourtney", "wins": 62}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "sarajordan@example.org", "games_played": 84, "id": 8, "losses": 33, "username": "allison73", "wins": 51}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "samueldougherty@example.org", "games_played": 498, "id": 9, "losses": 371, "username": "kreed", "wins": 127}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "charlesadams@example.com", "games_played": 290, "id": 10, "losses": 264, "username": "price", "wins": 26}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "james96@example.com", "games_played": 784, "id": 11, "losses": 98, "username": "sanchezmichael", "wins": 686}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "robertsonanthony@example.net", "games_played": 347, "id": 12, "losses": 128, "username": "jparker", "wins": 219}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "fernandezveronica@example.net", "games_played": 365, "id": 13, "losses": 141, "username": "stephanie49", "wins": 224}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "karen67@example.com", "games_played": 215, "id": 14, "losses": 48, "username": "davidlewis", "wins": 167}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "kaylacabrera@example.net", "games_played": 876, "id": 15, "losses": 784, "username": "uoliver", "wins": 92}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "tchandler@example.net", "games_played": 818, "id": 16, "losses": 537, "username": "prattlaura", "wins": 281}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "amarshall@example.org", "games_played": 801, "id": 17, "losses": 780, "username": "wdiaz", "wins": 21}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "burtonjacqueline@example.net", "games_played": 368, "id": 18, "losses": 209, "username": "brendabowman", "wins": 159}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "browndeanna@example.net", "games_played": 525, "id": 19, "losses": 35, "username": "ccontreras", "wins": 490}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "christyalexander@example.org", "games_played": 805, "id": 20, "losses": 439, "username": "nbush", "wins": 366}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "vfarley@example.org", "games_played": 436, "id": 21, "losses": 48, "username": "pamelafreeman", "wins": 388}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "shaunmartin@example.com", "games_played": 197, "id": 22, "losses": 25, "username": "jcollier", "wins": 172}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "matthew23@example.net", "games_played": 863, "id": 23, "losses": 620, "username": "adamscole", "wins": 243}, {"bitmoji_url": "https://storage.googleapis.com/crystalclash/BitmojiAvatar.png", "email": "courtneysimmons@example.org", "games_played": 749, "id": 24, "losses": 344, "username": "garciacynthia", "wins": 405}]
  const sortedUsers = users.sort((a, b) => b.wins - a.wins);
  return (
    <View style={{height: hp(100), width: wp(100), backgroundColor: 'black'}}>
      <ExpoLinearGradient colors={['#F5CA49', '#F1AC41']} style={{height: hp(50), width: wp(100), overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', backgroundColor: 'red'}}>

        <View style={{width: wp(50), height: hp(5), backgroundColor: 'white', position: 'absolute', zIndex: 30, top: hp(6.25), borderRadius: 7, marginHorizontal: 'auto', alignSelf: 'center', left: wp(25), transform: [{skewX: '-25deg'}], justifyContent: 'center', alignItems: 'center', paddingHorizontal: '3%'}}>
          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{fontFamily: 'RussoOne_400Regular', fontSize: 40, letterSpacing: 2, color: '#E7A84E'}}>LEADERBOARD</Text>
        </View>
     
        <Svg height={hp(70)} width={wp(40)} style={{
            position: 'absolute',
            left: wp(29.7),
            top: -hp(5),
            transform: [{rotate: '180deg'}]
          }}>
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0" stopColor="#E19F4A" />
                <Stop offset="1" stopColor="#E5A14B" />
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
                <Stop offset="0" stopColor="#E19F4A" />
                <Stop offset="1" stopColor="#E5A14B" />
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
                <Stop offset="0" stopColor="#E19F4A" />
                <Stop offset="1" stopColor="#E5A14B" />
              </LinearGradient>
            </Defs>
            <Path
              d={`M${wp(20)} 0 L${wp(40)} ${hp(70)} L0 ${hp(70)} Z`}
              fill="url(#grad)"
              opacity={1}
            />
        </Svg>
        <Pressable style={({ pressed }) => ({opacity: pressed ? 0.5 : 1, width: '28%', height: '38%', marginBottom: '27%', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, shadowColor: 'white'})}>
          <View style={{width: '100%', height: '100%', backgroundColor: '#F0DDC1', borderRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderBottomWidth: 0, borderColor: 'white', zIndex: 1}}>
            <View style={{position: 'absolute', top: -40, left: '25%', width: '50%', height: (wp(100) * 0.28) * 0.50, backgroundColor: '#FFFFFF', borderRadius: 100, justifyContent: 'center', alignItems: 'center', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, shadowColor: 'white'}}>
              <Text style={{fontSize: 20, fontWeight: 700}}>2nd</Text>
            </View>
            <Image
                style={{ height: '80%', width: '100%', overflow: 'hidden'}}
                source={{ uri: 'https://storage.googleapis.com/crystalclash/SecondEmoji.png' }}
                resizeMode="contain"
              />
              <Text style={{fontWeight: 700}}>travissmith</Text>
          </View>
          <PodiumRect color={'#F0DDC1'} borderColor={'#FFFFFF'}/>
        </Pressable>
        <Pressable style={({ pressed }) => ({opacity: pressed ? 0.5 : 1, width: '28%', height: '38%', marginBottom: '29%', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, shadowColor: 'white'})}>
          <View style={{width: '100%', height: '100%', backgroundColor: '#EBB75D', borderRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderBottomWidth: 0, borderColor: '#F9E484', zIndex: 1}}>
            <View style={{position: 'absolute', top: -45, left: '22.5%', width: '55%', height: (wp(100) * 0.28) * 0.55, backgroundColor: 'gold', borderRadius: 100, justifyContent: 'center', alignItems: 'center', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, shadowColor: 'white'}}>
              <Text style={{fontSize: 30, fontWeight: 700}}>1st</Text>
            </View>
            <Image
                style={{ height: '80%', width: '100%', overflow: 'hidden'}}
                source={{ uri: 'https://storage.googleapis.com/crystalclash/KingEmoji.png' }}
                resizeMode="contain"
              />
              <Text style={{fontWeight: 700}}>steven05</Text>
          </View>
          <PodiumRect color={"#EBB75D"} borderColor={'#F9E484'}/>
        </Pressable>
        <Pressable style={({ pressed }) => ({opacity: pressed ? 0.5 : 1, width: '28%', height: '38%', marginBottom: '25%', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, shadowColor: 'white'})}>
          <View style={{width: '100%', height: '100%', backgroundColor: '#DB8434', borderRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, marginBottom: '25%', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderBottomWidth: 0, borderColor: '#E9C486', zIndex: 1}}>
            <View style={{position: 'absolute', top: -35, left: '30%', width: '40%', height: (wp(100) * 0.28) * 0.40, backgroundColor: '#F6AB3B', borderRadius: 100, justifyContent: 'center', alignItems: 'center', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, shadowColor: 'white'}}>
              <Text style={{fontSize: 17, fontWeight: 700}}>3rd</Text>
            </View>
            <Image
                style={{ height: '80%', width: '90%', overflow: 'hidden'}}
                source={{ uri: 'https://storage.googleapis.com/crystalclash/ThumbsEmoji.png' }}
                resizeMode="contain"
              />
              <Text style={{fontWeight: 700}}>william85</Text>
          </View>
          <PodiumRect color={'#DB8434'} borderColor={'#E9C486'}/>
        </Pressable>
        <View style={{height: hp(6), width: wp(100), backgroundColor: 'black', position: 'absolute', left: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
            <Dropdown 
                data={data} 
                style={{width: '65%', height: '65%', backgroundColor: 'white', borderRadius: 10}}
                selectedTextStyle={[{color: 'black'}]}
                containerStyle={{backgroundColor: 'white'}}
                activeColor={'#1D1D1E'}
                itemTextStyle={{color: 'black'}}
                placeholderStyle={{color: 'black', fontWeight: 600, paddingLeft: '3%'}}
                placeholder={'Matches Won'}
                labelField="label"
                valueField="value"
                // value={attribute}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                // onChange={item => {
                //   setLoading(true)
                //     setAttribute(prev => {
                //         const newAttr = item.value
                //         if (user.friends_count === 0 && userScope === 'Friends') {
                //           setUserData([])
                //           setLoading(false)
                //         } else {
                //           debouncedSearchLeaderboard(newAttr, userScope, duration, 0, true)
                //         }
                //         return newAttr
                //     });
                //     setIsFocus(false);
                // }}
            />
            <Pressable style={({ pressed }) => ({height: '65%', opacity: pressed ? 0.5 : 1, width: '20%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center'})}>
              <Text style={{color: 'black', fontSize: 20, fontWeight: 700, textAlign: 'center'}}>Find Me</Text>
            </Pressable>
        </View>
      </ExpoLinearGradient>
      <View style={{height: hp(50), width: wp(100), zIndex: 30}}>
            <FlashList 
              data={sortedUsers}
              renderItem={({ item, index }) => (
                <Pressable style={({ pressed }) => ({height: 100, width: '100%', opacity: pressed ? 0.5 : 1, flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: 'white', justifyContent: 'center', alignItems: 'center', paddingLeft: '3%'})}>
                  <Text style={{color: 'white', fontSize: 22, paddingRight: '3%'}}>{index + 4}.</Text>
                  <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 100}}>
                    <Image
                      style={{height: 50, width: 50, borderRadius: 100}}
                      source={{ uri: item.bitmoji_url }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{height: 100, width: '60%', justifyContent: 'center', paddingLeft: '3%'}}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 700}}>{item.username}</Text>
                  </View>
                  <View style={{width: '20%', height: '100%', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: '5%'}}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>{item.wins}</Text>
                    <Text style={{color: 'white'}}>wins</Text>
                  </View>

                </Pressable>
              )}
              estimatedItemSize={100}
            />
      </View>
    </View>
  )
}

export default Leaderboard