import React, { Component } from 'react'
import './Message.css'

class Message extends Component {

    state = {
        origin: undefined
    }

    componentDidMount() {
        if (this.props.sender === this.props.user) {
            this.setState({ origin: true })
        } else {
            this.setState({ origin: false })
        }
    }

    timeFormatter() {
        let long = this.props.date
        let short = long.slice(11, 19)
        return short
    }

    avatarLoad() {
        if (!this.props.avatar) {
            return "https://i.ya-webdesign.com/images/default-avatar-png-6.png"
        }
    }


    render() {
        let className, align;
        if (this.state.origin) {
            className = "Sent"
            align = "Right"
        } else {
            className = "Recieved"
            align = "Left"
        }
        return (
            <li className={"MessageCont " + align} key={this.props.mKey}>
                <div className="userInfo">
                    {/* <p className="MessageUser">{this.props.sender}</p> */}
                    <img className="MessageAvatar" src={this.avatarLoad()} alt="avatar" />
                </div>
                <div>
                    <p className={"MessageBody " + className}>{this.props.body}</p>
                    <p className={"MessageDate " + align}>{this.timeFormatter()} {this.props.sender}</p>
                </div>
            </li>
        )
    }
}

export default Message