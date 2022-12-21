import React, {Component} from "react";
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {goToPostScreenWithParams} from '../Helpers/GlobalActions';
import Values from '../Datas/Values';
import values from '../Datas/Values';
import Icon from "react-native-vector-icons/Ionicons";

class PostListMiniItem2 extends Component{


    render(){
        const {item} = this.props

        return (<Pressable onPress={() => { goToPostScreenWithParams({id: item.id}) }} style={css.post}>
            <ImageBackground style={css.cover} source={{uri:'https://emeyz.com/media/upload/sm_'+item.cover}} resizeMode={"cover"}>
                <View style={css.viewsBox}>
                    <Icon size={32} name={"eye-outline"} style={css.icon} />
                    <Text style={css.info}>{item.views}</Text>
                </View>
            </ImageBackground>
            <View  style={css.content}>
                <Text style={css.title}>{item.title}</Text>
                <Text style={css.description}>{item.description}</Text>
            </View>
        </Pressable>)
    }

}



const css = StyleSheet.create({
    post: {
        marginHorizontal: 15,
        padding:10,
        backgroundColor: '#fffFFF',
        elevation: 3,
        flexDirection:'column',
        overflow: 'hidden',
        borderRadius: 7
    },
    cover: {
        width: '100%',
        height: 120,
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius:7,
        marginBottom:4,
        elevation: 4,
        opacity: 0.8,
        backgroundColor: 'black'
    },
    content: {
        paddingHorizontal: 7,
        paddingBottom:7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1
    },
    title: {
        fontFamily: Values.font.narrowBold,
        color: 'black',
        fontSize: 21,
        lineHeight: 22,
        paddingTop: 8
    },
    description: {
        marginTop: -3,
        fontFamily: values.font.italic,
        fontSize: 14,
        lineHeight: 17,
        color: 'rgba(0,0,0,0.70)'
    },
    viewsBox: {
        backgroundColor: values.color.primary,
        padding: 2,
        paddingRight:15,
        borderTopRightRadius: 10,
        borderBottomRightRadius:10,
        position: 'absolute',
        top:10,
        left:0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize:15,
        lineHeight:19,
        color:'white'
    },
    info: {
        marginLeft:3,
        fontSize: 13,
        lineHeight:19,
        color: 'white',

    },
})


export default PostListMiniItem2
