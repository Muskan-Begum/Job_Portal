import { useState, useEffect } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';

const ConnectionTest = () => {
    const [status, setStatus] = useState('Testing...');
    
    useEffect(() => {
        testConnection();
    }, []);
    
    const testConnection = async () => {
        try {
            // Test health endpoint
            const response = await axios.get('/api/v1/user/test', { 
                timeout: 5000,
                withCredentials: false
            }).catch(async () => {
                // If user endpoint fails, try root
                return await axios.get('/', { timeout: 5000 });
            });
            setStatus('✅ Backend Connected: ' + response.data.message);
            
        } catch (error) {
            console.error('Connection test error:', error);
            
            if (error.code === 'ECONNABORTED') {
                setStatus('❌ Timeout - Backend not responding');
            } else if (error.code === 'ECONNREFUSED' || error.message.includes('ECONNREFUSED')) {
                setStatus('❌ Backend not running on port 8000');
            } else if (error.message.includes('Network Error')) {
                setStatus('❌ Network Error - Check CORS/Firewall');
            } else {
                setStatus('❌ Error: ' + error.message);
            }
        }
    };
    
    return (
        <div style={{ 
            position: 'fixed', 
            top: '10px', 
            right: '10px', 
            background: '#f0f0f0', 
            padding: '10px', 
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 1000
        }}>
            <div>Backend Status: {status}</div>
            <div style={{ fontSize: '10px', marginTop: '2px' }}>Port: 8000 | API: /api/v1</div>
            <button onClick={testConnection} style={{ marginTop: '5px', fontSize: '10px' }}>
                Test Again
            </button>
        </div>
    );
};

export default ConnectionTest;