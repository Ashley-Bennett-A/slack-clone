import React from "react";
// import Chatkit from "@pusher/chatkit-client";
import Message from "./Message.js";
let creatingButtons;

class Room extends React.Component {
  state = {
    messages: [],
    value: "",
    messageToSend: "",
    user: null,
    usersInRoom: 0,
    usersAreActive: "offline",
    currentRoom: null,
    peopleInRoom: {},
    messagesLoaded: false,
    test: []
  };

  componentDidMount() {
    this.props.manager
      .connect()
      .then(user => {
        this.setState({
          currentRoom: this.props.room,
          user: user,
          messages: user
        });
        this.state.user
          .fetchMultipartMessages({
            roomId: this.props.room
          })
          .then(messages => {
            console.log(messages);
            this.setState({
              messages: messages,
              messagesLoaded: true
            });
          })
          .catch(err => {
            console.log(`Error fetching messages: ${err}`);
          });
        user.subscribeToRoomMultipart({
          roomId: this.props.room,
          hooks: {
            onMessage: message => {
              let oldMessages = this.state.messages;
              oldMessages.push(message);
              this.setState({
                usersInRoom: user.users.length
              });
            },
            onPresenceChanged: (state, user) => {
              // this.setState({ user: this.state.user });
              let array = [];
              let badCode;
              let people = Object.keys(this.state.user.presenceStore).length;
              // console.log(people);
              if (people === this.state.usersInRoom) {
                Object.keys(this.state.user.presenceStore).forEach(status => {
                  creatingButtons = this.state.user.presenceStore[status];
                  badCode = status + " " + creatingButtons;
                  console.log(badCode);
                  if (badCode.split(" ")[1] === "online") {
                    array.push(badCode);
                  }
                });
              }
              this.setState({ test: array });
              this.setState({ peopleInRoom: this.state.user.presenceStore });

              if (user.name === this.props.manager.userId) {
                // console.log(`User ${user.name} is ${state.current}`)
                this.setState({ usersAreActive: state.current });
              }
            }
          }
        });
      })
      .catch(err => console.log(err));
  }

  send = e => {
    e.preventDefault();
    this.state.user.sendSimpleMessage({
      text: this.state.value,
      roomId: this.state.currentRoom
    });
  };

  //#region Create Room
  createRoom = () => {
    this.state.user
      .createRoom({
        name: "testAGain",
        private: true,
        addUserIds: ["AB", "CR"],
        customData: {
          foo: 42
        }
      })
      .then(room => {
        console.log(`Created room called ${room.name}`);
      })
      .catch(err => {
        console.log(`Error creating room ${err}`);
      });
  };
  //#endregion

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  // roomChange = e => {
  //   e.persist();
  //   this.setState({ currentRoom: e.target.id });
  //   this.state.user
  //     .fetchMultipartMessages({
  //       roomId: e.target.id
  //     })
  //     .then(messages => {
  //       this.setState({
  //         messages: messages
  //       });
  //     })
  //     .catch(err => {
  //       console.log(`Error fetching messages: ${err}`);
  //     });
  // };

  render() {
    return (
      <div>
        <h1>
          Room {this.state.currentRoom} ({this.state.usersInRoom} users)
        </h1>
        {this.state.test.map(status => {
          return (
            <div>
              <button>{status}</button>
            </div>
          );
        })}

        <button onClick={this.createRoom}>New Room</button>
        <form action="">
          <input type="text" onChange={this.handleChange} />
          <input type="submit" onClick={this.send} />
        </form>
        <div className="MessagesContainer">
          {this.state.messagesLoaded ? (
            this.state.messages.map(message => {
              return (
                <Message
                  user={this.state.user.id}
                  sender={message.senderId}
                  body={message.parts[0].payload.content}
                  date={message.createdAt}
                />
              );
            })
          ) : (
            <h1>No messages</h1>
          )}
        </div>
      </div>
    );
  }
}

export default Room;
