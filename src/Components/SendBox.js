import React from 'react'
import './SendBox.css'

const SendBox = (props) => {
    return (
        <div className="SendContainer">
                <input className="sendBar" type="text" placeholder="Say something..." onChange={props.changeHandler}/>
                <i className="fas fa-paper-plane sendButton" onClick={props.submitter}></i>
        </div>
    )
}

export default SendBox