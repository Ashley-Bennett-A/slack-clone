import React, { Component } from 'react'
import Message from './Message.js'

class MessageContainer extends Component {
    state = {
        messages: [],
        user: null
    }

    autoScroll = () => {
        this.messagesEnd.scrollIntoView({behaviour: 'smooth'})
    }

    componentDidMount() {
        this.setState({ messages: this.props.messages, user: this.props.user })
        this.autoScroll();
    }

    componentDidUpdate() {
        this.autoScroll();
    }

    render(props) {
        return (
            <div className="MessagesContainer">
                {this.state.messages.map(message => {
                    return (
                        <Message
                            mKey={message.id}
                            user={this.state.user.id}
                            avatar={this.state.user.avatarUrl}
                            sender={message.senderId}
                            body={message.parts[0].payload.content}
                            date={message.createdAt}
                        />
                    );
                })}
                <div ref={(el) => {this.messagesEnd = el}}>
                    
                </div>
            </div>
        )
    }
}

export default MessageContainer