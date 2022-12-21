import React, {Component} from "react";
import {FlatList,  StyleSheet, View} from 'react-native';
import LoaderPlaceholder from './LoaderPlaceholder';
import PostListMiniItem from './PostListMiniItem2';

class PostListMini extends Component{

    render(){
        return (
            <FlatList
                refreshing={this.props.refreshing || false}
                onRefresh={() => this.props.handleLoadData(true)}
                onEndReached={() => this.props.handleLoadMore()}
                style={{paddingTop: 15}}
                keyExtractor={(item, index) => `${item.id}-${index.toString()}`}
                data={this.props.items}
                renderItem={({item}) => <PostListMiniItem item={item} />}
                ItemSeparatorComponent={({leadingItem}) => (<View key={`sep-${leadingItem.id}`} style={{padding: 7}}></View> ) }
                ListFooterComponent={() => this.props.loading? (<LoaderPlaceholder fullscreen={false} />) : (<View style={{padding: 15}}></View>) } />
        )
    };

}


const css = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default PostListMini;
