import {Component} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import HomeScreen from "./Home"
import PostScreen from "./Post"
import PageScreen from "./Page"
import FavoritesScreen from "./Favorites"

const Stack = createNativeStackNavigator();

class Main extends Component{

    screenOptions({route}){
        return {
            headerShown: false
        }
    }

    render(){
        return (
            <Stack.Navigator screenOptions={this.screenOptions}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Post" component={PostScreen} />
                <Stack.Screen name="Page" component={PageScreen} />
                <Stack.Screen name="Favorites" component={FavoritesScreen} />
            </Stack.Navigator>
        )
    }

}

export default Main;
