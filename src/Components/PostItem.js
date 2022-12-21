import React from "react"
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import PostItemTags from './PostItemTags';
import {mysqlToDate} from "../Helpers/DateHelper"
import {goToPostScreenWithParams} from "../Helpers/GlobalActions"
import styles from "../Datas/Styles"
import values from '../Datas/Values';

class PostItem extends React.Component{

    render(){
        let {item} = this.props;
        let pTime = mysqlToDate(item.p_time);


        return (
            <View style={css.container}>
                <Pressable onPress={() => goToPostScreenWithParams({id: this.props.item.id}) }>
                <View style={css.innerContainer}>
                    <View style={css.header}>
                        {
                            (item.hide_cover==='on' || item.cover.length < 5)?
                                (<View style={css.hideCover}></View>)
                                :
                                (<View style={css.cover}>
                                 <Image source={{uri:values.api.imageUrlMd+item.cover}} style={css.image}/>
                                </View>)
                        }

                        <View style={css.date}>
                            <Text style={css.dateDay}>{pTime.day}</Text>
                            <Text style={css.dateMore}>{pTime.monthName +" "+ pTime.year}</Text>
                        </View>
                    </View>

                    <View style={css.info}>
                        <View style={css.infoViewBox}>
                            <Text style={css.infoViewNumber}>{item.views}</Text>
                            <Text style={css.infoViewText}>görüntülenme</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={css.title}>{item.title}</Text>
                        <Text style={css.description}>{item.summary || item.description}</Text>
                    </View>
                </View>
                </Pressable>
                <PostItemTags items={item.categories} />
            </View>
        )
    }

}

const css  = StyleSheet.create({...styles.postItem});

export default PostItem
