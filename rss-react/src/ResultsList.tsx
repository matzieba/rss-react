import React, { Component, ReactNode } from 'react';

interface Result {
  id: string;
  name: string;
  uid: string;
}

interface ResultsListProps {
  searchResults: Result[];
}

class ResultsList extends Component<ResultsListProps> {
  render(): ReactNode {
    const { searchResults } = this.props;
    return (
      <ul>
        {Array.isArray(searchResults) && searchResults.length > 0 ? (
          searchResults.map((result) => (
            <li key={result.id}>
              <h3>{result.name}</h3>
              <p>{result.uid}</p>
            </li>
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
    );
  }
}

export default ResultsList;
