import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2 className="text-red-500 text-center">Something went wrong. Please refresh.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
