import values from './Values';

export default {

    postItem: {
        container: {
            flexDirection: 'column',
        },
        innerContainer: {
            marginBottom: 10
        },header: {

        },
        cover: {
            width: '100%',
            height: 300,
            borderRadius: 15,
            overflow: 'hidden',
            shadowOpacity: 1,
        },
        hideCover: {
            width: '100%',
            height: 150,
            borderRadius: 15,
            overflow: 'hidden',
            shadowOpacity: 1,
            backgroundColor: values.color.primary
        },
        image: {
            flex: 1,
            resizeMode: 'cover'
        },
        date: {
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(183, 28, 28, 0.65)',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 15
        },
        dateDay: {
            fontFamily: values.font.narrowBold,
            textAlign: 'center',
            color: 'white',
            fontSize: 25,
            lineHeight: 30,
            marginTop: 3
        },
        dateMore: {
            textAlign: 'center',
            color: 'white',
            fontFamily: values.font.narrowBold,
            fontSize: 12,
            lineHeight: 15,
            letterSpacing: 0.5,
            marginTop: -8
        },
        info: {
            alignItems:'center',
            marginTop: -70,
            flexDirection:'row',
            justifyContent:'space-evenly'
        },
        infoViewBox: {
            backgroundColor: values.color.primary,
            width: 90,
            height: 90,
            borderWidth: 5,
            borderColor: '#FCFCFC',
            borderRadius: 100,
            justifyContent:'center',
            alignItems: 'center'
        },
        infoViewNumber: {
            fontFamily: values.font.narrowBold,
            textAlign:'center',
            color: 'white',
            fontSize: 30,
            lineHeight: 38
        },
        infoViewText: {
            fontFamily: values.font.narrow,
            textAlign:'center',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: 14,
            letterSpacing: 0.25,
            lineHeight: 18,
            marginTop: -14
        },
        infoActionBox: {
            width:45,
            height:45,
            borderRadius:45,
            backgroundColor: '#C30F0E',
            borderWidth: 5,
            borderColor: 'white',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40
        },
        infoActionIcon: {

        },
        body: {
            marginTop: 0,
            marginBottom: 7
        },
        title: {
            fontFamily: values.font.narrowBold ,
            fontSize: 25,
            lineHeight: 25,
            color: 'rgba(50, 50, 50, 1)',
            paddingTop: 10
        },
        description: {
            fontFamily: values.font.normal,
            color: values.color.textGrey,
            fontSize: 15,
            lineHeight: 21,
            marginTop: -7
        },
        renderHtml: {
            fontFamily: values.font.normal,
            color: values.color.textGrey,
            fontSize: 15,
            lineHeight: 21,
        }
    }







}
