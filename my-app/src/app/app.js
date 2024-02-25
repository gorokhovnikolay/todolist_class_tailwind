import { Component } from 'react';
import { connect } from 'react-redux';
import { ClassControlPanel, Todo } from '../components';
import { readTodosAsync } from '../actions';

export class ContainerApp extends Component {
	componentDidMount() {
		this.props.dispatch(
			readTodosAsync(this.props.searchPhrase, this.props.isAlphabetSorting),
		);
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.isAlphabetSorting !== prevProps.isAlphabetSorting ||
			this.props.searchPhrase !== prevProps.searchPhrase
		) {
			this.props.dispatch(
				readTodosAsync(this.props.searchPhrase, this.props.isAlphabetSorting),
			);
		}
	}

	render() {
		return (
			<div className="w-1/3 mx-auto my-1 border-solid border-2">
				<ClassControlPanel />
				<div>
					{this.props.todos.map(({ id, title, completed }) => (
						<Todo key={id} id={id} title={title} completed={completed} />
					))}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	searchPhrase: state.options.searchPhrase,
	isAlphabetSorting: state.options.isAlphabetSorting,
	todos: state.todos,
});

export const ClassApp = connect(mapStateToProps)(ContainerApp);
