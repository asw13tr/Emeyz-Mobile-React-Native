import {Component} from "react";
import PageDetail from "../Components/PageDetail"
import {connect} from "react-redux";
import ApiManager from '../Helpers/ApiManager';
import LoaderPlaceholder from '../Components/LoaderPlaceholder';

class Page extends Component{

    constructor(props) {
        super(props);
        this.state = { page: null }
        this.getPageDetail = this.getPageDetail.bind(this);
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', this.getPageDetail)
    }

    getPageDetail(){
        if(!(this.props.route.params.id || null)){

        }else{
            ApiManager.get('/page/'+this.props.route.params.id).then(response => {
                this.setState({
                    page: {...response.data, contentForRenderHtml: { html: response.data.content || ''} }
                    })
            }).catch((err)=>{})
        }
    }

    render(){
        if(!this.state.page){
            return (<LoaderPlaceholder />)
        }else{
            return (<PageDetail {...this.state.page} />)
        }

    }

}

export default connect()(Page)

