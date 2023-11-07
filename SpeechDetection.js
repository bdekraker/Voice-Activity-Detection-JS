// SpeechDetection.js is a module that exports the SpeechDetection class
// This class handles the voice activity detection functionality

export default class SpeechDetection {
    // The constructor initializes the class with options
    constructor(options) {
        // speakingThreshold sets the sensitivity of the voice detection
        // A lower value makes it more sensitive to quieter sounds
        // Default value is set to 5 if not provided
        this.speakingThreshold = options.speakingThreshold || 5;

        this.isCurrentlySpeaking = false;
        this.silenceThreshold = options.silenceThreshold || 1000; // default to 1 second

        // onUpdate is a callback function that will be called with a boolean
        // indicating whether voice activity is detected
        this.onUpdate = options.onUpdate;
    }

    // The start method requests access to the microphone
    start() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(this.handleStream.bind(this)) // Handle the audio stream
                .catch(this.handleError.bind(this)); // Handle errors
        } else {
            this.handleError('getUserMedia not supported in this browser.');
        }
    }

    // The handleStream method sets up the audio processing
    handleStream(stream) {
        // Create a new audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create an analyser node to access the audio data
        const analyser = audioContext.createAnalyser();

        // Connect the stream to the analyser
        const microphone = audioContext.createMediaStreamSource(stream);

        // Create a scriptProcessor to process the audio data in chunks
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        // Set properties to fine-tune the analyser's responsiveness
        analyser.smoothingTimeConstant = 0.8; // Smooths out the audio data
        analyser.fftSize = 1024; // Sets the size of the FFT for frequency domain analysis

        // Connect the nodes together to start processing the audio data
        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        // Bind the audio processing event to our custom method
        scriptProcessor.onaudioprocess = this.processAudio.bind(this, analyser);
    }

    // The processAudio method analyzes the audio data to detect voice activity
 
    processAudio(analyser) {
        // Create an array to hold the audio data
        const array = new Uint8Array(analyser.frequencyBinCount);
    
        // Fill the array with the frequency data from the analyser
        analyser.getByteFrequencyData(array);
    
        // Calculate the average volume of a range of frequencies
        let average = array.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
    
        // Determine if the average volume exceeds the speaking threshold
        let isSpeaking = average > this.speakingThreshold;
    
        // If speech is detected
        if (isSpeaking) {
            // If we are not in a speaking state, update the state and call onUpdate
            if (!this.isCurrentlySpeaking) {
                this.isCurrentlySpeaking = true;
                this.onUpdate(true);
            }
            // If we had a silence timer running, clear it because we're speaking
            if (this.silenceTimer) {
                clearTimeout(this.silenceTimer);
                this.silenceTimer = null; // Clear the timer reference
            }
        } else if (!isSpeaking && this.isCurrentlySpeaking) {
            // If we are currently in a speaking state but no speech is detected, start a silence timer if not already started
            if (!this.silenceTimer) {
                this.silenceTimer = setTimeout(() => {
                    // If the timer runs out and we have not detected speaking again, set the speaking state to false
                    this.isCurrentlySpeaking = false;
                    this.onUpdate(false);
                    this.silenceTimer = null; // Clear the timer reference
                }, this.silenceThreshold);
            }
        }
    }
    
    


    // The handleError method logs errors and updates the UI accordingly
    handleError(error) {
        console.error("Error: ", error);

        // If an onUpdate callback is provided, call it with 'false' to indicate no speech is detected
        if (this.onUpdate) {
            this.onUpdate(false);
        }
    }
}
