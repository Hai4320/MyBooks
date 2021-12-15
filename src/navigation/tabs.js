import React,{useState,useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text} from 'react-native'
import { COLORS } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Blog from '../screens/Blog';
import Home from '../screens/Home';
import User from '../screens/User';
import Books from '../screens/Books';
import {isLogged} from '../component/AsyncStorage';
import {getBooks} from '../redux/actions/bookAction';
import { getPosts } from '../redux/actions/postAction';
import {checkLogin} from '../redux/actions/userAction'
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const Tabs = ({navigation}) =>{
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(false);
    useEffect(async () => {
        const log = await isLogged();
        if (!log) {
          navigation.navigate('Start');
        }
        else {
            const result = await dispatch(checkLogin());
            if (result!==200) {
                try {
                    await AsyncStorage.removeItem('isLogin');
                    navigation.replace('Start');   
                }
                catch(exception) {
                    console.error(exception)
                }
            }
            else{
                const result1 = await dispatch(getBooks(setIsLoading));
                const result2 = await dispatch(getPosts(setIsLoading));
            }
            
        }
      },[]);
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({color, size }) => {
              let iconName;
  
              switch (route.name) {
                  case 'Home': iconName='home-outline'; break;
                  case 'Book': iconName='library-outline'; break;
                  case 'Blog': iconName='newspaper-outline'; break
                  case 'User': iconName='person-outline'; break;
                  default: iconName='home-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarLabel: ({focused, color, size, })=>{
                return focused ? <Text style={{fontSize: 12, color: color}}> {route.name}</Text>: null;
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
            <Tab.Screen name="Book" component={Books}/>
            <Tab.Screen name="Blog" component={Blog} />
            <Tab.Screen name="User" component={User} />
        </Tab.Navigator>

    );
};

export default Tabs;