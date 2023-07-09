

# Recruitment Solution Backend

This is the backend code for a recruitment solution application. It provides API endpoints for user registration, user login, searching candidates, and adding candidates to the database. The backend is built using Node.js and Express.js framework.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd recruitment-solution-backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root directory and provide the necessary environment variables:

   ```plaintext
   MONGO_URL=<mongodb-connection-url>
   ```

5. Start the server:

   ```bash
   npm start
   ```

   The server will start running on the specified port.

## API Endpoints

### POST /api/signin

This endpoint is used for user registration. It expects the following JSON payload:

```json
{
  "username": "john123",
  "email": "john@example.com",
  "password": "password123",
  "profile": "Software Engineer"
}
```

- `username` (string): User's desired username.
- `email` (string): User's email address.
- `password` (string): User's password.
- `profile` (string): User's profile or job title.

### POST /api/login

This endpoint is used for user login. It expects the following JSON payload:

```json
{
  "username": "john123",
  "password": "password123"
}
```

- `username` (string): User's username or email address.
- `password` (string): User's password.

### POST /api/search

This endpoint is used to search for candidates based on role and location. It expects the following JSON payload:

```json
{
  "role": "Software Engineer",
  "location": "New York"
}
```

- `role` (string): Desired job role of the candidate.
- `location` (string): Desired location of the candidate.

### POST /api/candidates

This endpoint is used to add a candidate to the database. It expects the following JSON payload:

```json
{
  "name": "John Doe",
  "role": "Software Engineer",
  "location": "San Francisco",
  "experience": "5 years",
  "skills": ["JavaScript", "React", "Node.js"]
}
```

- `name` (string): Candidate's full name.
- `role` (string): Candidate's job role.
- `location` (string): Candidate's location.
- `experience` (string): Candidate's experience in years.
- `skills` (array): Candidate's skills.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.



Feel free to modify and expand the README as needed to provide more information about your application and its usage.