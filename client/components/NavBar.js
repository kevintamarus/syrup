import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from 'auth0-js';
import io from 'socket.io-client';

class NavBar extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.matchNotification = this.matchNotification.bind(this);
    this.messageNotification = this.messageNotification.bind(this);
    this.videoChatNotification = this.videoChatNotification.bind(this);
    this.matchViewed = this.matchViewed.bind(this);
    this.messageViewed = this.messageViewed.bind(this);
    this.videoChatViewed = this.videoChatViewed.bind(this);
    // this.testButtonOn = this.testButtonOn.bind(this);
    // this.testButtonOff = this.testButtonOff.bind(this);
    this.state = {
      newMatch: false,
      newMessage: false,
      newVideoChat: false,
      socket: null
    }
  }

  componentDidMount() {
    const socket = io();
    this.setState({socket: socket});
    socket.on('newMatch', this.matchNotification);
    socket.on('newMessage', this.messageNotification);
    socket.on('newVideoChat', this.videoChatNotification);
    //eventally change the bottom 3 to set state to false without going through the server
    socket.on('matchViewed', this.matchViewed);
    socket.on('messageViewed', this.messageViewed);
    socket.on('videoChatViewed', this.videoChatViewed);
  }

  // testButtonOn() {
  //   this.state.socket.emit('new-videochat', function(data) {
  //     console.log(data);
  //   })
  // }

  // testButtonOff() {
  //   this.state.socket.emit('videochat-viewed', function(data) {
  //     console.log(data);
  //   })
  // }

  matchNotification() {
    this.setState({newMatch: true});
  }

  messageNotification() {
    this.setState({newMessage: true});
  }

  videoChatNotification(data) {
    this.setState({newVideoChat: true});
  }

  matchViewed() {
    this.setState({newMatch: false});
  }

  messageViewed() {
    this.setState({newMessage: false});
  }

  videoChatViewed() {

    this.setState({newVideoChat: false});
  }

  logout(auth) {
    console.log('youre in logout')
    auth.logout();
  }

  handleChange(key){
    this.setState({[key] : !this.state[key]});
  }
  
  render() {
    console.log(this.state.newMatch, 'match state')
    console.log(this.state.newMessage, 'message state')
    console.log(this.state.newVideoChat, 'videochat state')
    return (
      <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
      <div className="container topnav">
          <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand topnav" to='/'><img id="brand-image" src="https://files.slack.com/files-pri/T2SV1LBC6-F6PA047N2/syrup_logo.png"/></Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              {/* <li><button onClick={this.testButtonOn}>Test Button On</button></li>
              <li><button onClick={this.testButtonOff}>Test Button Off</button></li> */}
              {this.state.newMatch ?
              <li className="new-match" ><img src="http://flyosity.com/images/_blogentries/networkicon/step1.png" height="15" width="15"/></li> 
              : null}
              <li><Link to='/matches'>Matches</Link></li>
              {this.state.newMessage ?
              <li className="new-message"><img src="http://flyosity.com/images/_blogentries/networkicon/step1.png" height="15" width="15"/></li>
              : null}
              <li><Link to='/messages'>Messages</Link></li>
              {this.state.newVideoChat ?
              <li className="new-videochat"><img src="http://flyosity.com/images/_blogentries/networkicon/step1.png" height="15" width="15"/></li>
              : null}
              <li><Link to='/videochat'>Video Chat</Link></li>
              <li><Link to='/upload'>Upload</Link></li>
              <li><Link to='/profile'>Profile</Link></li>
              <li><a onClick={() => this.logout(this.props.auth)} style={{cursor:'pointer'}}>Log Out</a></li>
            </ul>
          </div>
      </div>
  </nav>
    );
  }
}

export default NavBar;
