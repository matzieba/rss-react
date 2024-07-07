import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
    console.log('ErrorBoundary constructed');
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    console.log('getDerivedStateFromError called');
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      console.log('Rendering fallback UI');
      return (
        <p>
          There was a problem displaying this content.
          <button onClick={() => window.location.reload()}>Try again</button>
        </p>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
