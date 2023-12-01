import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screen/HomeScreen';
import CourseDetailScreen from '../Screen/CourseDetailScreen';
import ChapterContentScreen from '../Screen/ChapterContentScreen';
import CourseCompletedScreen from '../Screen/CourseCompletedScreen';
import LoginScreen from '../Screen/LoginScreen';

const Stack=createStackNavigator();
export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='couse-detail' 
        component={CourseDetailScreen} />
        <Stack.Screen name="chapter-content" component={ChapterContentScreen} />
        <Stack.Screen 
        name="course-complete" 
        component={CourseCompletedScreen} />
                <Stack.Screen 
        name="login" 
        component={LoginScreen} />
    
    
    </Stack.Navigator>
  )
}