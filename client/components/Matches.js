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
  }

  componentDidMount(){
    axios.get(`/api/matches/${this.state.userId}`)
      .then(data => {
        this.setState({matches: data.data});
        console.log('MATCHES', this.state.matches);
      })
      .catch(err => {
        console.log(err);
      })
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