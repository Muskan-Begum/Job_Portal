import { useEffect, useRef } from 'react';

export const usePerformance = (componentName) => {
    const startTime = useRef(Date.now());
    const renderCount = useRef(0);

    useEffect(() => {
        renderCount.current += 1;
        const endTime = Date.now();
        const renderTime = endTime - startTime.current;

        // Log performance metrics
        if (process.env.NODE_ENV === 'development') {
            console.log(`🚀 Performance Metrics for ${componentName}:`, {
                renderTime: `${renderTime}ms`,
                renderCount: renderCount.current,
                timestamp: new Date().toISOString()
            });
        }

        // Send to analytics in production
        if (process.env.NODE_ENV === 'production' && renderTime > 100) {
            // Analytics service call would go here
            console.warn(`Slow render detected in ${componentName}: ${renderTime}ms`);
        }
    });

    return {
        renderCount: renderCount.current,
        startTime: startTime.current
    };
};

export const usePageLoad = (pageName) => {
    useEffect(() => {
        const startTime = performance.now();
        
        const handleLoad = () => {
            const loadTime = performance.now() - startTime;
            
            if (process.env.NODE_ENV === 'development') {
                console.log(`📊 Page Load Metrics for ${pageName}:`, {
                    loadTime: `${loadTime.toFixed(2)}ms`,
                    timestamp: new Date().toISOString()
                });
            }
        };

        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, [pageName]);
};

export const useApiPerformance = () => {
    const trackApiCall = (endpoint, startTime, endTime, success = true) => {
        const duration = endTime - startTime;
        
        if (process.env.NODE_ENV === 'development') {
            console.log(`🌐 API Performance:`, {
                endpoint,
                duration: `${duration}ms`,
                success,
                timestamp: new Date().toISOString()
            });
        }

        // Track slow API calls
        if (duration > 2000) {
            console.warn(`Slow API call detected: ${endpoint} took ${duration}ms`);
        }
    };

    return { trackApiCall };
};