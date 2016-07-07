import { combineReducers } from 'redux'

const Item = (state = [], action) => {
	switch(action.type) {
		case "ADD_ITEM":
			return [
				...state,
				action.text
			]
		case "REQUEST_LIST":
			console.log("loading...")
			return [
				...state
			]
		case "RECEIVE_LIST":
			return [
				...action.list
			]
		default:
			return [
				...state
			]
	}
}

const rootReducer = combineReducers({
	Item
})

export default rootReducer;

