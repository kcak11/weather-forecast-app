import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();

    // We need to go and fetch weather data
    this.props.fetchWeather(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return (
		<div>
			<div className="text-center" style={{"padding":"10px"}}>
				Weather Forcast Application ( powered by <a href="http://www.ashishkumarkc.com" target="_blank">Ashish&#39;s Web</a> )
			</div>
		  <form onSubmit={this.onFormSubmit} className="input-group">
			<input
			  placeholder="Get a five-day forecast for your favourite cities"
			  className="form-control"
			  value={this.state.term}
			  onChange={this.onInputChange} />
			<span className="input-group-btn">
			  <button type="submit" className="btn btn-secondary">Submit</button>
			</span>
		  </form>
	  </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
