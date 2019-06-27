import React from "react";
import Chatkit from "@pusher/chatkit-client";
import Message from "./Message.js";
let creatingButtons;


class Room extends React.Component {
  state = {
    messages: [],
    value: "",
    messageToSend: "",
    rooms: [],
    user: null,
    usersInRoom: 0,
    usersAreActive: "offline",
    currentRoom: null,
    peopleInRoom: {},

    test: []
  };

  componentDidMount() {
    const tokenProvider = new Chatkit.TokenProvider({
      url:
        "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e26280f8-acac-4da9-9e2a-80cd549547f8/token"
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:e26280f8-acac-4da9-9e2a-80cd549547f8",

      userId: "jz",

      tokenProvider: tokenProvider
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({
          user: currentUser,
          rooms: currentUser.rooms,
          currentRoom: currentUser.rooms[0].id
        });
        // console.log(currentUser.rooms);
        currentUser.subscribeToRoomMultipart({
          roomId: this.state.currentRoom,

          hooks: {
            onMessage: message => {
              let oldMessages = this.state.messages;

              oldMessages.push(message);
              this.setState({
                messages: oldMessages,
                usersInRoom: currentUser.users.length
              });
            },
            onPresenceChanged: (state, user) => {
              this.setState({ user: currentUser });
              let array = []
              let checkWhoIsOnline;
              let people = Object.keys(this.state.user.presenceStore).length;
              // console.log(people);
              if (people === this.state.usersInRoom) {
                Object.keys(this.state.user.presenceStore).forEach(status => {
                  creatingButtons = this.state.user.presenceStore[status]
                  checkWhoIsOnline = status + " " + creatingButtons
                  // console.log(checkWhoIsOnline)
                  if (checkWhoIsOnline.split(" ")[1] === "online"){
                    array.push(checkWhoIsOnline)
                  }

                  //<WhosOnlineListItem key={index} presenceState="online">

                });
              }
              this.setState({ test: array })
              this.setState({ peopleInRoom: this.state.user.presenceStore });

              if (user.name === chatManager.userId) {
                // console.log(`User ${user.name} is ${state.current}`)
                this.setState({ usersAreActive: state.current });
              }
            }
          },
          messageLimit: 20
        });
      })
      .catch(err => console.log(err));
  }

  send = e => {
    e.preventDefault();
    // e.persist();
    this.state.user.sendSimpleMessage({
      text: this.state.value,
      roomId: this.state.currentRoom
    });
    // this.state.user
    //   .fetchMultipartMessages({
    //     roomId: this.state.currentRoom
    //   })
    //   .then(messages => {
    //     // console.log;
    //     this.setState({
    //       messages: messages
    //     });
    //   })
    //   .catch(err => {
    //     console.log(`Error fetching messages: ${err}`);
    //   });
  };

  //#region Create Room
  createRoom = () => {
    this.state.user
      .createRoom({
        name: `New ${this.state.user.id} Room`,
        private: false,
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

  //file Share jquery

 
  



  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  roomChange = e => {
    console.log(e.target);
    e.persist();
    this.setState({ currentRoom: e.target.id });
    this.state.user
      .fetchMultipartMessages({
        roomId: e.target.id
      })
      .then(messages => {
        // console.log;
        this.setState({
          messages: messages
        });
      })
      .catch(err => {
        console.log(`Error fetching messages: ${err}`);
      });

      
    // currentUser.subscribeToRoomMultipart({
    //   roomId: this.state.currentRoom,

    //   hooks: {
    //     onMessage: message => {
    //       let oldMessages = this.state.messages;
    //       oldMessages.push(message);
    //       // console.log(currentUser.);
    //       this.setState({
    //         messages: oldMessages,
    //         usersInRoom: currentUser.users.length
    //       });
    //     },
    //     onPresenceChanged: (state, user) => {
    //       if (user.name === chatManager.userId) {
    //         console.log(`User ${user.name} is ${state.current}`);
    //         this.setState({ usersAreActive: state.current });
    //       }
    //     }
    //   },
    //   messageLimit: 20
    // });
  };

  render() {
    return (
      <div>
        <h1>
          Room {this.state.currentRoom} ({this.state.usersInRoom} users)
        </h1>

        {this.state.test.map(status => {
          console.log(status)
          return (
            <div>
              <button>{status}</button>
            </div>
          )
        })}
        {this.state.rooms.map(room => {
          return (
            <button key={room.id} id={room.id} onClick={this.roomChange}>
              {room.name}
            </button>
          );
        })}
        <button onClick={this.createRoom}>New Room</button>
        <form action="">
          <input type="text" onChange={this.handleChange} />
          <input type="submit" onClick={this.send} />
        </form>
        <div className="MessagesContainer">
          {this.state.messages.map(message => {
            return (
              <Message
                user={this.state.user.id}
                sender={message.senderId}
                body={message.parts[0].payload.content}
                date={message.createdAt}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Room;
