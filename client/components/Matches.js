import React from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import MatchesResults from './MatchesResults'

export default class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authId: localStorage.idTokenPayload,
      matches: [],
      userId: null
    }
  }

  componentDidMount(){
    axios.get(`/api/user/${this.state.authId}`)
      .then(({ data }) => {
        this.setState({ userId: data.id })
        axios.get(`/api/matches/${data.id}`)
          .then(data => {
            this.setState({matches: data.data});
            console.log('MATCHES', this.state.matches);
          })
          .catch(err => {
            console.log(err);
          })
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
    console.log(Map)
    return (
      <div className="intro-message">
        <NavBar />
        <MatchesResults matches={this.state.matches} history={this.props.history} userId={this.state.userId} />
      </div>
    );
  }
}

