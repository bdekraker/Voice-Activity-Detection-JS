// Import the SpeechDetection module
import SpeechDetection from './SpeechDetection.js';

// Wait for the DOM to fully load before starting the speech detection
document.addEventListener('DOMContentLoaded', () => {
    // Define the onUpdate function to update the UI based on voice activity
    const onUpdate = (isSpeaking) => {
        // Get the DOM elements for the status message and visual indicator
        const statusDiv = document.getElementById('status');
        const visualIndicator = document.getElementById('visual-indicator');

        // Check if speech is detected
        if (isSpeaking) {
            // Update the text and color of the status message
            statusDiv.textContent = 'Speaking...';
            statusDiv.style.color = 'green';

            // Add the 'pulse' class to the visual indicator and apply the pulse animation
            visualIndicator.classList.add('pulse');
            visualIndicator.style.animation = 'pulse-animation 1s infinite';
        } else {
            // Update the status message to show silence
            statusDiv.textContent = 'Silence...';
            statusDiv.style.color = '#333';

            // Remove the 'pulse' class and stop the animation
            visualIndicator.classList.remove('pulse');
            visualIndicator.style.animation = 'none';
        }
    };

    // Set your desired speaking threshold here
    const customSpeakingThreshold = 20; // Change this value to your preferred threshold

    // Initialize the SpeechDetection class with the onUpdate callback and custom speaking threshold
    const speechDetection = new SpeechDetection({
        speakingThreshold: customSpeakingThreshold,
        onUpdate: onUpdate
    });

    // Start the speech detection process
    speechDetection.start();
});
