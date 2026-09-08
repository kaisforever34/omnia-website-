import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("OmniaGlow ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            fontFamily: "Mulish, sans-serif",
            color: "#211D18",
            background: "#F4EFE6",
            minHeight: "100vh",
          }}
        >
          <h1 style={{ fontFamily: "Italiana, serif", fontSize: "2rem" }}>
            Something went wrong
          </h1>
          <pre
            style={{
              background: "#fff",
              padding: "1rem",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "0.85rem",
              marginTop: "1rem",
            }}
          >
            {this.state.error?.message || "Unknown error"}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
