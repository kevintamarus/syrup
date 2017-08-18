import React from 'react';
import Match from './Match';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export default class MatchesUploadSection extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="content-section-a">
		        <div className="container">
		            <div className="row">
		                <div className="col-lg-5 col-sm-6">
		                    <hr className="section-heading-spacer"/>
		                    <div className="clearfix"></div>
		                </div>
		            </div>
		            	<div className="row">
		            		{this.props.matches.map((match, i) => 
		            			(<Match 			
								containerElement={
          <div style={{ height: `200px` }} />
        }
        mapElement={
          <div style={{ height: `200px` }} />
        } 
		match={match} history={this.props.history} key={i}/>)
		            		)}
		            	</div>
		        </div>
		    </div>
		);
	}
}