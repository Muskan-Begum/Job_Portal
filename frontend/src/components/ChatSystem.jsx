import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

const ChatSystem = () => {
    const { user } = useSelector(store => store.auth);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Only show chat for logged-in users
    if (!user) {
        return null;
    }

    const mockMessages = [
        { id: 1, sender: 'recruiter', text: `Hi ${user.fullname}! I saw your application for the Frontend Developer position.`, time: '10:30 AM', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
        { id: 2, sender: 'user', text: 'Hello! Yes, I\'m very interested in the position.', time: '10:32 AM' },
        { id: 3, sender: 'recruiter', text: 'Great! Could you tell me about your experience with React and modern web technologies?', time: '10:33 AM', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
        { id: 4, sender: 'user', text: 'I have 3+ years of React experience, including Redux, hooks, and testing with Jest.', time: '10:35 AM' }
    ];

    useEffect(() => {
        if (user) {
            setMessages(mockMessages);
        }
    }, [user]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: Date.now(),
                sender: 'user',
                text: newMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setMessages(prev => [...prev, message]);
            setNewMessage('');
            
            // Simulate recruiter typing
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                const responses = [
                    'Thanks for the information! I\'ll review your profile and get back to you soon.',
                    'That sounds great! Could you share more about your recent projects?',
                    'Excellent! We\'d like to schedule a technical interview. Are you available this week?',
                    'Perfect! I\'ll forward your profile to our technical team for review.'
                ];
                const recruiterResponse = {
                    id: Date.now() + 1,
                    sender: 'recruiter',
                    text: responses[Math.floor(Math.random() * responses.length)],
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
                };
                setMessages(prev => [...prev, recruiterResponse]);
            }, 2000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 rounded-full bg-[#6A38C2] hover:bg-[#5b30a6] shadow-lg"
                    size="icon"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
                </Button>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-2xl z-40 flex flex-col"
                    >
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 dark:border-slate-600 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" />
                                    <AvatarFallback className="bg-pink-500 text-white text-sm">SJ</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold text-sm dark:text-white">Sarah Johnson</h3>
                                    <p className="text-xs text-green-600">HR Manager • Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="w-8 h-8">
                                    <Phone className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="w-8 h-8">
                                    <Video className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="w-8 h-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-end gap-2 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        {message.sender === 'recruiter' && (
                                            <Avatar className="w-6 h-6">
                                                <AvatarImage src={message.avatar} />
                                            </Avatar>
                                        )}
                                        <div className={`px-3 py-2 rounded-lg ${
                                            message.sender === 'user' 
                                                ? 'bg-[#6A38C2] text-white' 
                                                : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white'
                                        }`}>
                                            <p className="text-sm">{message.text}</p>
                                            <p className={`text-xs mt-1 ${
                                                message.sender === 'user' 
                                                    ? 'text-purple-200' 
                                                    : 'text-gray-500 dark:text-gray-400'
                                            }`}>
                                                {message.time}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2"
                                >
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" />
                                    </Avatar>
                                    <div className="bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-lg">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-gray-200 dark:border-slate-600">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type a message..."
                                    className="flex-1 px-3 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
                                />
                                <Button
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim()}
                                    className="bg-[#6A38C2] hover:bg-[#5b30a6] disabled:opacity-50"
                                    size="icon"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatSystem;