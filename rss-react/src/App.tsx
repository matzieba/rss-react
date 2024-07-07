import React, { Component } from 'react';
import Search from './Search';
import ResultsList from './ResultsList';
import ErrorBoundary from './ErrorBoundary';
import axios from 'axios';
import qs from 'qs';

interface AppState {
  searchTerm: string;
  searchResults: Array<{ id: string; name: string; uid: string }>;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
    };
  }

  componentDidMount(): void {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm: savedTerm }, () => {
      this.fetchData(savedTerm);
    });
  }

  setSearchTerm = (term: string): void => {
    const trimmedTerm = term.trim();
    this.setState({ searchTerm: trimmedTerm }, () => {
      localStorage.setItem('searchTerm', trimmedTerm);
      this.fetchData(trimmedTerm);
    });
  };

  fetchData = async (searchTerm = ''): Promise<void> => {
    try {
      const baseUrl = 'https://stapi.co/api/v1/rest';
      const data = { name: searchTerm };
      const encodedData = qs.stringify(data);

      const response = await axios.post(
        `${baseUrl}/animal/search`,
        encodedData,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          params: { pageNumber: 0, pageSize: 10 },
        },
      );

      if (Array.isArray(response.data.animals)) {
        this.setState({ searchResults: response.data.animals });
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Fetch data error: ', error);
      this.setState({ searchResults: [] });
      throw error;
    }
  };

  render(): JSX.Element {
    return (
      <div className="App">
        <ErrorBoundary>
          <Search
            setSearchTerm={this.setSearchTerm}
            searchTerm={this.state.searchTerm}
          />
          <ResultsList searchResults={this.state.searchResults} />
          <ChildTestComponent />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;

interface IssuesRaisedState {
  raiseError: boolean;
}

class ChildTestComponent extends React.Component<object, IssuesRaisedState> {
  constructor(props: object) {
    super(props);
    this.state = {
      raiseError: false,
    };
  }

  raiseAnError = (): void => {
    this.setState({
      raiseError: true,
    });
  };

  render(): JSX.Element | never {
    if (this.state.raiseError) {
      throw new Error('This is an error from ChildTestComponent');
    }

    return <button onClick={this.raiseAnError}>Throw an Error</button>;
  }
}
