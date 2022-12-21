import React from "react";
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {navigationRef} from "../Helpers/NavigationRef"
import values from "../Datas/Values"


const colorPalette = [
    'rgba(245,2,96, 0.25)',
    'rgba(255,113,0, 0.25)',
    'rgba(60,133,248, 0.25)',
    'rgba(124,241,45, 0.25)',
    'rgba(221,229,0, 0.25)',
    'rgba(239, 71, 111, 0.25)',
    'rgba(255, 209, 102, 0.25)',
    'rgba(6, 214, 160, 0.25)',
    'rgba(17, 138, 178, 0.25)',
    'rgba(7, 59, 76, 0.25)',
    'rgba(255, 89, 94, 0.25)',
    'rgba(255, 202, 58, 0.25)',
    'rgba(138, 201, 38, 0.25)',
    'rgba(25, 130, 196, 0.25)',
    'rgba(106, 76, 147, 0.25)',
]

class PostItemTags extends React.Component{

    constructor(props) {
        super(props);
         this.onClickedItem = this.onClickedItem.bind(this);
    }

    onClickedItem(id){
        navigationRef.navigate('Categories', {
            screen: 'CategorysPosts',
            params: {id:id}
        })
    }


    render(){
        let items = (typeof this.props.items=='object')? this.props.items : JSON.parse(this.props.items)
        let onClickedItem = this.onClickedItem;

        if(items.length < 1) {
            return (null)
        }else{
           return (<View style={css.tags}>
               {items.map(function(item){
                   return (<Pressable onPress={() => { onClickedItem(item.id) } } key={item.id} style={[css.tag, {backgroundColor: colorPalette[Math.floor(Math.random()*colorPalette.length)]}]}>
                       <Text style={css.tagText}>{item.title}</Text>
                   </Pressable>)
               })}
           </View>)
        }
    }

}


const css = StyleSheet.create({
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tag: {
        marginRight: 5,
        marginBottom: 5,
        paddingHorizontal: 10,
        paddingTop:2,
        borderRadius: 5
    },
    tagText: {
        fontSize: 15,
        lineHeight: 23,
        color: 'rgba(0, 0, 0, 0.75)',
        fontFamily: values.font.narrowBold,
        letterSpacing: 0.15
    }
});


export default PostItemTags
