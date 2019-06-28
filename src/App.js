import React from "react";
import "./App.css";
import Room from "./Components/Room";
import Chatkit from "@pusher/chatkit-client";

class App extends React.Component {
  state = {
    rooms: [],
    user: null,
    currentRoom: null,
    manager: null
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
        this.setState({
          user: currentUser,
          rooms: currentUser.rooms,
          currentRoom: currentUser.rooms[0].id,
          manager: chatManager
        });
        const createRoom = room => {
          return this.setState({
            room: (
              <Room
                room={room}
                manager={this.state.manager}
                user={this.state.user}
              />
            )
          });
        };
        createRoom(this.state.currentRoom);
      })
      .catch(err => console.log(err));
  }

  roomChange = e => {
    this.setState({
      room: null
    });
    let roomId = e.target.id;

    const newRoom = () => {
      return this.setState({
        room: (
          <Room
            room={roomId}
            manager={this.state.manager}
            user={this.state.user}
          />
        )
      });
    };
    setTimeout(newRoom, 100);
  };

  render() {
    return (
      <div className="App">
        {this.state.rooms.map(room => {
          return (
            <button key={room.id} id={room.id} onClick={this.roomChange}>
              {room.name}
            </button>
          );
        })}
        {/* <Room /> */}
        {this.state.room}
        {}
      </div>
    );
  }
}

export default App;
