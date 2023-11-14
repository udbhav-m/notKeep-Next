# Not-Keep - Notes App
Not-Keep is a full-stack notes app built with Next.js for the frontend, Recoil for state management, Tailwind CSS for styling, Shadcdn UI for components, and authentication using JSON Web Tokens (JWT). The app allows users to perform CRUD (Create, Read, Update, Delete) operations on their notes and includes a search bar for easy navigation.

## Features
Create Notes: Add new notes with a title and description.
Read Notes: View a list of all notes with the option to mark them as done, edit, or delete.
Update Notes: Edit existing notes to update titles or descriptions.
Delete Notes: Permanently remove unwanted notes.
Archive Notes: Archive completed or less relevant notes.
Search Bar: Quickly find specific notes using the search functionality.
Dark/Light Mode: Toggle between dark and light modes for a personalized experience.
Technologies Used
Frontend: Next.js, Recoil, Tailwind CSS, Shadcdn UI.
Backend: Node.js, Express.js.
Authentication: JSON Web Tokens (JWT).
Database: MongoDB (or your preferred database).
Getting Started
Prerequisites
Node.js installed on your machine.
MongoDB set up for the backend (or your preferred database).
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/not-keep.git
Install dependencies:

bash
Copy code
cd not-keep
npm install
Set up environment variables:

Create a .env file in the root directory.

Add the following variables:

env
Copy code
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Run the app:

bash
Copy code
npm run dev
Access the app:

Open your browser and go to http://localhost:3000.

Usage
Register or log in to your account.
Start creating, updating, and managing your notes.
Use the search bar to find specific notes quickly.
Enjoy a seamless user experience with the clean and intuitive UI.
