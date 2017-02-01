import {EventEmitter} from "events";
import dispatcher from "../dispatchers/dispatcher";

class AppStores extends EventEmitter{
	constructor(){
		super();
		this.plans = []
	}

	_updatePlans(newObj){
		let plans = JSON.parse(localStorage.getItem('plans') || '[]');

		plans.push(newObj);
		localStorage.setItem('plans', JSON.stringify(plans));
		
		this.emit('change', 'PLANS_ADDED')
	}

	_getAllPlans(){
		return JSON.parse(localStorage.getItem('plans'));
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