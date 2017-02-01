import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Grid, Cell} from 'react-mdl';

import PlanDetails from './PlanDetails';
import Report from './Report';

export default class Container extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value: 'plan',
		}
	}

	handleChange = (value) => {
		this.setState({
			value: value,
		});
	};

	render(){
		return(
			<Grid>
				<Cell col={12} style={{textAlign: 'center'}}>
					<h3>Lift off Assignment</h3>
				</Cell>
				<Cell col={12}>
					<Tabs
						value={this.state.value}
		        		onChange={this.handleChange}
					>
						<Tab label="New Plan Details" value="plan">
							<PlanDetails />
						</Tab>
						<Tab label="Report" value="report" >
							<Report />
						</Tab>
					</Tabs>
				</Cell>
			</Grid>
		);
	}
}