import React from "react";
import {Text, View, Image, StyleSheet, FlatList, Pressable, ImageBackground} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import ApiManager from '../Helpers/ApiManager';
import TopBar from '../Components/TopBar';
import values from '../Datas/Values';

class CategoriesList extends React.Component{

    state = {
        categories: []
    }

    componentDidMount() {
        ApiManager.get('/category').then(response => {
            this.setState({categories: response.data })
        }).catch(err => {})
    }

    onClickedCategory(id){
        this.props.navigation.navigate("CategorysPosts", {id: id});
    }


    renderItem = ({item}) => {
        return (<Pressable onPress={() => this.onClickedCategory(item.id)} style={[css.container, {}]}>
            <ImageBackground style={css.cover}  resizeMode={"cover"} source={{uri:'https://emeyz.com/media/category/'+item.cover}} >
                <ImageBackground style={css.box} resizeMode={"stretch"} source={require('../Images/shadow.png')}>
                    <Text style={css.count}>{item.total} içerik</Text>
                    <View style={css.info}>
                        <View style={css.titleLine}></View>
                        <Text style={css.title}>{item.title}</Text>
                        {item.description && (<Text style={css.description}>{item.description || ''}</Text>)}
                    </View>
                </ImageBackground>
            </ImageBackground>
        </Pressable>)
    }



    render(){
        return (
            <View style={{flex:1}}>
                <TopBar title={"Kategoriler"} />
                <FlatList style={{padding: 12}}
                          data={this.state.categories}
                          renderItem={this.renderItem}
                          keyExtractor={(item, index) => index }
                          ItemSeparatorComponent={<View style={{padding: 7}}></View>}
                          ListFooterComponent={<View style={{padding:15}} ></View> } />
            </View>
        )
    }

}

const css = StyleSheet.create({
    container: {
        backgroundColor:'white',
        borderRadius: 10,
        flexDirection:'row',
        overflow: 'hidden',
    },
    cover: {
        width: '100%',
        height: 160,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    box: {
        position: 'absolute',
        width: '100%',
        top: 0,
        bottom: 0,
        justifyContent: 'flex-end'
    },
    info: {
        // backgroundColor: 'red',
        flexDirection: 'column',
        paddingHorizontal: 10
    },
    title: {
        fontFamily: values.font.narrowBold,
        fontSize: 28,
        lineHeight: 28,
        paddingTop: 5,
        color: 'white',
    },
    titleLine: {width:30, backgroundColor: 'rgba(255, 255, 255, 0.85)', height: 2, borderRadius: 2, marginBottom:5, marginTop: -5},
    description: {
        fontFamily: values.font.italic,
        fontSize: 14,
        lineHeight: 18,
        paddingTop:-4,
        color: 'rgba(255, 255, 255, 0.85)',
        marginBottom: 10,
        marginTop:-8

    },
    count: {
        color: 'rgba(255,255,255,1)',
        fontSize: 13,
        fontFamily: values.font.italic,
        position: 'absolute',
        top:10,
        right:10,
        backgroundColor: values.color.primary,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        opacity: 0.90
    },

})

export default CategoriesList
