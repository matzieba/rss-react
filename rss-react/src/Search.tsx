import React, { Component, ChangeEvent, FormEvent, ReactNode } from 'react';

interface SearchProps {
  setSearchTerm: (term: string) => void;
  searchTerm: string;
}

interface SearchState {
  term: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      term: props.searchTerm || '',
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ term: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.setSearchTerm(this.state.term.trim());
  };

  componentDidUpdate(prevProps: SearchProps): void {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.setState({ term: this.props.searchTerm });
    }
  }

  render(): ReactNode {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.term}
          onChange={this.handleInputChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;
