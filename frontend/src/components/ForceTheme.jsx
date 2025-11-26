import { useState } from 'react';

const ForceTheme = () => {
    const [currentTheme, setCurrentTheme] = useState('light');

    const forceLight = () => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.backgroundColor = 'white';
        document.documentElement.style.color = 'black';
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        setCurrentTheme('light');
        localStorage.setItem('theme', 'light');
    };

    const forceDark = () => {
        document.documentElement.classList.add('dark');
        document.documentElement.style.backgroundColor = '#111827';
        document.documentElement.style.color = 'white';
        document.body.style.backgroundColor = '#111827';
        document.body.style.color = 'white';
        setCurrentTheme('dark');
        localStorage.setItem('theme', 'dark');
    };

    return (
        <div className="fixed top-4 left-4 z-50 p-4 bg-red-500 text-white rounded-lg shadow-lg">
            <p className="text-sm font-bold mb-2">Force Theme Test</p>
            <p className="text-xs mb-2">Current: {currentTheme}</p>
            <div className="flex gap-2">
                <button 
                    onClick={forceLight}
                    className="px-3 py-1 bg-yellow-400 text-black rounded text-xs"
                >
                    Light
                </button>
                <button 
                    onClick={forceDark}
                    className="px-3 py-1 bg-gray-800 text-white rounded text-xs"
                >
                    Dark
                </button>
            </div>
        </div>
    );
};

export default ForceTheme;