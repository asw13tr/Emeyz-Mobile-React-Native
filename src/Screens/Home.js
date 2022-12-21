import React from "react";
import {View} from "react-native";
import PostList from "../Components/PostList"
import {connect} from 'react-redux';
import {setPostListActive} from "../Store/Reducers/Post"

class Home extends React.Component{

    onBlurScreen(){
        this.props.setPostListActive(false);
    }

    componentDidMount(){
        this.props.navigation.addListener('blur', this.onBlurScreen.bind(this))
    }

    render(){

        return (
            <View style={{flex: 1, padding: 0}}>
                <PostList navigation={this.props.navigation}/>
            </View>
        )
    }

}

export default connect(null, {setPostListActive})(Home);
