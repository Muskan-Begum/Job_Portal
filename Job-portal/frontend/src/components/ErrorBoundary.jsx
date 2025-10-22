import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        
        // Log error to monitoring service
        console.error('Error Boundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader className="text-center">
                            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                            </div>
                            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                                Oops! Something went wrong
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <p className="text-gray-600 dark:text-gray-300">
                                We encountered an unexpected error. Don't worry, our team has been notified.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button
                                    onClick={() => window.location.reload()}
                                    className="flex items-center gap-2"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                    Try Again
                                </Button>
                                
                                <Button
                                    variant="outline"
                                    onClick={() => window.location.href = '/'}
                                    className="flex items-center gap-2"
                                >
                                    <Home className="h-4 w-4" />
                                    Go Home
                                </Button>
                            </div>
                            
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <details className="mt-4 text-left">
                                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                                        Error Details (Development)
                                    </summary>
                                    <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono overflow-auto">
                                        <div className="text-red-600 dark:text-red-400 font-semibold">
                                            {this.state.error.toString()}
                                        </div>
                                        <div className="mt-2 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                                            {this.state.errorInfo.componentStack}
                                        </div>
                                    </div>
                                </details>
                            )}
                        </CardContent>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;