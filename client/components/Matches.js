import React from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import MatchesResults from './MatchesResults'

export default class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.idTokenPayload,
      matches: []
    }
    this.testing = this.testing.bind(this);
  }

  render() {
    return (
      <div className="intro-message">
        <NavBar />
        <MatchesResults matches={this.state.matches} history={this.props.history} />
      </div>
    );
  }
}