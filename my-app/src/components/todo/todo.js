import { connect } from 'react-redux';
import { Button } from '../button/button';

import {
	ACTION_TYPE,
	createTodosAsync,
	deleteTodoAsync,
	updateTodoAsync,
} from '../../actions';
import { KEYBOARD, NEW_TODO_ID } from '../../constants';
import { Component } from 'react';

export class ContainerTodo extends Component {
	constructor(props) {
		super(props);
		this.id = props.id;
		this.title = props.title;
		this.completed = props.completed;
		this.onCompletedChange = this.onCompletedChange.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onNewTodoSave = this.onNewTodoSave.bind(this);
		this.onEditingTodoSave = this.onEditingTodoSave.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onTitleKeyDown = this.onTitleKeyDown.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onRemove = this.onRemove.bind(this);
	}

	onCompletedChange({ target: { checked } }) {
		this.props.dispatch(updateTodoAsync({ id: this.id, completed: checked }));
	}
	onTitleChange({ target }) {
		this.props.dispatch({
			type: ACTION_TYPE.EDIT_TODO,
			payload: { title: target.value },
		});
	}
	onNewTodoSave() {
		if (this.props.editingTodoTitle.trim() === '') {
			this.props.dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: this.id });

			return;
		}

		this.props.dispatch(
			createTodosAsync({
				title: this.props.editingTodoTitle,
				completed: this.completed,
			}),
		);
	}
	onEditingTodoSave() {
		if (this.props.editingTodoTitle.trim() === '') {
			this.onRemove();
			return;
		}

		this.props
			.dispatch(
				updateTodoAsync({ id: this.id, title: this.props.editingTodoTitle }),
			)
			.then(() => {
				this.props.dispatch({
					type: ACTION_TYPE.EDIT_TODO,
					payload: { id: null },
				});
			});
	}

	onSave() {
		if (this.id === NEW_TODO_ID) {
			this.onNewTodoSave();
		} else {
			this.onEditingTodoSave();
		}
	}

	onTitleKeyDown({ key }) {
		if (key === KEYBOARD.ENTER) {
			this.onSave();
		} else if (key === KEYBOARD.ESCAPE) {
			this.props.dispatch({ type: ACTION_TYPE.EDIT_TODO, payload: { id: null } });

			if (this.id === NEW_TODO_ID) {
				this.props.dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: this.id });
			}
		}
	}
	onEdit() {
		this.props.dispatch({
			type: ACTION_TYPE.EDIT_TODO,
			payload: { id: this.id, title: this.title },
		});

		if (this.id !== NEW_TODO_ID) {
			this.props.dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: NEW_TODO_ID });
		}
	}
	onRemove() {
		this.props.dispatch(deleteTodoAsync(this.id));
	}

	render() {
		return (
			<div className="flex p-3 border-solid border-b-2">
				<input
					className="w-5 h-5 mt-0 mr-2 mb-0 ml-0"
					type="checkbox"
					disabled={this.isEditing || this.props.isLoading}
					checked={this.props.completed}
					onChange={this.onCompletedChange}
				/>
				<div className="w-full mr-2">
					{this.props.editingTodoId === this.id ? (
						<input
							className="w-full"
							type="text"
							autoFocus={true}
							disabled={this.props.isLoading}
							value={this.props.editingTodoTitle}
							onChange={this.onTitleChange}
							onKeyDown={this.onTitleKeyDown}
						/>
					) : (
						<div onClick={this.onEdit}>{this.props.title}</div>
					)}
				</div>
				<div>
					{this.props.editingTodoId === this.id ? (
						<Button onClick={this.onSave}>✎</Button>
					) : (
						<Button onClick={this.onRemove}>✖</Button>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	editingTodoId: state.editingTodo.id,
	editingTodoTitle: state.editingTodo.title,
	isLoading: state.options.isLoading,
});

export const Todo = connect(mapStateToProps)(ContainerTodo);
