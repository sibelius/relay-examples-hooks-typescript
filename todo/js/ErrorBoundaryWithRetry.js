import React from 'react';

class ErrorBoundaryWithRetry extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error: error };
  }

  _retry = () => {
    this.setState({ error: null });
  };

  render() {
    const { children, fallback } = this.props;
    const { error } = this.state;

    if (error) {
      if (typeof fallback === 'function') {
        return fallback(error, this._retry);
      }
      return fallback;
    }
    return children;
  }
}

export default ErrorBoundaryWithRetry;
