import React, { Component } from 'react';

interface IProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface IState {
  term: string;
}

class Search extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      term: ''
    };
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.setState({ term: this.props.searchTerm });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ term: event.target.value });
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.setSearchTerm(this.state.term);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.term}
          onChange={this.handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;