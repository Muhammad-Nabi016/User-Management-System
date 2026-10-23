# User Management System

A full-stack User Management System built with React, Node.js, Express.js, and MongoDB. This project allows users to manage user records through an interactive frontend connected to a backend API.

## Features

- **Dashboard:** Clean and responsive user management interface.
- **Add User:** Create new user records.
- **View Users:** Retrieve and display users from the database.
- **Edit User:** Update existing user information.
- **Delete User:** Remove user records.
- **Search Users:** Search users by name or email.
- **MongoDB Integration:** Store and manage user data persistently.
- **RESTful CRUD Operations:** Perform Create, Read, Update, and Delete operations.
- **CORS Support:** Enable communication between the React frontend and Express backend.
- **Input Validation:** Validate required fields before creating or updating records.

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Lucide React

### Backend
- Node.js
- Express.js
- Mongoose
- MongoDB Atlas
- dotenv
- CORS

## Project Structure

```text
User Management System/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
├── server.js
├── index.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

*Note: The structure may vary slightly depending on your local setup.*

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Muhammad-Nabi016/User-Management-System
cd "User Management System"
```

### 2. Install Backend Dependencies

```bash
npm install
```

If CORS is not already installed:

```bash
npm install cors
```

### 3. Configure Environment Variables

Create a `.env` file in the project root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your own MongoDB connection string. Never publish database credentials or secrets.

### 4. Start the Backend Server

```bash
npm run dev
```

The backend server should run at:

`http://localhost:3000`

### 5. Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
npm install lucide-react
```

### 6. Start the Frontend

```bash
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

Keep both the backend and frontend terminals running while using the application.

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check the API server |
| GET | `/api/users` | Retrieve all users |
| GET | `/api/users/:id` | Retrieve a user by ID |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

### Example: Create a User

Send a POST request to:

`http://localhost:3000/api/users`

Example JSON body:

```json
{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "age": 22
}
```

The API expects the fields supported by the backend validation. Email addresses must be unique if the schema enforces uniqueness.

## Database

The application uses MongoDB to store user records. Mongoose defines the user schema and communicates with the database.

## Learning Outcomes

- Building a React frontend with reusable components.
- Developing backend routes using Express.js.
- Implementing CRUD functionality.
- Connecting a Node.js application to MongoDB Atlas.
- Using environment variables for configuration.
- Connecting frontend requests to backend endpoints.
- Handling user input, validation, and application errors.

## Future Improvements

- User authentication and authorization.
- Pagination and advanced filtering.
- Improved form validation and notifications.
- Deployment of the frontend and backend.
- Automated testing.

## Author

**Muhammad Nabi**

Software Engineer

GitHub: https://github.com/Muhammad-Nabi016

LinkedIn: https://www.linkedin.com/in/muhammad-nabi-aa053636b?utm_source=share_via&utm_content=profile&utm_medium=member_android

---

This project was developed for learning and portfolio purposes to practice full-stack web development.