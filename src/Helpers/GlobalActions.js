import * as Navigator from "../Helpers/NavigationRef"

export const onClickedMenuItem = (item) => {
    item = (typeof item == 'string')? JSON.parse(item) : item;

    if(  (item.type || null)=='appurl' && (item.screen || false) !== false  ){
        Navigator.navigate(item.screen, (item.params || {}));
    }
}


export const goToPostScreenWithParams = (params={}) => {
    Navigator.navigate("Main", {
        screen: 'Post',
        params: params
    });
}


