import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from '../constants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Blog from "../screens/Blog";
import Home from '../screens/Home'
import User from "../screens/User";



const Tab = createBottomTabNavigator();

const Tabs = () =>{
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
            <Tab.Screen name="Blog" component={Blog} />
            <Tab.Screen name="User" component={User} />
        </Tab.Navigator>

    );
}

export default Tabs;