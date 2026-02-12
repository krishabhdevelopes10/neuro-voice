import { fetch } from 'wix-fetch';

export async function callBackendAPI() {
    try {
        const response = await fetch('https://your-app-name.onrender.com/api/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: 'value'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Backend call failed:', error);
        throw error;
    }
}
