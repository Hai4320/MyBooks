import React,{useState,useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Blog from '../screens/Blog';
import Home from '../screens/Home';
import User from '../screens/User';
import Books from '../screens/Books';
import BookPDF from '../screens/BookPDF';
import {isLogged} from '../component/AsyncStorage';
import {getBooks} from '../redux/actions/bookAction';
import { useSelector, useDispatch } from 'react-redux';

const Tab = createBottomTabNavigator();

const Tabs = (navigation) =>{
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(false);
    useEffect(async () => {
        const log = await isLogged();
        if (!log) {
          navigation.navigate('Start');
        }
        else {
            const result = await dispatch(getBooks(setIsLoading));
        }
      },[]);
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              switch (route.name) {
                  case 'Home': iconName='home-outline'; break;
                  case 'Blog': iconName='library-outline'; break;
                  case 'User': iconName='person-outline'; break;
                  default: iconName='home-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: COLORS.main,
            tabBarInactiveTintColor: COLORS.gray,
            headerShown: false,
        })}
        >
            <Tab.Screen 
                name="Home" 
                component={Home}
            />
            <Tab.Screen name="Blog" component={Books} />
            <Tab.Screen name="User" component={BookPDF} />
        </Tab.Navigator>

    );
};

export default Tabs;