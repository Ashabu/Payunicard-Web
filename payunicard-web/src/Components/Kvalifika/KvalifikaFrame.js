import React, {useEffect} from 'react'

const KvalifikaFrame = (props) => {
    const { onStartSession, onCloseSession, frameUrl } = props;
    console.log('frame url', frameUrl);
    


    useEffect(() => {
        onStartSession();
        window.addEventListener('message',  frameEvents)

        return () => window.removeEventListener('message', frameEvents);
    }, [])

    const frameEvents = (e) => {
        if (e.data.finished == true) {
            onCloseSession(e.data.sessionId);
        }
        if (e.data.isClose == true) {
            onCloseSession(e.data.sessionId);
        }
        if (e.data.isLivenessFinished == true && e.data.isDocumentFinished == false) {
            onCloseSession(e.data.sessionId);
        }
        console.log('frame events =======================================================>', e.data)
    }


    return (
        frameUrl? 
        <div style = {{width: '100%', height: '100%', position: 'absolute', top: 0}}>
            <iframe src = { frameUrl } style = {{width: '100%', height: '100%', }} allow = 'camera *;' allowFullScreen = {true}  />
        </div> : null
    )
}




export default KvalifikaFrame;
