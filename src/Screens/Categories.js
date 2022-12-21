import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import CategorysPosts from './CategorysPosts';
import CategoriesList from './CategoriesList';

const Stack = createNativeStackNavigator();

class Categories extends React.Component{

    render(){
        return (
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="CategoriesList" component={CategoriesList} />
                <Stack.Screen name="CategorysPosts" component={CategorysPosts} />
            </Stack.Navigator>
        )
    }

}


export default Categories
