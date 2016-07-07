import React from 'react';
import InputItem from './InputItem.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/index.js';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'App'
    }

    render() {
       return (
       	<div>
       		<InputItem items={this.props.items} 
       						 	 {...this.props} />
       	</div>
       );
    }
}

// fffffffuuuuuucccccckkkkkkkkkk
const mapStateToProps = (state) => {
  return {
  	items: [ ...state.Item ]
  }
}
/*
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
*/
export default connect(
  mapStateToProps//,
//  mapDispatchToProps
)(App);

