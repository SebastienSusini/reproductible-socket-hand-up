/* eslint-disable no-console */
import React from 'react';

import Image from 'next/image';
import Router from 'next/router';
import { log } from 'next-axiom';

import { ArrowSmLeftIcon } from '@heroicons/react/outline';

import Button from '../buttons/Button';

import Container from './Container';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }

  static componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can use your own error logging service here
    log.error('ErrorBoudary component:', { error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      return (
        <div style={{ height: 'calc(100vh - 84px)' }} className="flex items-center justify-center">
          <Container>
            <div className="flex w-full items-center justify-between">
              <div className="space-y-6">
                <h2 className="text-dark xxs:text-4xl md:text-5xl">Sorry, something went wrong!</h2>
                <p>If the problem persists, do not hesitate to contact us via discord or chat.</p>

                <div className="flex flex-wrap items-center gap-6">
                  <Button as="button" styleType="secondary" onClick={Router.back}>
                    <ArrowSmLeftIcon className="h-5 w-5" />
                    Go back
                  </Button>
                  <Button
                    as="button"
                    styleType="primary"
                    type="button"
                    onClick={() => this.setState({ hasError: false })}
                  >
                    Try again
                  </Button>
                </div>
              </div>


            </div>
          </Container>
        </div>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
