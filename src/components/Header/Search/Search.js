import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: ''
    }
  }

  handleChange(val) {
    this.setState({
      searchInput: val
    })
  }

  render() {
    console.log(this.state.searchInput)

    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input
            onChange={e => this.handleChange(e.target.value)}
            onKeyPress={e => e.key === 'Enter'
              ? this.props.search(this.state.searchInput) : null}
            placeholder="Search Your Feed"
            value={this.state.searchInput} />

          <SearchIcon id="Search__icon" />
        </div>
        
      </section>
    )
  }
}