import React from "react";
import Chatkit from "@pusher/chatkit-client";

class Room extends React.Component {
  state = {
    messages: [],
    value: "",
    messageToSend: "",
    rooms: [],
    user: undefined,
    usersInRoom: 0,
    usersAreActive: "offline"
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
        this.setState({ user: currentUser, rooms: currentUser.rooms });
        console.log(currentUser.rooms);
        currentUser.subscribeToRoomMultipart({
          roomId: currentUser.rooms[2].id,

          hooks: {
            onMessage: message => {
              let oldMessages = this.state.messages;
              oldMessages.push(message);
              // console.log(currentUser.);
              this.setState({
                messages: oldMessages,
                usersInRoom: currentUser.users.length
              });
            },
            onPresenceChanged: (state, user) => {
              if (user.name === chatManager.userId) {
                console.log(`User ${user.name} is ${state.current}`);
                this.setState({ usersAreActive: state.current });
              }
            }
          },
          messageLimit: 20
        });

        currentUser
          .fetchMultipartMessages({
            roomId: "19442569"
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
      roomId: this.state.user.rooms[2].id
    });
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    // console.log(this.state.user);s
    return (
      <div>
        <h1>Room ({this.state.usersInRoom} users)</h1>
        <form action="">
          <input type="text" onChange={this.handleChange} />
          <input type="submit" onClick={this.send} />
        </form>

        {this.state.messages.map(message => {
          return (
            <li>
              {message.senderId} {this.state.usersAreActive} said "
              {message.parts[0].payload.content}" @ {message.createdAt}
            </li>
          );
        })}

        {this.state.rooms.map(room => {
          return <button id={room.id}>{room.name}</button>;
        })}
      </div>
    );
  }
}

export default Room;
