import React, { Component } from 'react'
import './Message.css'

class Message extends Component{

    state = {
        origin: undefined
    }

    componentDidMount() {
        if(this.props.sender === this.props.user) {
            this.setState({origin: true})
        } else {
            this.setState({origin: false})
        }
    }

    timeFormatter() {
        let long = this.props.date
        let short = long.slice(11,19)
        return short
    }


    render() {
        let className, align;
        if(this.state.origin) {
            className = "Sent"
            align = "Right"
        } else {
            className = "Recieved"
            align = "Left"
        }
        return (
            <li className="MessageCont">
                <div class="MessageAvatar"></div>
                <p className="MessageUser">{this.props.sender}</p>
                <p className={"MessageBody " + className}>{this.props.body}</p>
                <p className={"MessageDate " + align}>{this.timeFormatter()}</p>
            </li>
        )
    }
}

export default Message