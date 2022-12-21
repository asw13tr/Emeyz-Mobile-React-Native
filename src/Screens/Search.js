import React from "react";
import {View, TextInput, StyleSheet, TouchableOpacity, LogBox} from 'react-native';
import {connect} from "react-redux";
import ApiManager from '../Helpers/ApiManager';
import Icon from 'react-native-vector-icons/Ionicons';
import values from '../Datas/Values';

import PostListMini from "../Components/PostListMini"
import LoaderPlaceholder from '../Components/LoaderPlaceholder';

class Search extends React.Component{



    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            posts: [],
            loading: false,
            theEnd: false,
            offset: 0
        }
    }

    componentDidMount(){
        // this.props.navigation.addListener('focus', this.getThePostsFromSearch.bind(this));
    }


    handleLoadData(loadMore=true){
        ApiManager.post(`/search?offset=${this.state.offset}&limit=${values.limit.searchPosts}`, { s: this.state.searchText}).then(response => {
            console.log("==========================");
            console.log(response.data);
            this.setState({
                posts: !loadMore? response.data : this.state.posts.concat(response.data),
                loading: false, refreshing:false,
                theEnd: response.data.length < values.limit.searchPosts
            });
        }).catch(err => {})
    }


    handleLoadMore(){
        if(!this.state.theEnd){
            this.setState({loading:true, offset: (this.state.posts || []).length}, this.handleLoadData.bind(this,true));
        }
    }


    clearSearchedText(){
        this.setState({searchText: '', posts: []})
    }

    onChangedText(value){
        this.setState({searchText: value}, function (){
            if(value.length < 3){
                this.setState({posts: [], loading: false, theEnd: false, offset: 0 })
            }else{
                this.setState({posts: [], loading: true, theEnd:false, offset:0}, this.handleLoadData(false))
            }
        });

    }


    render(){
        return (
            <View style={css.container}>
                <View style={css.form}>
                    <TextInput style={css.searchBox}
                               onChangeText={(val) => this.onChangedText(val)}
                               value={this.state.searchText}
                               placeholder={"Aranacak içerik"}
                               placeholderTextColor={values.color.textGrey}
                               autoFocus={true} />
                    {this.state.searchText.length > 0 &&
                        (<TouchableOpacity style={css.closeButton} onPress={this.clearSearchedText.bind(this)}>
                            <Icon name={"close-outline"} size={24} color={"black"} />
                        </TouchableOpacity>)}
                </View>
                <PostListMini items={this.state.posts || []}
                              loading={this.state.loading || false}
                              handleLoadData={this.handleLoadData.bind(this)}
                              handleLoadMore={this.handleLoadMore.bind(this)}
                              refreshing={this.state.refreshing || false} />
            </View>
        )
    }


}

const css = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    },
    form: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: values.color.backgroundGrey,
        borderRadius: 5,
        flexDirection: 'row',
        marginBottom:5,
        borderBottomColor: 'rgba(0,0,0,0.20)',
        borderBottomWidth: 2
    },
    searchBox: {
        color: values.color.textGrey,
        backgroundColor: values.color.background,
        fontFamily: values.font.normal,
        paddingLeft: 10,
        paddingRight: 30,
        paddingVertical: 5,
        borderRadius: 5,
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 17,
    },
})


export default connect()(Search)
