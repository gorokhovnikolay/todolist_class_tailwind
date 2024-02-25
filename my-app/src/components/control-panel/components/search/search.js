import { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from './utils';
import { ACTION_TYPE } from '../../../../actions';

export class ContainerSearch extends Component {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.runSearch = this.runSearch.bind(this);
		this.debouncedRunSearch = debounce(this.runSearch, 1500);
	}
	runSearch(phrase) {
		this.props.dispatch({ type: ACTION_TYPE.SET_SEARCH_PHRASE, payload: phrase });
	}

	onSubmit(event) {
		event.preventDefault();
		this.runSearch(this.props.searchInput);
	}
	onChange({ target }) {
		this.props.dispatch({
			type: ACTION_TYPE.SET_SEARCH_INPUT,
			payload: target.value,
		});
		this.debouncedRunSearch(target.value);
	}

	render() {
		return (
			<form className="flex w-full" onSubmit={this.onSubmit}>
				<input
					className="w-full px-0 py-2"
					type="text"
					value={this.props.searchInput}
					placeholder="Поиск..."
					onChange={this.onChange}
				/>
			</form>
		);
	}
}
const mapStateToProps = (state) => ({
	searchInput: state.options.searchInput,
});

export const ClassSearch = connect(mapStateToProps)(ContainerSearch);
