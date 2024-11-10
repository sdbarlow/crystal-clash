import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

function Timer({ onComplete }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds >= 6) {
          clearInterval(timer);
          onComplete(); // Trigger the action when timer reaches 4 seconds
          return 6;
        }
        return prevSeconds + 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  // Format the time as 0:XX
  const formattedTime = `0:${seconds.toString().padStart(2, '0')}`;
  return (
    <View style={{height: '47%', width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
      <Text style={{fontFamily: 'RussoOne_400Regular', color: 'white', fontSize: 70}}>
        {formattedTime}
      </Text>
    </View>
  )
}

export default Timer