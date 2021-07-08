import React, {useEffect} from 'react'

const KvalifikaFrame = (props) => {

    console.log('frame url', props.frameUrl);


    useEffect(() => {
        window.addEventListener('message', async (event) => {
            console.log(event);
        })

        return () => window.removeEventListener();
    }, [])

    return (
        props.frameUrl? 
        <div style = {{width: '100%', height: '100%', position: 'absolute', top: 0}}>
            <iframe src = {props.frameUrl} style = {{width: '100%', height: '100%', }} allow = 'camera *;' allowFullScreen = {true}  />
        </div> : null
    )
}




export default KvalifikaFrame;
