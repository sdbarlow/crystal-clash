import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { 
  useFonts,
  RussoOne_400Regular 
} from '@expo-google-fonts/russo-one';
import { useState, useEffect, useContext, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import SignUp from './screens/UnAuthenticated/SignUp';
import LogIn from './screens/UnAuthenticated/LogIn';
import Home from './screens/Authenticated/Home';
import Profile from './screens/Authenticated/Profile';
import Leaderboard from './screens/Authenticated/Leaderboard';
import Search from './screens/Authenticated/Search';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AuthProvider } from './app/context/AuthContext';
import { AuthContext } from './app/context/AuthContext';
import { faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons';
import { faGamepadModern } from '@fortawesome/pro-regular-svg-icons';
import { faRankingStar } from '@fortawesome/pro-regular-svg-icons';
import { faUser } from '@fortawesome/pro-regular-svg-icons';
import TabBarButton from './components/TabBarButton';
import ProfileSettings from './screens/Authenticated/ProfileSettings';
import Lobby from './screens/Authenticated/Lobby';
import Game from './screens/Authenticated/Game';

// Initialize screens here to avoid navigation errors
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AnimatedBottomTabNavigator = Animated.createAnimatedComponent(Tab.Navigator);



// Bottom Tab Navigator
function TabNavigator() {
  const tabBarOpac = useRef(new Animated.Value(1)).current;

  function ProfileStack(){
    return (
      <Stack.Navigator>
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false, unmountOnBlur: true, gestureEnabled: false}}/>
          <Stack.Screen name="ProfileSettings" component={ProfileSettings} options={{headerShown: false, unmountOnBlur: true, gestureEnabled: false}}/>
      </Stack.Navigator>
    )
  }
  
  function HomeScreenWrapper(props) {
    const fadeTabBar = () => {
      return Animated.timing(tabBarOpac, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
    return <Home {...props} fadeTabBar={fadeTabBar} />;
  }
  
  function GameStack(){
    tabBarOpac.setValue(1)
    return (
      <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreenWrapper} options={{animation: 'none', headerShown: false, unmountOnBlur: true, gestureEnabled: false}}/>
          <Stack.Screen name="Lobby" component={Lobby} options={{animation: 'none', headerShown: false, unmountOnBlur: true, gestureEnabled: false}}/>
          <Stack.Screen name="Game" component={Game} options={{animation: 'none', headerShown: false, unmountOnBlur: true, gestureEnabled: false}}/>
      </Stack.Navigator>
    )
  }

  return (
    <AnimatedBottomTabNavigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: 'white',
      tabBarStyle: [(getFocusedRouteNameFromRoute(route) === 'Lobby' || getFocusedRouteNameFromRoute(route) === 'Game') ? { display: 'none' } : [styles.tabBarStyle, {opacity: tabBarOpac}]],
    })}
    >
      <Tab.Screen name="Search" component={Search} options={{
        tabBarButton: props => <TabBarButton specialleft {...props} />,
        tabBarLabel: 'Search',
        tabBarIcon: ({color, size}) => <FontAwesomeIcon icon={faMagnifyingGlass} size={size} color={color}/>}}/>
      <Tab.Screen name="GameStack" component={GameStack} options={{
        tabBarButton: props => <TabBarButton {...props} />,
        tabBarLabel: 'GameStack',
        tabBarIcon: ({color, size}) => <FontAwesomeIcon icon={faGamepadModern} size={size + 4} color={color}/>}}/>
      <Tab.Screen name="LeaderBoard" component={Leaderboard} options={{
        tabBarButton: props => <TabBarButton {...props} />,
        tabBarLabel: 'LeaderBoard',
        tabBarIcon: ({color, size}) => <FontAwesomeIcon icon={faRankingStar} size={size} color={color}/>}}/>
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{
        tabBarButton: props => <TabBarButton specialright {...props} />,
        tabBarLabel: 'ProfileStack',
        tabBarIcon: ({color, size}) => <FontAwesomeIcon icon={faUser} size={size} color={color}/>}}
        />
    </AnimatedBottomTabNavigator>
  );
}

export default function App() {

  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  let [fontsLoaded] = useFonts({
    RussoOne_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
      <SafeAreaProvider>
        <NavigationContainer>
            {isAuthenticated ? (
              // Authenticated Stack
              <TabNavigator/>
            ) : (
              <Stack.Navigator>
                <Stack.Screen 
                  name="Login" 
                  component={LogIn}
                  options={{ headerShown: false }}
                />
                <Stack.Screen 
                  name="Register" 
                  component={SignUp}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            )}
          <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    tabBarStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      borderTopWidth: 0,
      bottom: 5,
      right: 10,
      left: 10,
      height: 92,
      borderRadius: 100,
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});