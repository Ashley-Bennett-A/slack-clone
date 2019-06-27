import React, { Component } from 'react'
import Message from './Message.js'

class MessageContainer extends Component {
    state = {
        messages: []
    }

    componentDidMount() {
        this.setState({messages: this.props.messages})
    }

    render(props) {
        return (
           <div className="MessagesContainer">
               {this.state.messages.map(message => {
            return (
              <Message
                user={this.props.userid}
                sender={message.senderId}
                body={message.parts[0].payload.content}
                date={message.createdAt}
              />
            );
          })}
           </div> 
        )
    }
}

export default MessageContainer