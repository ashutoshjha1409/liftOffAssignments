import React from 'react';
import {Grid, Cell} from 'react-mdl';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Moment from 'moment';

import dispatcher from "../dispatchers/dispatcher";

import AppStore from '../stores/AppStore';

export default class PlanDetails extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			value: '',
			startDate: Moment().subtract(1, 'days').toDate(),
			endDate: Moment().toDate(),
			valueErr: '',
			nameErr: '',
			addBtnDisabled: false
		}
		this._handleFieldChange = this._handleFieldChange.bind(this);
		this._addNewPlan = this._addNewPlan.bind(this);
		this._appStoreChange = this._appStoreChange.bind(this);
	}

	_handleFieldChange(field, event, value){
		let obj = {}
		
		if(field === 'value' && !isNaN(value)){
			if (value > 0 && value <= 100){
				obj["value"] = parseInt(value, 10);
				obj["valueErr"] = '';
			} else {
				obj["value"] = '';
				obj["valueErr"] = 'Value should be between 1-100';
			}
		} else if( field === 'name') {
			if(value){
				obj["name"] = value;
				obj["nameErr"] = '';
			}
			else{
				obj["name"] = '';
				obj["nameErr"] = "Please enter a name"
			}
		} else if(field === "start"){
			obj["startDate"] = value;
		} else if(field === "end"){
			obj["endDate"] = value;
		}
		
		this.setState(obj);
	}

	componentWillMount(){
		AppStore.on('change', this._appStoreChange);
	}

	componentWillUnmount(){
		AppStore.removeListener('change', this._appStoreChange);
	}

	_appStoreChange(type){
		if(type === "PLANS_ADDED"){
			this.setState({
				name: '',
				value: '',
				addBtnDisabled: !this.state.addBtnDisabled,
			})
		}
	}

	_addNewPlan(){
		let {name, value, startDate, endDate} = this.state;
		let obj = {
			name: name,
			value: value,
			startDate: Moment(startDate).format("DD-MM-YYYY"),
			endDate: Moment(endDate).format("DD-MM-YYYY")
		}

		if(!name){
			this.setState({nameErr: 'Please enter name'})
			return;
		}

		if(!value){
			this.setState({valueErr: 'Please enter value'})
			return;
		}

		dispatcher.dispatch({ type: 'UPDATE_PLANS', plan: obj});	
		this.setState({
			addBtnDisabled: true
		})	
	}

	render(){
		let {name, value, valueErr, nameErr, startDate, endDate} = this.state;
		
		return (
			<div style={{padding: 20, width: '50%', margin: '0 auto'}}>
				<Grid>
					<Cell col={6}>
						<TextField
						  value={name}
					      hintText="Enter a Name"
					      floatingLabelText="Name"
					      errorText={nameErr}
					      onChange={this._handleFieldChange.bind(this, "name")}
					    />
					</Cell>
					<Cell col={6}>
					    <TextField
					      value={value}
					      hintText="Enter a value (1-100)"
					      floatingLabelText="Value"
					      errorText={valueErr}
					      onChange={this._handleFieldChange.bind(this, "value")}
					    />
					</Cell>
					<Cell col={6}>
					    <DatePicker 
					    	value={startDate}
					     	hintText="Start Date" 
					     	mode="landscape" 
					     	autoOk={true}
					     	onChange={this._handleFieldChange.bind(this, "start")}
					    />
					</Cell>
					<Cell col={6}>
					    <DatePicker 
					    	value={endDate}
					     	hintText="End Date" 
					     	mode="landscape" 
					     	autoOk={true}
					     	minDate={startDate ? Moment(startDate).add(1, 'days').toDate() : new Date("01-01-1970")}
					     	onChange={this._handleFieldChange.bind(this, "end")}
					    />
					</Cell>
					<Cell col={12} style={{textAlign: 'center'}}>
						 <RaisedButton label="Add Plan" primary={true} style={{margin: 12}} onTouchTap={this._addNewPlan}/>
					</Cell>
				</Grid>
			</div>
		);
	}
}