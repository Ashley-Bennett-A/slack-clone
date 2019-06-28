import React, { Component } from 'react'
import './UserStatus.css'


class UserStatus extends Component {

    nameSpliter() {
        let str = this.props.status;
        let arr = str.split(" ");
        let dis = arr[0]
        return dis
    }

    render() {
        return (
            <div className={"UserStatus"}>
                <p>{this.nameSpliter()}</p>
            </div>
        )
    }
}

export default UserStatus;