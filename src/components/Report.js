import React from 'react';
import {Grid, Cell} from 'react-mdl';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import AppStore from '../stores/AppStore';

export default class Reports extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			reports: AppStore._getAllPlans() || []
		}
		this._appStoreChange = this._appStoreChange.bind(this);
	}

	componentWillMount(){
		AppStore.on('change', this._appStoreChange);
	}

	componentWillUnmount(){
		AppStore.removeListener('change', this._appStoreChange);
	}

	_appStoreChange(type){
		if(type === "PLANS_ADDED"){
			this.setState({reports: AppStore._getAllPlans()})
		}
	}

	_displayReports(){
		let reports = JSON.parse(this.state.reports);
		return reports.map((el, i) => {
			return (
				<Cell col={6} key={`${el.name}-${el.value}-${i}`} >
					<Card>
						<CardHeader
					      title={el.name}
					      actAsExpander={true}
					      showExpandableButton={true}
					    />
					    <CardText expandable={true}>
					    	<Grid>
					    		<Cell col={6} style={{fontSize: 16}}>
							    	<div>
							    		<span style={{fontWeight: 'bold'}}>Name: </span>
							    		<span style={{fontStyle: 'italic'}}>{el.name}</span>
							    	</div>
							    	<div>
							    		<span style={{fontWeight: 'bold'}}>Start Date: </span>
							    		<span style={{fontStyle: 'italic'}}>{el.startDate}</span>
							    	</div>
							    	<div>
							    		<span style={{fontWeight: 'bold'}}>End Date: </span>
							    		<span style={{fontStyle: 'italic'}}>{el.endDate}</span>
							    	</div>
					    		</Cell>
					    		<Cell col={6} style={{textAlign: 'center'}} className="center-container"> 
					    			<div className={`c100 p${el.value} absolute-center`}>
									  <span>{`${el.value}%`}</span>
									  <div className="slice">
									    <div className="bar"></div>
									    <div className="fill"></div>
									  </div>
									</div>
					    		</Cell>
					    	</Grid>
					    </CardText>
					</Card>
				</Cell>
			);
		})
	}

	render(){
		return(
			<div style={{width: '100%'}}>
				<Grid>
					{this._displayReports()}					
				</Grid>
			</div>
		);
	}
}