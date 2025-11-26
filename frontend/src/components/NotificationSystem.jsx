import { useState, useEffect } from 'react';
import { Bell, X, Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const NotificationSystem = () => {
    const { user } = useSelector(store => store.auth);
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    // Only show notifications for logged-in users
    useEffect(() => {
        if (!user) return;

        // Add initial notifications for logged-in users
        const initialNotifications = [
            { id: 1, type: 'job_match', title: 'Welcome back!', message: `Hi ${user.fullname}, check out new job matches for you`, time: new Date(), read: false },
            { id: 2, type: 'application_update', title: 'Profile Updated', message: 'Your profile has been successfully updated', time: new Date(Date.now() - 300000), read: true }
        ];
        setNotifications(initialNotifications);
        setUnreadCount(1);

        const interval = setInterval(() => {
            const mockNotifications = [
                { id: Date.now(), type: 'job_match', title: 'New Job Match!', message: 'Frontend Developer at Microsoft matches your profile', time: new Date(), read: false },
                { id: Date.now() + 1, type: 'application_update', title: 'Application Update', message: 'Your application for React Developer has been reviewed', time: new Date(), read: false },
                { id: Date.now() + 2, type: 'interview', title: 'Interview Scheduled', message: 'Interview scheduled for tomorrow at 2 PM with TechCorp', time: new Date(), read: false },
                { id: Date.now() + 3, type: 'job_match', title: 'Job Alert', message: 'New Full Stack Developer position at Amazon', time: new Date(), read: false }
            ];
            
            const randomNotification = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
            
            setNotifications(prev => [randomNotification, ...prev.slice(0, 9)]);
            setUnreadCount(prev => prev + 1);
            
            toast.success(randomNotification.title, {
                description: randomNotification.message,
                duration: 4000
            });
        }, 45000); // Every 45 seconds

        return () => clearInterval(interval);
    }, [user]);

    const markAsRead = (id) => {
        setNotifications(prev => 
            prev.map(notif => 
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
        setUnreadCount(0);
    };

    const getIcon = (type) => {
        switch (type) {
            case 'job_match': return <Briefcase className="h-4 w-4 text-blue-600" />;
            case 'application_update': return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'interview': return <AlertCircle className="h-4 w-4 text-orange-600" />;
            default: return <Bell className="h-4 w-4" />;
        }
    };

    // Don't render notifications for non-logged-in users
    if (!user) {
        return null;
    }

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="relative"
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                )}
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50"
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold dark:text-white">Notifications</h3>
                                <div className="flex items-center gap-2">
                                    {unreadCount > 0 && (
                                        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                                            Mark all read
                                        </Button>
                                    )}
                                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                    No notifications yet
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`p-4 border-b border-gray-100 dark:border-slate-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 ${
                                            !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                        }`}
                                        onClick={() => markAsRead(notification.id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            {getIcon(notification.type)}
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm dark:text-white">
                                                    {notification.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-2">
                                                    {notification.time.toLocaleTimeString()}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationSystem;