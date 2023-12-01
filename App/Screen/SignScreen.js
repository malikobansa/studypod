import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../Utils/Colors';
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

export default function SignScreen() {
    const navigation = useNavigation();
  useWarmUpBrowser();
  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
        {/* Sign-out Button */}
        <TouchableOpacity
          onPress={()=> navigation.navigate("login")}
          style={{
            backgroundColor: Colors.WHITE,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'center',
            padding: 10,
            borderRadius: 99,
            marginTop: 10, // Adjust the margin as needed
          }}
        >
          <Text style={{ fontSize: 20, color: Colors.PRIMARY, fontFamily: 'outfit' }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
  );
}
