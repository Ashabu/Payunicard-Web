import React, {useEffect} from 'react'

const KvalifikaFrame = (props) => {

    console.log('frame url', props.frameUrl);
    


    useEffect(() => {
        props.onStartSession();
        window.addEventListener('message',  frameEvents)

        return () => window.removeEventListener('message', frameEvents);
    }, [])

    const frameEvents = (e) => {
        if (e.data.finished == true) {
            props.onCloseSession(e.data.sessionId);
        }
        if (e.data.isClose == true) {
            props.onCloseSession(e.data.sessionId);
        }
        if (e.data.isLivenessFinished == true && e.data.isDocumentFinished == false) {
            props.onCloseSession(e.data.sessionId);
        }
        console.log('frame events =======================================================>', e.data)
    }


    return (
        props.frameUrl? 
        <div style = {{width: '100%', height: '100%', position: 'absolute', top: 0}}>
            <iframe src = {props.frameUrl} style = {{width: '100%', height: '100%', }} allow = 'camera *;' allowFullScreen = {true}  />
        </div> : null
    )
}




export default KvalifikaFrame;
