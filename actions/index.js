import fetch from 'isomorphic-fetch'

const loadAddItem = (text) => {
	return {
		type: "LOAD_ADD_ITEM",
		text
	}
}

export const addItem = (text) => {
	return {
		type: "ADD_ITEM",
		text
	}
}

export const postAddItem = (text) => {
	return dispatch => {
		dispatch({type: "loadAddItem", text})
		fetch('/send', {
			method: 'POST',
			headers: {
				'Content-Type': "application/json",
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			body: JSON.stringify({ item: text })
		}).then(res => {
			if(res.ok) {
				dispatch({ type: "ADD_ITEM", text })
				console.log("POST SUCCESS");
			} 
		}, e => {
			dispatch({type: "loadAddItem", text})
			alert("POST ERROR");
		})
	}
}

const requestList = () => {
	return {
		type: "REQUEST_LIST"
	}
}

const receiveList = (list) => {
	return {
		type: "RECEIVE_LIST",
		list
	}
}

export const fetchList = () => {
	return dispatch => {
		dispatch({ type:"REQUEST_LIST" })
		return fetch(`/list`, {
			header: {
				"dataType": "json"
			}
		})
			.then(response => {
				return response.json()
			})
			.then(json => {
				dispatch(receiveList(json.items))
			}
		)
	}
}