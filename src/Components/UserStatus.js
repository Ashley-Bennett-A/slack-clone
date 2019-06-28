import React, { Component } from 'react'


class UserStatus extends Component {

    render() {
        return (
            <div className={"UserStatus"}>
                <p>{this.props.status}</p>
            </div>
        )
    }
}

export default UserStatus;