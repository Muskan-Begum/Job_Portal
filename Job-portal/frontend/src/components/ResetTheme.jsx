import { useEffect } from 'react';

const ResetTheme = () => {
    useEffect(() => {
        // Reset theme to light mode
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
        console.log('Theme reset to light mode');
    }, []);

    return null;
};

export default ResetTheme;