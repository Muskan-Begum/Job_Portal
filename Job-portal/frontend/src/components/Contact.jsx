import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-6 dark:text-white">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What's this about?"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="message">Message</Label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us more about your inquiry..."
                                    rows="5"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A38C2] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                ></textarea>
                            </div>
                            <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold mb-6 dark:text-white">Get in Touch</h2>
                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <Mail className="w-6 h-6 text-[#6A38C2] mr-4" />
                                    <div>
                                        <h3 className="font-semibold dark:text-white">Email</h3>
                                        <p className="text-gray-600 dark:text-gray-300">support@jobportal.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-6 h-6 text-[#6A38C2] mr-4" />
                                    <div>
                                        <h3 className="font-semibold dark:text-white">Phone</h3>
                                        <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-6 h-6 text-[#6A38C2] mr-4" />
                                    <div>
                                        <h3 className="font-semibold dark:text-white">Address</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            123 Business Ave<br />
                                            San Francisco, CA 94105
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold mb-6 dark:text-white">Quick Help</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold dark:text-white">How do I apply for jobs?</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Simply create an account, browse jobs, and click "Apply Now" on any position.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold dark:text-white">How do I post a job?</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Register as a recruiter, set up your company profile, and start posting jobs.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold dark:text-white">Is the service free?</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Job searching is free. Posting jobs requires a subscription plan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;