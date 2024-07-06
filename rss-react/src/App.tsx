import React, { Component } from 'react';
import Search from './Search';
import ResultsList from './ResultsList';
import ErrorBoundary from './ErrorBoundary';
import axios from 'axios';
import qs from 'qs';

interface IState {
  searchTerm: string;
  searchResults: any[]; // replace with your results type
}

class App extends Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: []
    };
  }

  setSearchTerm = (term: string) => {
    this.setState({ searchTerm: term }, () => this.fetchData(term));
  }

  // lifecycle method to fetch data
  componentDidMount() {
    this.fetchData();
  }

  fetchData = (searchTerm = ''): void => {
    // Define base url
    const baseUrl = 'https://stapi.co/api/v1/rest';
  
    // We are going to apply the search term to the "name" field
    const data = { name: searchTerm };
  
    const encodedData = qs.stringify(data);

    axios.post(`${baseUrl}/animal/search`, encodedData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        pageNumber: 0,
        pageSize: 10
      }
    })
    .then(res => {
      if(Array.isArray(res.data.animals)) {
        this.setState({ searchResults: res.data.animals });
      } else {
        console.error('Server response does not contain an animals array.')
      }
    })
    .catch(err => {
      // Here you can handle request errors
      console.error(err);
    });
  }

  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <Search setSearchTerm={this.setSearchTerm} searchTerm={this.state.searchTerm} />
          <ResultsList searchResults={this.state.searchResults} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;