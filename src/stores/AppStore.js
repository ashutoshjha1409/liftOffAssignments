import {EventEmitter} from "events";
import dispatcher from "../dispatchers/dispatcher";

class AppStores extends EventEmitter{
	constructor(){
		super();
		this.plans = []
	}

	_updatePlans(newObj){
		let plans = this._getAllPlans();
		plans = JSON.parse(plans)
		plans.push(newObj);
		localStorage.setItem('plans', JSON.stringify(plans));
		
		this.emit('change', 'PLANS_ADDED')
	}

	_getAllPlans(){
		return localStorage.getItem('plans', this.plans);
	}

	_handleActions(action){
		switch(action.type){
			case 'UPDATE_PLANS' : {
				this._updatePlans(action.plan);
				break;
			}
			default:{
				break;
			}			
		}
	}
}

const appStores = new AppStores();
dispatcher.register(appStores._handleActions.bind(appStores));
export default appStores;