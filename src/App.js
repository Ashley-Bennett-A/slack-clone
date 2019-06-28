import React from "react";
import "./App.css";
import Room from "./Components/Room";
import Chatkit from "@pusher/chatkit-client";
import Login from "./Components/login";

class App extends React.Component {
  state = {
    rooms: [],
    user: null,
    currentRoom: null,
    manager: null,
    loggedIn: false,
    logInValue: "",
    logInFail: false
  };

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

  handleLogInChange = e => {
    this.setState({
      logInValue: e.target.value
    });
  };

  loggin = e => {
    // console.log(userID);
    e.preventDefault();
    this.setState({
      logInFail: false
    });
    const tokenProvider = new Chatkit.TokenProvider({
      url:
        "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e26280f8-acac-4da9-9e2a-80cd549547f8/token"
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:e26280f8-acac-4da9-9e2a-80cd549547f8",

      userId: this.state.logInValue,

      tokenProvider: tokenProvider
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({
          user: currentUser,
          rooms: currentUser.rooms,
          currentRoom: currentUser.rooms[0].id,
          manager: chatManager,
          logInFail: false
        });
        const createRoom = room => {
          return this.setState({
            loggedIn: true,
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
      .catch(err => {
        console.log(err);
        this.setState({
          logInFail: true
        });
      });
  };

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? (
          console.log("Logging in")
        ) : (
          <Login
            loggin={this.loggin}
            loginFail={this.state.logInFail}
            changeHandler={this.handleLogInChange}
          />
        )}
        {this.state.logInFail ? (
          <h1> No user by that ID.Try again. </h1>
        ) : (
          console.log("Successfully Logged in")
        )}
        <div className="roomList">
          {this.state.rooms.map(room => {
            return (
              <i
                className="roomNames"
                key={room.id}
                id={room.id}
                onClick={this.roomChange}
              >
                {room.name}
              </i>
            );
          })}
        </div>
        {this.state.room}
      </div>
    );
  }
}

export default App;
