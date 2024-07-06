import React, { Component } from 'react';

interface IProps {
  searchResults: any[]; // replace with your results type
}

class ResultsList extends Component<IProps> {
    render() {
        return (
          <ul>
            {Array.isArray(this.props.searchResults) && this.props.searchResults.map(result => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        );
      }
    }

export default ResultsList;