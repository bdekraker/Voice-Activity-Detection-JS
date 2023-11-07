// SpeechDetection.js is a module that exports the SpeechDetection class

export default class SpeechDetection {
    constructor(options) {
        this.speakingThreshold = options.speakingThreshold || 5;
        this.onUpdate = options.onUpdate;
    }

    start() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(this.handleStream.bind(this))
                .catch(this.handleError.bind(this));
        } else {
            this.handleError('getUserMedia not supported in this browser.');
        }
    }

    handleStream(stream) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);
        scriptProcessor.onaudioprocess = this.processAudio.bind(this, analyser);
    }

    processAudio(analyser) {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        let average = array.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
        let isSpeaking = average > this.speakingThreshold;
        this.onUpdate(isSpeaking);
    }

    handleError(error) {
        console.error("Error: ", error);
        if (this.onUpdate) {
            this.onUpdate(false);
        }
    }
}
