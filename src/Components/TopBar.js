import React, {Component} from "react"
import {StyleSheet, Text, View} from 'react-native';
import values from '../Datas/Values';

class TopBar extends Component{

    render(){
        return (<View style={css.header}>
            <Text style={css.title}>{this.props.title || ''}</Text>
        </View>)
    }

}

const css = StyleSheet.create({
    header: {
        backgroundColor: values.color.primary,
        borderBottomColor: values.color.primaryDark,
        borderBottomWidth: 3,
        paddingHorizontal: 15,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        lineHeight: 30,
        paddingTop: 12,
        fontFamily: values.font.narrowBold,
        color: values.color.background,
        letterSpacing: 0.15,
        textAlign: 'center',
    },
})
export default TopBar
