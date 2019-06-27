import React from 'react'
import './SendBox.css'

const SendBox = (props) => {
    return (
        <div class="SendContainer">
            <form>
                <input type="text" onChange={props.changeHandler}/>
                <input type="submit" onClick={props.submitter} />
            </form>
        </div>
    )
}

export default SendBox