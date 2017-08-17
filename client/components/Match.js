import React from 'react';
import axios from 'axios';
import history from '../history';
import { Redirect } from 'react-router-dom';

export default class Match extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id: 0,
			firstname: '',
			age: 25,
			profilepic: '',
			own_id: localStorage.idTokenPayload,
			userId: null,
			matched: false,
			latitude: null,
			longitude: null
		}
		this.addMatch = this.addMatch.bind(this);
		this.isMatched = this.isMatched.bind(this);
	}

	componentDidMount(){
		axios.get(`api/matches/percent/${this.props.match.subject_id}`)
			.then(({ data }) => {
				this.setState({
					id: data.id,
					firstname: data.firstname,
					age: data.age,
					profilepic: data.profilepic,
					latitude: data.latitude,
					longitude: data.longitude
				})
			})
			.then(() => {
				axios.get(`api/user/${this.state.own_id}`)
					.then(({ data }) => {
						this.setState({userId: data.id})
						axios.get(`api/match/${this.state.id}/${data.id}`)
							.then(({ data }) => this.setState({matched: data}))
							.catch(err => console.error(err))
					})
					.catch(err => console.error(err))
			})
			.catch(err => console.err(err))
	}
	
	isMatched() {
		if (this.state.matched) {
			return <button className="btn-primary">Connected!</button>
		} else {
			return <button className="btn-primary" onClick={this.addMatch}>Connect</button>
		}
	}

	addMatch() {
		console.log(this.state);
		axios.post(`api/match/${this.state.id}/${this.state.userId}`)
		.then(response => {
			console.log('Connection added');
			this.setState({
				matched: true
			})
		})
		.catch(err => console.error(err))
	}

	render(){
		console.log('This is the props in Match: ', this.props);
		return (
			<div className="col-sm-4 text-center match" onClick={this.renderProfile}>
				<h2>{this.state.firstname}, {this.state.age}</h2>
				<h2>Latitude: {this.state.latitude}, Longitude: {this.state.longitude}</h2>
				<a href={`/${this.state.id}`}><img src={this.state.profilepic} className="match-pic"/></a>
				<h3>{Math.round(100 * this.props.match.confidence + 10)}% Match</h3>
				{this.isMatched()}
			</div>
		);
	}
}