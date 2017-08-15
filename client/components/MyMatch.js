import React from 'react';
import axios from 'axios';
import history from '../history';
import { Redirect } from 'react-router-dom';

export default class MyMatch extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id: this.props.match.matcheeId,
			firstname: '',
			age: 25,
			profilepic: '',
			own_id: localStorage.idTokenPayload,
			matched: false
		}
	}

	componentDidMount(){
		axios.get(`/api/profile/${this.state.id}`)
			.then(data => {
				console.log('PROFILE INFO: ', data.data);
				this.setState({
					firstname: data.data.firstname,
					age: data.data.age,
					profilepic: data.data.profilepic
				})
			})
	}


	render(){
		return (
			<div className="col-sm-4 text-center match" onClick={this.renderProfile}>
				<h2>{this.state.firstname}, {this.state.age}</h2>
				<a href={`/${this.state.id}`}><img src={this.state.profilepic} className="match-pic"/></a>
			</div>
		);
	}
}
