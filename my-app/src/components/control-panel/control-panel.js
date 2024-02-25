import { connect } from 'react-redux';
import { Button } from '../button/button';
import { ClassSearch, ClassSorting } from './components';
import { ACTION_TYPE } from '../../actions';
import { NEW_TODO_ID } from '../../constants';
import { Component } from 'react';

export class ContainerControlPanel extends Component {
	constructor() {
		super();
		this.onTodoAdd = this.onTodoAdd.bind(this);
	}

	onTodoAdd() {
		this.props.dispatch({
			type: ACTION_TYPE.ADD_TODO,
			payload: {
				id: NEW_TODO_ID,
				title: '',
				completed: false,
			},
		});

		this.props.dispatch({
			type: ACTION_TYPE.EDIT_TODO,
			payload: {
				id: NEW_TODO_ID,
				title: '',
			},
		});
	}

	render() {
		return (
			<div className="flex h-px-25 border-b-2 border-black border-solid p-1">
				<ClassSearch />
				<ClassSorting />
				<Button onClick={this.onTodoAdd}>✚</Button>
			</div>
		);
	}
}
export const ClassControlPanel = connect()(ContainerControlPanel);
