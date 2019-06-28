import React, { Component } from 'react'
import './UserStatus.css'

class UserStatus extends Component {

    nameSpliter() {
        let str = this.props.status;
        let arr = str.split(" ");
        return arr
    }

    statusChecker() {
        let className;
        if(this.nameSpliter()[1] === "online") {
            className = "online"
        } else {
            className = "offline"
        }
        return className;
    }

    render() {
        return (
            <div className={"UserStatus " + this.statusChecker()}>
                <p>{this.nameSpliter()[0]}</p>
            </div>
        )
    }
}

export default UserStatus;