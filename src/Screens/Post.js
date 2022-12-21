import React, {Component} from "react";
import PostDetail from '../Components/PostDetail';
import LoaderPlaceholder from '../Components/LoaderPlaceholder';
import ApiManager from '../Helpers/ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import values from '../Datas/Values';
import {showMessage} from 'react-native-flash-message';

class Post extends Component{

    constructor(props) {
        super(props);
        this.state = { post: null, updateViewsMethod: null }
        this.updateViews = this.updateViews.bind(this);
        this.onClickFavorite    = this.onClickFavorite.bind(this)
        this.addToFavorites     = this.addToFavorites.bind(this)
        this.removeFromFavorites= this.removeFromFavorites.bind(this)
        this.isFavorite         = this.isFavorite.bind(this)
    }

    getThePost(){
        let id =  this.props.route.params.id || null;
        if(id){
            this.setState({post:null})
            ApiManager.get('/post/'+id).then(response => {
                this.setState({
                    post: {...response.data, contentForRenderHtml: { html: (response.data.content || '') }},
                    updateViewsMethod: setTimeout(this.updateViews, 7000)
                }, this.isFavorite)
            }).catch(err=>{})
        }
    }


    //======> FAVORI İŞLEMLERİ
    onClickFavorite(){
        if(!this.state.isFavorite){
            this.addToFavorites()
        }else{
            this.removeFromFavorites()
        }
    }

    isFavorite(){
        AsyncStorage.getItem(values.keyword.storageMyFavorites).then(response => {
            let favorites = (JSON.parse(response) || [])
            this.setState({ favorites: favorites,  isFavorite: (favorites.indexOf(this.state.post.id) > -1) })
        }).catch(e => {});
    }

    addToFavorites(){
        this.state.favorites.push(this.state.post.id);
        AsyncStorage.setItem(values.keyword.storageMyFavorites, JSON.stringify(this.state.favorites)).then(() => {
            this.setState({ isFavorite: true }, function (){
                showMessage({ message: 'İçerik favorilere kaydedildi', type: 'success',  floating: true,  icon: 'auto' })
            })
        }).catch(e => {})
    } // addToFavorites

    removeFromFavorites(){
        let indexNo = this.state.favorites.indexOf(this.state.post.id);
        if( indexNo > -1 ){
            this.state.favorites.splice(indexNo, 1);
            AsyncStorage.setItem(values.keyword.storageMyFavorites, JSON.stringify(this.state.favorites)).then(() => {
                this.setState({ isFavorite: false }, function(){
                    showMessage({ message: 'İçerik favorilerden kaldırıldı', type: 'success',  floating: true,  icon: 'auto' })
                })
            }).catch(e => {})
        }
    } // removeFromFavorites
    //======> FAVORI İŞLEMLERİ



    onBlurScreen(){
        clearTimeout(this.state.updateViewsMethod)
        this.setState({updateViewsMethod: null })
    }

    updateViews(){
        ApiManager.post('/post/views', { id:this.state.post.id, value:1 }).then(response => {}).catch(err => {})
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', this.getThePost.bind(this))
        this.props.navigation.addListener('blur', this.onBlurScreen.bind(this))
    }

    render() {
        if(!this.state.post){
            return (<LoaderPlaceholder/>)
        }else{
            return (<PostDetail {...this.state.post}
                                isFavorite={this.state.isFavorite}
                                favorites={this.state.favorites}
                                onClickFavorite={this.onClickFavorite}
            />)
        }
    }

}


export default Post
