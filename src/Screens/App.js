import React, {Component} from "react";
import {StatusBar} from 'react-native';
import values from '../Datas/Values';
import {Provider} from 'react-redux';
import store from '../Store';
import Screens from './Screens';
import Splash from './Splash';


class App extends Component{

    state = {splash: true}

    constructor(props) {
        super(props);
        this.changeSplash = this.changeSplash.bind(this)
    }

    componentDidMount(){
        if(this.state.splash){
            setTimeout(this.changeSplash, 1000);
        }
    }
    changeSplash(){ this.setState({splash: false}) }

    render(){
        return (<>
            <StatusBar backgroundColor={this.state.splash? values.color.primary : values.color.primaryDark} barStyle={'light-content'} />
            {this.state.splash? (<Splash/>) : (<Provider store={store} ><Screens /></Provider>)}

        </>)
    }

}


export default App
