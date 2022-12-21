import React from "react";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
// import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {navigationRef} from "../Helpers/NavigationRef";
import Icon from "react-native-vector-icons/Ionicons"
import values from '../Datas/Values';

import {connect} from "react-redux"
import {setPost, setPostListActive} from '../Store/Reducers/Post';
import {setMenu} from '../Store/Reducers/Menu';


import MainScreen       from "./Main"
import CategoriesScreen from "./Categories"
import SearchScreen     from "./Search"
import RandomScreen     from "./Random"
import MenuScreen       from "./Menu"
import FlashMessage from 'react-native-flash-message';
import Values from '../Datas/Values';
import ApiManager from '../Helpers/ApiManager';




const Tab = createBottomTabNavigator();

class Screens extends React.Component{

    constructor(props) {
        super(props);
        this.screenOptions = this.screenOptions.bind(this)
        ApiManager.get('/navigation/mobile-hizli-erisim,mobile-menu').then(response => {
            if(response.status===200){
                this.props.setMenu(response.data)
            }
        })
    }

    screenOptions({route}){
        return {
            headerShown: false,
            tabBarIcon: function({ focused, color, size }){
                switch(route.name){
                    case "Main":        return (<Icon name="home" size={size} color={color} />)
                    case "Search":      return (<Icon name="search" size={size} color={color} />)
                    case "Random":      return (<Icon name="shuffle" size={size} color={color} />)
                    case "Categories":  return (<Icon name="grid" size={size} color={color} />)
                    case "Menu":        return (<Icon name="menu" size={size} color={color} />)
                }
            },
            tabBarActiveTintColor: values.color.primary,
            tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.60)',
            tabBarActiveBackgroundColor: false,
            tabBarItemStyle: {
                paddingBottom: 3,
                paddingVertical:3

            },
            tabBarIconStyle: {
                padding:0,
                margin:0
            },
            tabBarLabelStyle: {
                padding:0, margin:0, fontFamily: values.font.medium, letterSpacing: 0.1,
                fontSize: 12
            },
            tabBarStyle: {
                backgroundColor: 'white',
                borderTopWidth: 1,
                borderTopColor: '#BFBFBF'
            },
            tabBarHideOnKeyboard:true
        }
    }

    themeOptions = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background:'#FCFCFC'
        }
    }

    render(){

        return (
            <NavigationContainer theme={this.themeOptions} ref={navigationRef}>
                <Tab.Navigator screenOptions={this.screenOptions} initialRouteName={"Main"}>
                    <Tab.Group>
                        <Tab.Screen name="Main" component={MainScreen} options={{tabBarLabel:'Anasayfa'}}
                                    listeners={({navigation, route})=>({
                                        tabPress: e => {
                                            navigation.navigate('Home');
                                            e.preventDefault();
                                        },
                                    })}
                        />
                    </Tab.Group>

                    <Tab.Screen name="Search" component={SearchScreen} options={{tabBarLabel:'Arama'}} />
                    <Tab.Screen name="Random" component={RandomScreen} options={{tabBarLabel:'Rastgele'}} />

                    <Tab.Screen name="Categories" component={CategoriesScreen} options={{tabBarLabel:'Kategoriler'}}
                        listeners={ ({navigation, route}) => ({
                            tabPress: (e) => {
                                navigation.navigate('Categories', { screen: 'CategoriesList' });
                                e.preventDefault()
                            }
                        }) }
                    />

                    <Tab.Screen name="Menu" component={MenuScreen} options={{tabBarLabel:'Menü'}} />
                </Tab.Navigator>
                <FlashMessage position={"bottom"} />
            </NavigationContainer>
        )
    }

}

export default connect(null, {setPost, setPostListActive, setMenu})(Screens);
