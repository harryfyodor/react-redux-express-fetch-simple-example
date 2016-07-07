import React from 'react'
import { addItem, postAddItem, fetchList } from '../actions/index.js'

class InputItem extends React.Component {
    constructor(props) {
      super(props)
      this.displayName = 'inputItem'
      this.state = {
      	text: ""
      }
    }
    componentDidMount() {
      this.props.dispatch(fetchList());
    }
    componetWillReceiveProps(nextProps) {
      this.props.dispatch(fetchList());
    }
    renderList(items = []) {
      if (items.length == 0 || items == undefined) {
        return <div>Loading...</div>
      } else {
        return (
        <ul>
          {items.map((item, i) => 
            <li key={i}>{item}</li>
          )}
        </ul>
        )
      }
    }
    onClickHandler(e) {
    	this.props.dispatch(postAddItem(this.state.text))
      //this.props.dispatch(addItem(this.state.text))
      this.setState({ text: "" })
    }
    onChangeHandler(e) {
    	this.setState({ text: this.refs.inputText.value })
    }
    render() {
        let items = this.props.items
        return (
        <div>
        	<input ref="inputText"
        			   value={ this.state.text }
        			   onChange={ this.onChangeHandler.bind(this) } />
        	<button onClick={ this.onClickHandler.bind(this) }>
        		Send to server
        	</button>
        	{this.renderList(items)}
        </div>
        );
    }
}

export default InputItem;
