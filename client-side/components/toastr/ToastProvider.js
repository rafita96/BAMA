import React, { useEffect, useState } from 'react';
import Toast from './Toast';

export const ToastContext = React.createContext(null);

export class ToastProvider extends React.Component {
	
	constructor(props){
		super(props);

		this.addToast = this.addToast.bind(this);
		this.state = {
			stack: []
		}
	}

	addToast(content, options={}){

		let newStack = this.state.stack;
		newStack.push({content, options});

		let that = this;
		setTimeout(function(){
			let stack = that.state.stack;
			stack.shift();

			that.setState({
				stack: stack
			});
		}, 3000);

		this.setState({
			stack: newStack
		});
	}

	render() {
	    return (
	        <ToastContext.Provider value={{addToast: this.addToast}}>
	            {this.props.children}
	        	<Toast stack={this.state.stack} />
	        </ToastContext.Provider>
	    )
	 }

}