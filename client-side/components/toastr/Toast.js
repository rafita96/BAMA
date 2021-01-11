import React from 'react';
import styles from './styles.module.css'

class Toast extends React.Component{
	render(){
		let content = [];

		for (var i = 0; i < this.props.stack.length; i++) {
			let toast = (
				<div key={i} className={styles.container}>
					{this.props.stack[i].content}
				</div>
			);
			content.push(toast);
		}

		return(
			<div>
				{content}
			</div>
		);
	}
}

export default Toast;
