import { useTheme } from '@/contexts/ThemeContext';

const ThemeTest = () => {
    const { theme } = useTheme();

    return (
        <div className="fixed bottom-4 right-4 z-50 p-3 bg-blue-500 text-white rounded-lg shadow-lg">
            <p className="text-sm font-medium">Theme: {theme}</p>
            <div className="mt-1 text-xs">
                <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded">
                    Test: {theme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}
                </div>
            </div>
        </div>
    );
};

export default ThemeTest;