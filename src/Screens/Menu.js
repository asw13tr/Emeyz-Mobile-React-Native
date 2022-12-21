import {Component} from "react";
import {View, Text, SectionList, StyleSheet, TouchableOpacity} from 'react-native';
import  Icon from "react-native-vector-icons/Ionicons"
import ApiManager from '../Helpers/ApiManager';
import {onClickedMenuItem} from "../Helpers/GlobalActions"
import values from '../Datas/Values';
import {connect} from 'react-redux';

class Menu extends Component{

    state = {
        sections: []
    }

    renderSection({section}){
        return (<View style={css.sectionBox}>
            <Icon style={css.sectionIcon} name="albums-outline" />
            <Text style={css.sectionTitle}>{section.title}</Text>
        </View>)
    }

    renderItem({item}){
        return (<TouchableOpacity style={css.itemBox} onPress={() => onClickedMenuItem(item.url)}>
            <Icon style={css.itemIcon} name="document-outline" />
            <Text style={css.itemTitle}>{item.title}</Text>
        </TouchableOpacity>)
    }

    render(){
        return (
            <View style={{paddingHorizontal: 20}}>
                <SectionList
                sections={this.props.items}
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSection}/>
            </View>
        )
    }

}

const css = StyleSheet.create({
    sectionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5
    },
    sectionTitle: {
        fontFamily: values.font.narrowBold,
        letterSpacing: 0.2,
        fontSize: 25,
        color: 'rgba(0, 0, 0, 1)'
    },
    sectionIcon: {
        fontSize:  17,
        color: 'black',
        marginRight: 5
    },
    itemBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        marginVertical: 2
    },
    itemTitle: {
        fontFamily: values.font.narrow,
        fontSize: 18,
        letterSpacing: 0.75,
        color: 'rgba(0, 0, 0, 0.5)'
    },
    itemIcon: {
        fontSize:  15,
        marginRight: 3
    }

})

function mapStateToProps(state){
    return {
        items: state.Menu.items
    }
}
export default connect(mapStateToProps)(Menu)
