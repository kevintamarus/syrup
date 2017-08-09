import React from 'react';
// import NavBar from './NavBar';
import ProfileHead from './ProfileHead';
import ProfilePhotos from './ProfilePhotos';
import axios from 'axios';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      firstname: '',
      profilepic: '',
      images: [],
      bio: '',
      gender: '',
      age: 0,
      matched: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios.post(`/api/match/${this.state.id}`)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => { if (err) {return console.error(err)} })
  }

  componentDidMount() {
    axios.get(`/api/profile/${this.state.id}`)
    .then(response => {
      
      var images = this.state.images;
      response.data.images.forEach(image => {
        images.push(image);
      })

      this.setState({
        firstname: response.data.firstname,
        profilepic: response.data.profilepic,
        images: images,
        bio: response.data.bio,
        gender: response.data.gender,
        age: response.data.age
      })
    })
    .catch(err => { if (err) { return console.error(err) } })
  }

  render() {
    return (
      <div className="intro-message">
        <div className="profilePage">
          <ProfileHead data={this.state} handleSubmit={this.handleSubmit} />        
          <ProfilePhotos images={this.state.images} />       
        </div>
      </div>
    );
  }
}