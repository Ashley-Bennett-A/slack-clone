import React from "react";
import Chatkit from "@pusher/chatkit-client";

class Room extends React.Component {
  state = {
    messages: [],
    value: "",
    messageToSend: "",
    user: undefined
  };

  componentDidMount() {
    const tokenProvider = new Chatkit.TokenProvider({
      url:
        "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e26280f8-acac-4da9-9e2a-80cd549547f8/token"
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:e26280f8-acac-4da9-9e2a-80cd549547f8",
      userId: "AB",
      tokenProvider: tokenProvider
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ user: currentUser });
        currentUser.subscribeToRoomMultipart({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              let oldMessages = this.state.messages;
              oldMessages.push(message);
              this.setState({ messages: oldMessages });
              console.log(
                `${message.senderId} said:`,
                message.parts[0].payload.content
              );
            }
          }
        });

        currentUser
          .fetchMultipartMessages({
            roomId: "19442511"
          })
          .then(messages => {
            this.setState({
              messages: messages
            });
          })
          .catch(err => {
            console.log(`Error fetching messages: ${err}`);
          });
      })
      .catch(err => console.log(err));
  }

  send = e => {
    e.preventDefault();
    this.state.user.sendSimpleMessage({
      text: this.state.value,
      roomId: this.state.user.rooms[0].id
    });
    // let oldMessages = this.state.messages;
    // oldMessages.push(this.state.value);
    // this.setState({ messages: oldMessages });

    // oldMessages.push(...newMessage);
    // this.setState({ messages: oldMessages });
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    console.log(this.state.messages);
    return (
      <div>
        <h1>Room</h1>
        <form action="">
          <input type="text" onChange={this.handleChange} />
          <input type="submit" onClick={this.send} />
        </form>
        {this.state.messages.map(message => {
          return (
            <li>
              {message.senderId} said "{message.parts[0].payload.content}" @{" "}
              {message.createdAt}
            </li>
          );
        })}
      </div>
    );
  }
}

export default Room;
