import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, []);

    const applyTheme = (newTheme) => {
        const html = document.documentElement;
        const body = document.body;
        
        if (newTheme === 'dark') {
            html.classList.add('dark');
            html.style.backgroundColor = '#111827';
            html.style.color = 'white';
            body.style.backgroundColor = '#111827';
            body.style.color = 'white';
        } else {
            html.classList.remove('dark');
            html.style.backgroundColor = '#ffffff';
            html.style.color = '#000000';
            body.style.backgroundColor = '#ffffff';
            body.style.color = '#000000';
            // Also set root div
            const root = document.getElementById('root');
            if (root) {
                root.style.backgroundColor = '#ffffff';
                root.style.color = '#000000';
            }
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
        console.log('Theme changed to:', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};