import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Building, Zap, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

const SmartSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const inputRef = useRef(null);

    // Mock suggestions data
    const mockSuggestions = {
        jobs: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'DevOps Engineer'],
        companies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix'],
        locations: ['San Francisco', 'New York', 'Seattle', 'Austin', 'Remote'],
        skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes']
    };

    useEffect(() => {
        if (query.length > 1) {
            const filtered = [];
            Object.entries(mockSuggestions).forEach(([category, items]) => {
                const matches = items.filter(item => 
                    item.toLowerCase().includes(query.toLowerCase())
                ).slice(0, 3);
                if (matches.length > 0) {
                    filtered.push({ category, items: matches });
                }
            });
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [query]);

    const handleSearch = () => {
        if (query.trim()) {
            const searchData = {
                query: query.trim(),
                filters: selectedFilters
            };
            onSearch(searchData);
            
            // Add to recent searches
            setRecentSearches(prev => {
                const updated = [query.trim(), ...prev.filter(s => s !== query.trim())].slice(0, 5);
                localStorage.setItem('recentSearches', JSON.stringify(updated));
                return updated;
            });
            
            setQuery('');
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    const addFilter = (filter) => {
        if (!selectedFilters.includes(filter)) {
            setSelectedFilters(prev => [...prev, filter]);
        }
    };

    const removeFilter = (filter) => {
        setSelectedFilters(prev => prev.filter(f => f !== filter));
    };

    const getIcon = (category) => {
        switch (category) {
            case 'jobs': return <Search className="h-4 w-4 text-blue-600" />;
            case 'companies': return <Building className="h-4 w-4 text-green-600" />;
            case 'locations': return <MapPin className="h-4 w-4 text-red-600" />;
            case 'skills': return <Zap className="h-4 w-4 text-purple-600" />;
            default: return <Search className="h-4 w-4" />;
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* Search Input */}
            <div className="relative">
                <div className="flex items-center bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-600 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                    <Search className="h-5 w-5 text-gray-400 ml-4" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Search jobs, companies, skills..."
                        className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-400"
                    />
                    {query && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setQuery('')}
                            className="mr-2"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                    <Button
                        onClick={handleSearch}
                        className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-full px-6 py-3 mr-1"
                    >
                        Search
                    </Button>
                </div>

                {/* Active Filters */}
                {selectedFilters.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {selectedFilters.map((filter) => (
                            <Badge
                                key={filter}
                                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 flex items-center gap-1"
                            >
                                {filter}
                                <button onClick={() => removeFilter(filter)}>
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
                {showSuggestions && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
                    >
                        {suggestions.map(({ category, items }) => (
                            <div key={category} className="p-2">
                                <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                                    {getIcon(category)}
                                    {category}
                                </div>
                                {items.map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => handleSuggestionClick(item)}
                                        className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md transition-colors"
                                    >
                                        <span className="text-gray-700 dark:text-white">{item}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addFilter(item);
                                            }}
                                            className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                                        >
                                            + Add Filter
                                        </button>
                                    </button>
                                ))}
                            </div>
                        ))}

                        {/* Recent Searches */}
                        {recentSearches.length > 0 && query.length === 0 && (
                            <div className="p-2 border-t border-gray-200 dark:border-slate-600">
                                <div className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Recent Searches
                                </div>
                                {recentSearches.map((search) => (
                                    <button
                                        key={search}
                                        onClick={() => handleSuggestionClick(search)}
                                        className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md transition-colors text-gray-600 dark:text-gray-300"
                                    >
                                        {search}
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SmartSearch;