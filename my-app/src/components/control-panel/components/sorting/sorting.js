import { connect } from 'react-redux';
import { Button } from '../../../button/button';
import { ACTION_TYPE } from '../../../../actions';

import { Component } from 'react';

export class ContainerSorting extends Component {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
	}

	onChange({ target }) {
		this.props.dispatch({
			type: ACTION_TYPE.SET_IS_ALPHABET_SORTING,
			payload: target.checked,
		});
	}

	render() {
		return (
			<Button>
				<input
					className="hidden"
					id="sorting-button"
					type="checkbox"
					checked={this.props.isAlphabetSorting}
					onChange={this.onChange}
				/>
				<label
					className="flex -inset-x-4 -inset-y-4 justify-center items-center absolute rounded checked:p-1 checked:shadow-sm"
					htmlFor="sorting-button"
				>
					A&darr;
				</label>
			</Button>
		);
	}
}

const mapStateToProps = (state) => ({
	isAlphabetSorting: state.options.isAlphabetSorting,
});
export const ClassSorting = connect(mapStateToProps)(ContainerSorting);
