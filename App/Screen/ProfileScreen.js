import { View, Text, FlatList, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetAllUsers } from '../Services'
import Colors from '../Utils/Colors';
import SignScreen from './SignScreen';

export default function ProfileScreen() {
  
  const [userList,setUserList]=useState([]);

  useEffect(()=>{
    GetAllUserDetails();
  },[])

  const GetAllUserDetails=()=>{

    GetAllUsers().then(resp=>{
      console.log(resp); 
      resp&&setUserList(resp?.userDetails)
    })
  }

  return (
    <View>
      <View style={{height:160,backgroundColor:Colors.PRIMARY,
      padding:30,}}>
      <Text style={{fontFamily:'outfit-bold',
    color:Colors.WHITE,
    fontSize:30}}>My Profile</Text>
      </View>

      <View style={{marginTop:-40,height: "85%"}}>
        <FlatList
          data={userList}       
          renderItem={({item,index})=>(
           <SignScreen/>
          )}
        />
      </View>
    </View>
  )
}