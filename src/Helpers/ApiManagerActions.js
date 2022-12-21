import ApiManager from './ApiManager';
import * as Navigator from "../Helpers/NavigationRef"
import store from "../Store/index"
import {setPost} from '../Store/Reducers/Post';
import {setPage} from '../Store/Reducers/Page';

export const goToPostScreenById = (id) => {
    ApiManager.get('/post/'+id).then(response => {
        store.dispatch(setPost({...response.data, RenderHtmlContent: { html: response.data.content || '' } }))
        Navigator.navigate("Post");
    }).catch((err)=>{})
}


export const goToPageScreenById = (id) => {
    ApiManager.get('/page/'+id).then(response => {
        store.dispatch(setPage({...response.data, RenderHtmlContent: { html: response.data.content || '' } }))
        Navigator.navigate("Page");
    }).catch((err)=>{})
}
