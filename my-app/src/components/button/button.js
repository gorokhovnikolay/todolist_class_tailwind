import { Component } from 'react';

export class Button extends Component {
	render() {
		return (
			<button
				className="relative w-7 h-7 text-center flex justify-center items-center ml-2"
				onClick={this.props.onClick}
			>
				{this.props.children}
			</button>
		);
	}
}
