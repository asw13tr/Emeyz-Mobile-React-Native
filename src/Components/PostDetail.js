import React from "react";
import {mysqlToDate} from '../Helpers/DateHelper';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Share,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import {RenderHTML} from "react-native-render-html"
import styles from '../Datas/Styles';
import PostItemTags from '../Components/PostItemTags';
import values from '../Datas/Values';


class PostDetail extends React.Component{

    onShare = async ({slug, id}) => {
        try {
            const result = await Share.share({
                message: 'https://emeyz.com/'+slug+"-"+id
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    getTheVideoId(){
        if(!this.props.video){
            return false
        }else{
            if(this.props.video.indexOf('youtube') < 0){
                return false
            }else{
                return this.props.video.match(/v=([a-zA-Z0-9_-]+)&?/ig)[0].replace(/v=|\&/ig, '');
            }
        }
    }


    renderListItem({item, index}){
        return (<View style={css.subBody}>
            {item.cover && (<View style={css.cover}>
                <Image source={{uri:values.api.imageUrlLg+this.props.cover}} style={css.image}/>
            </View>)}
            <Text style={[css.title, css.subTitle]}>{item.title}</Text>
            <RenderHTML source={{html: item.content}}
                        contentWidth={Dimensions.get('window').width}
                        allowedStyles={["*"]}
                        baseStyle={css.renderHtml} />
        </View>)
    }

    renderItem(){
        let pTime = mysqlToDate(this.props.p_time)
        // let videoId = this.getTheVideoId();
        return (<>
            <View style={css.header}>
                {


                    (this.props.hide_cover==='on' || this.props.cover.length < 5)?
                        (<View style={css.hideCover}></View>)
                        :
                        (<View style={css.cover}>
                            <Image source={{uri:values.api.imageUrlLg+this.props.cover}} style={css.image}/>
                        </View>)
                }
                <View style={css.date}>
                    <Text style={css.dateDay}>{pTime.day}</Text>
                    <Text style={css.dateMore}>{pTime.monthName + " " + pTime.year}</Text>
                </View>
            </View>

            <View style={css.info}>

                {
                    (!this.props.isFavorite)?
                        (<TouchableOpacity style={[css.infoActionBox]} onPress={() => this.props.onClickFavorite()}>
                            <Icon style={css.infoActionIcon} size={16} color={"white"} name="star-outline" />
                        </TouchableOpacity>)
                        :
                        (<TouchableOpacity style={[css.infoActionBox, {backgroundColor:'green'}]} onPress={() => this.props.onClickFavorite()}>
                            <Icon style={css.infoActionIcon} size={16} color={"white"} name="star" />
                        </TouchableOpacity>)
                }

                <View style={css.infoViewBox}>
                    <Text style={css.infoViewNumber}>{this.props.views}</Text>
                    <Text style={css.infoViewText}>görüntülenme</Text>
                </View>
                <TouchableOpacity style={css.infoActionBox} onPress={this.onShare.bind(this,{slug: this.props.slug, id: this.props.id})}>
                    <Icon style={css.infoActionIcon} size={16} color={"white"} name="share-social-sharp" />
                </TouchableOpacity>
            </View>

            <View style={css.body}>
                <Text style={css.title}>{this.props.title}</Text>
                <PostItemTags items={this.props.categories} />
                <RenderHTML source={this.props.contentForRenderHtml}
                            contentWidth={Dimensions.get('window').width}
                            allowedStyles={["*"]}
                            baseStyle={css.renderHtml} />
            </View>
        </>)
    }



    render(){

        return (
            <View style={css.container}>
                <FlatList
                    ListHeaderComponent={this.renderItem.bind(this)}
                    data={(this.props.contentItems || [])}
                    keyExtractor={i => i.id}
                    renderItem={this.renderListItem.bind(this)}
                />
            </View>
        )
    }

}




const css  = StyleSheet.create({
    ...styles.postItem,
    cover: {
        ...styles.postItem.cover,
        borderRadius: 0,
    },
    hideCover: {
        ...styles.postItem.hideCover,
        borderRadius: 0,
    },
    body: {
        ...styles.postItem.body,
        paddingHorizontal: 15,
        backgroundColor: 'white'
    },
    subBody: {
        marginTop: 15,
        marginBottom: 7,
        paddingHorizontal: 15,
        backgroundColor: 'white'
    },
    subTitle: {
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.25)'
    }
});

export default PostDetail
