// Import the SpeechDetection module
import SpeechDetection from './SpeechDetection.js';

// Initialize the SpeechDetection class
const speechDetection = new SpeechDetection({
    onUpdate: (isSpeaking) => {
        const statusDiv = document.getElementById('status');
        statusDiv.textContent = isSpeaking ? 'Speaking...' : 'Silence...';
        statusDiv.style.color = isSpeaking ? 'green' : '#333';
    }
});

// Start the speech detection process
speechDetection.start();
