"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center mb-4">
            <Icon icon="mdi:alert-circle" className="text-3xl text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-red-600 dark:text-red-400 text-center mb-4 max-w-md">
            {this.state.error?.message || "An unexpected error occurred while loading this section."}
          </p>
          <Button
            color="danger"
            variant="flat"
            startContent={<Icon icon="mdi:refresh" />}
            onPress={this.handleReset}
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
