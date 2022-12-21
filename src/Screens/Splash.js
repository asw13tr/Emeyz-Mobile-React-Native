import {Component} from "react";
import {Image, Text, View, StyleSheet} from 'react-native';
import values from '../Datas/Values';

class Splash extends Component{


    render(){
        return (<View style={css.container}>
            <Text style={css.logo}>emeyz</Text>
            <View style={css.copyright}>
                <Text style={css.from}>from</Text>
                <Text style={css.brand}>Atabasch</Text>
            </View>
        </View>)
    }

}

const css = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: values.color.primary,
        justifyContent: 'center'
    },
    logo: {
        fontFamily: values.font.boldItalic,
        fontSize: 50,
        color: 'rgba(255, 255, 255, 1)',
        textShadowColor: 'white',
        textShadowOffset: { width: 0,  height: 0 },
        textShadowRadius: 20,
        width: '100%',
        textAlign: 'center',
        marginTop: -80
    },
    copyright: {
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        bottom: 10,
        alignItems: 'center'
    },
    from: {
        fontFamily: values.font.italic,
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.80)',
        width: '100%',
        textAlign: 'center'
    },
    brand: {
        fontFamily: values.font.boldItalic,
        fontSize: 20,
        color: 'rgba(255, 255, 255, 1)',
        textShadowColor: 'white',
        textShadowOffset: {
            width: 0,
            height: 0
        },
        textShadowRadius: 20,
        width: '100%',
        textAlign: 'center'
    },
})

export default Splash
