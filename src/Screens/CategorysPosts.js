import {Component} from "react";
import {connect} from "react-redux"
import {View} from 'react-native';

import PostListMini from '../Components/PostListMini';
import TopBar from '../Components/TopBar';
import ApiManager from '../Helpers/ApiManager';
import LoaderPlaceholder from '../Components/LoaderPlaceholder';
import values from '../Datas/Values';

class CategorysPosts extends Component{

    constructor(props) {
        super(props);
        this.state = {
            categoryId: null,
            offset: 0,
            theEnd: false,
            category: {},
            posts: []
        }
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', this.loadComponent.bind(this));
    }

    loadComponent(){
        this.setState({categoryId: this.props.route.params.id || null}, function (){
            this.handleLoadData(false)
        })
    }

    handleLoadData(loadMore=false){
        this.setState({refreshing: !loadMore, theEnd: false, offset: (loadMore? this.state.offset : 0)});
        ApiManager.get(`/category/${this.state.categoryId}/posts?offset=${this.state.offset}&limit=${values.limit.categoryPosts}`).then(response => {
            this.setState({
                category:   response.data.category,
                posts:      !loadMore? response.data.posts : this.state.posts.concat(response.data.posts),
                refreshing: false, loading: false,
                theEnd:     response.data.posts.length < values.limit.categoryPosts
            });
        }).catch(err=>{})
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
                (<><TopBar title={this.state.category.title || ''} />
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

export default connect()(CategorysPosts);
