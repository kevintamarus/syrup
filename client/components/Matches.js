import React from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import MatchesResults from './MatchesResults'
import GEO_API_KEY from '../../config/config'

export default class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.idTokenPayload,
      matches: []
    }
    this.testing = this.testing.bind(this);
  }

  componentDidMount(){
    this.testing();
    axios.get(`/api/matches/${this.state.userId}`)
      .then(data => {
        this.setState({matches: data.data});
        console.log('MATCHES', this.state.matches);
      })
      .catch(err => {
        console.log(err);
      })

    //socket emit to set state of newMatches to false
  }

  testing() {
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GEO_API_KEY}`)
    .then(response => {
      console.log(response.data.location)
    })
    .catch(err => { if (err) {return console.error(err)} })
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