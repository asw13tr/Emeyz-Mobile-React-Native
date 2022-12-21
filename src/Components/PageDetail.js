import {Component} from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RenderHTML} from 'react-native-render-html';
import values from "../Datas/Values"

class PageDetail extends Component{


    render(){
        return (
            <ScrollView style={css.container}>
                <View style={css.header}>
                    {   !this.hide_cover=='on'?
                        (<View style={css.cover}>
                            <Image source={{uri:'https://emeyz.com/media/upload/lg_'+this.props.cover}} style={css.image}/>
                        </View>)
                        :
                        (<View style={css.emptyCover}></View>)
                    }
                </View>

                <View style={css.body}>
                    <Text style={css.title}>{this.props.title}</Text>
                    <RenderHTML source={this.props.contentForRenderHtml}
                                contentWidth={Dimensions.get('window').width}
                                allowedStyles={["*"]}
                                baseStyle={css.renderHtml} />
                </View>
            </ScrollView>
        )
    }

}



const css  = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    cover: {
        width: '100%',
        height: 300,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        overflow: 'hidden',
    },
    emptyCover: {
      backgroundColor: values.color.primary,
      padding: 40
    },
    image: {
        flex: 1,
        resizeMode: 'cover'
    },
    body: {
        marginTop: 10,
        paddingHorizontal: 15
    },
    title: {
        fontFamily: values.font.narrowBold,
        fontSize: 30,
        lineHeight: 40,
        color: values.color.textBlack,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.25)',
        borderStyle: 'dashed'

    },
    renderHtml: {
        fontFamily: values.font.normal,
        color: values.color.textGrey,
        fontSize: 14,
        lineHeight: 20
    }
});


export default PageDetail
