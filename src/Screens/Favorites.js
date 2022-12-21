import {Component} from "react";
import {View} from 'react-native';

import PostListMini from '../Components/PostListMini';
import TopBar from '../Components/TopBar';
import ApiManager from '../Helpers/ApiManager';
import LoaderPlaceholder from '../Components/LoaderPlaceholder';
import values from '../Datas/Values';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Favorites extends Component{

    constructor(props) {
        super(props);
        this.state = {
            title: "Favorilerim",
            favorites: "",
            offset: 0,
            theEnd: false,
            posts: []
        }
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', this.loadComponent.bind(this));
    }

    loadComponent(){
        AsyncStorage.getItem(values.keyword.storageMyFavorites).then(result => {
            let data =  JSON.parse(result || null)
            if(data){
                this.setState({favorites: data.join(',')}, this.handleLoadData.bind(this, false))

            }
        })

    }

    handleLoadData(loadMore=false){

        this.setState({refreshing: !loadMore, theEnd: false, offset: (loadMore? this.state.offset : 0)}, function (){
            ApiManager.post(`/post/favorites?offset=${this.state.offset}&limit=${values.limit.favoritePosts}`, { favorites: this.state.favorites }).then(response => {
                this.setState({
                    refreshing: false, loading: false,
                    posts: !loadMore? response.data : this.state.posts.concat(response.data),
                    theEnd:  response.data.length < values.limit.favoritePosts
                });
            }).catch(err=>{})

        });
    }

    handleLoadMore(){
        if(!this.state.theEnd){
            this.setState({ loading:true, offset: this.state.posts.length }, function(){
                this.handleLoadData(true);
            });
        }
    }



    render(){
        return (<View style={{flex: 1}}>
            { !this.state.posts?
                (<LoaderPlaceholder/>)
                :
                (<><TopBar title={this.state.title || ''} />
                    <PostListMini
                        items={this.state.posts || []}
                        loading={this.state.loading || false}
                        refreshing={this.state.refreshing || false}
                        handleLoadData={this.handleLoadData.bind(this, false)}
                        handleLoadMore={this.handleLoadMore.bind(this)}
                    />
                </>) }
        </View>)
    }


}

export default Favorites;
