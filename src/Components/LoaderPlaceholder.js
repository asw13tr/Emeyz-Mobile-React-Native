import {Component} from "react"
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import values from '../Datas/Values';

class LoaderPlaceholder extends Component{

    render(){
        let isFull = (typeof this.props.fullscreen == 'undefined')? true : this.props.fullscreen
        return (<View style={[(isFull && css.fullScreen), (!isFull && css.box)]}>
            <ActivityIndicator size={(isFull? 'large' : 'small')} color={values.color.primary} />
        </View>)
    }

}

const css = StyleSheet.create({
    fullScreen: {
        flex:1,
        justifyContent:'center'
    },

    box: {
        padding: 25,
    }
})

export default LoaderPlaceholder;
