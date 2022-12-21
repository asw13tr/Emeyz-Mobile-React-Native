import React from "react";
import {View, FlatList, RefreshControl} from 'react-native';

import {connect} from "react-redux"
import {setPosts} from "../Store/Reducers/Post"
import PostItem from "./PostItem"
import ApiManager from '../Helpers/ApiManager';
import values from '../Datas/Values';
import LoaderPlaceholder from './LoaderPlaceholder';

class PostList extends React.Component{

    state = {
        refreshing: false,
        created: false,
        theEnd: false
    }

    constructor(props) {
        super(props);
        this.getItemsFromApi = this.getItemsFromApi.bind(this);
        this.loadMoreItems = this.loadMoreItems.bind(this);
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', this.onCreate.bind(this))
    }

    onCreate(){
        if(this.state.created===false){
            this.getItemsFromApi();
            this.setState({created:true})
        }
    }

    loadMoreItems(){
        if(!this.state.theEnd){
            let offset = this.props.posts.length
            ApiManager.get(`/post?offset=${offset}&limit=${values.limit.homePosts}`).then(response => {
                this.props.setPosts({reset:false, posts:response.data})
                if(response.data.length < values.limit.homePosts){
                    this.setState({theEnd: true})
                }
            })
        }
    }

    getItemsFromApi(){
        ApiManager.get(`/post?offset=0&limit=${values.limit.homePosts}`).then(response => {
            this.props.setPosts({reset:true, posts: response.data})
        })
    }

    onRefresh(){
        this.setState({theEnd: false}, this.getItemsFromApi)
    }

    render(){
        return (<View style={{flex:1}}>
            {this.props.posts.length<1? (<LoaderPlaceholder fullscreen={true}/>) : (
                <FlatList
                    style={{padding: 15}}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing}  onRefresh={this.onRefresh.bind(this)} />}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    data={this.props.posts}
                    renderItem={({item}) => (<PostItem item={item} />) }
                    onEndReached={this.loadMoreItems}
                    onEndReachedThreshold={0.2}
                    ItemSeparatorComponent={<View style={{padding: 10}}></View>}
                    ListFooterComponent={<View style={{padding:15}} />} />
            )}



        </View>)
    }

}

function mapStateToProps(state){
    return {
        posts: state.Post.posts
    }
}
export default connect(mapStateToProps, {setPosts})(PostList)
