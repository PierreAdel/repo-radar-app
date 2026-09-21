import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorFallback } from "@repo-radar/ui";
import { loadSentry } from "../instrumentation";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Repo Radar crashed:", error, info);
    void loadSentry().then((Sentry) =>
      Sentry.captureException(error, { extra: { componentStack: info.componentStack } }),
    );
  }

  private handleRetry = () => {
    this.setState({ error: null });
  };

  private handleReport = () => {
    const details = this.state.error
      ? `${this.state.error.name}: ${this.state.error.message}`
      : "Unknown error";
    void navigator.clipboard?.writeText(details);
  };

  render() {
    if (this.state.error) {
      return (
        <ErrorFallback
          onRetry={this.handleRetry}
          onReport={this.handleReport}
          details={this.state.error.message}
        />
      );
    }
    return this.props.children;
  }
}
