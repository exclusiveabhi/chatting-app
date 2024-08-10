# ResumeCraft

**ResumeCraft** is an AI-powered resume builder designed to help users create professional, customized resumes with ease. By leveraging AI, ResumeCraft ensures that each resume is tailored to highlight the user’s skills, experience, and achievements effectively.

## Features

- **AI-Powered Suggestions:** Receive intelligent recommendations to optimize your resume.
- **Customizable Templates:** Choose from a variety of professional resume templates.
- **Skill Matching:** Highlight skills that match the job description.
- **Real-Time Editing:** Make edits and see the changes in real time.
- **Export Options:** Download your resume in multiple formats (PDF, Word).

## Project Structure

The project is divided into two main parts:

- **Frontend:** The React application that provides the user interface and handles user interactions.
- **Backend:** The Node.js server that manages data processing and AI functionality.

## Getting Started

### Prerequisites

- **Node.js** (v22.0 or later) and **npm** (v6 or later) installed on your machine.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/exclusiveabhi/ai-resume-builder.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd ai-resume-builder
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Install Frontend Dependencies**

   ```bash
   npm install
   ```

3. **Start the Frontend Development Server**

   ```bash
   npm run dev
   ```

   The frontend app will be running on `http://localhost:3000`.

### Backend Setup

1. **Navigate to the Backend Directory**

   ```bash
   cd ../backend
   ```

2. **Install Backend Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory and set the required environment variables. Refer to `.env.example` for the required settings.

4. **Start the Backend Server**

   ```bash
   npm run dev
   ```

   The backend server will be running on `http://localhost:4000` (or any other port specified in your configuration).

## Usage

1. **Frontend:** Access the app through the browser and start building your resume by selecting templates and filling out personal details.
2. **Backend:** The backend processes data, runs AI algorithms to provide suggestions, and manages the export of resumes.

## Contributing

If you would like to contribute to **ResumeCraft**, please follow these steps:

1. **Fork the Repository**
2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Make Your Changes**
4. **Commit Your Changes**

   ```bash
   git commit -am 'Add new feature'
   ```

5. **Push to the Branch**

   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Create a Pull Request**

## Contact

For any questions or feedback, please open an issue on the [GitHub repository](https://github.com/exclusiveabhi/ai-resume-builder.git).