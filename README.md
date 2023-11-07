
# Voice Activity Detection WebApp

This repository contains a modular JavaScript-based Voice Activity Detection (VAD) WebApp that uses the Web Audio API to analyze audio input from the microphone and detect when a user is speaking.

## Features

- Real-time voice activity detection using the user's microphone.
- Modular JavaScript for easy customization and expansion.
- Example HTML page to demonstrate functionality.
- CSS file for basic styling.

## Prerequisites

- A modern web browser that supports ES6+ and the Web Audio API.
- A web server to serve the files (local or remote).

## Setup

To set up the Voice Activity Detection WebApp on your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Ensure you have a web server running. You can use server software like Apache, Nginx, or development tools like Python's `http.server` or Node.js's `http-server`.
3. Place the files within the web server's serving directory.
4. Access the `index.html` file through the web server (not directly via the file system to ensure `getUserMedia` works correctly).

## Usage

Open the `index.html` file in your web browser. You should be prompted to allow microphone access. Once access is granted, the app will start detecting voice activity and update the status message on the page accordingly.

## Expansion

To expand upon this code for different applications:

1. Modify `SpeechDetection.js` to add more functionality to the voice detection, such as custom callbacks or events when voice is detected or when it stops.
2. Update `main.js` to handle different application logic, such as starting and stopping the detection based on user input.
3. Style the application by editing `style.css`.

## Contributing

Contributions are welcome! If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
