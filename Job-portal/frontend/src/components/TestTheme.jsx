import { useTheme } from '@/contexts/ThemeContext';

const TestTheme = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="fixed top-4 right-4 z-50 p-4 bg-red-500 text-white rounded">
            <p>Current theme: {theme}</p>
            <button 
                onClick={toggleTheme}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Toggle Theme
            </button>
        </div>
    );
};

export default TestTheme;