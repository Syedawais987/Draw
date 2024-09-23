# Authentication API

A Node.js-based backend API for user authentication, including registration, login, logout, and JWT-based authorization for protected routes. The API uses MongoDB for data storage, Passport.js for authentication, and Express.js for routing.

## Technologies Used

- **Node.js**: JavaScript runtime to build the server.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB (Mongoose)**: NoSQL database used for data storage.
- **Passport.js (passport-jwt)**: Authentication middleware used for verifying JWT tokens.
- **JWT (jsonwebtoken)**: JSON Web Token used for secure transmission of information between the client and the server.
- **Bcrypt.js**: Library for hashing passwords before storing them in the database.
- **Express Validator**: Middleware for validating request body inputs.

## Packages Used

- `express`: Handles routing and middleware in the application.
- `bcryptjs`: Hashes passwords for user security.
- `jsonwebtoken`: Generates and verifies JWT tokens for secure authentication.
- `mongoose`: Connects and models data in MongoDB.
- `passport`: Handles authentication strategies.
- `passport-jwt`: A Passport strategy for authenticating JWT tokens.
- `express-validator`: Provides validation for inputs like email and password.
- `nodemon`: Tool for automatic restarts during development.

## Project Structure Server Side

/server
│
├── /config
│ └── passport.js # Passport JWT configuration
│
├── /controllers
│ └── userController.js # Contains the logic for register, login,logout and protected routes
│
├── /middleware
│ └── blacklist.js # Middleware to check if the token is blacklisted
│
├── /models
│ └── User.js # Mongoose model for User data
│ └── Blacklist.js # Mongoose model for storing blacklisted tokens
│
├── /routes
│ └── user.js # Defines user-related API routes (register, login, logout, protected)
│
├── .env # Environment variables (DO NOT UPLOAD)
├── server.js # Entry point for the application
├── package.json # Contains package dependencies
└── README.md # Instructions and details for the project

## Getting Started

To run this project locally, follow these steps.

### Prerequisites

Ensure you have the following installed:

- **Node.js**: >=14.x
- **MongoDB**: Make sure you have MongoDB running locally or have access to a cloud instance.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd SocialMedia
   ```
3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following:

   ```
   MONGO_URI=<your_mongo_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

6. Access the API on `http://localhost:5000/api/users`.

## API Endpoints

### Public Endpoints

- **Register User** - `POST /api/users/register`

  - Fields: `name`, `email`, `password`
  - Description: Registers a new user.

- **Login User** - `POST /api/users/login`
  - Fields: `email`, `password`
  - Description: Logs in an existing user and returns a JWT.

### Protected Endpoints

- **Access Protected Route** - `GET /api/users/protected`

  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Description: Access a protected route, available only to authenticated users.

- **Logout User** - `POST /api/users/logout`
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Description: Logs out a user by blacklisting their token.

## Project Flow

1. **User Registration**:

   - The user sends a `POST` request with `name`, `email`, and `password`.
   - The server hashes the password using `bcryptjs`, saves the user in MongoDB, and returns a JWT token.

2. **User Login**:

   - The user sends a `POST` request with `email` and `password`.
   - The server compares the password with the stored hash, and if successful, returns a JWT token.

3. **Protected Routes**:
   - Protected routes require the user to send the JWT token in the `Authorization` header.
   - Passport.js verifies the token using the `passport-jwt` strategy.
4. **Logout**:
   - The user logs out by sending the token to be blacklisted. This prevents future use of the token.

# Devloper

- @Syed Awais
- syedawaishussain987@gmail.com

# Note this readmme file i created for other dev to help them out as i faced the same when i started and use or get help from other project it take a lot of time to understand the flow of the project so thats why i created this and will upgrade this time to time IA stay connected Created on 23/09/2024 The purpose behind that was am working in a company named Muscled Inc remotely and in one of project an existing one i have to use passporjs jwt strategies for testing i created this and all the api's tested now i'll have to just use that logic in thier project and the client side i wdont work i just created the basic as am backend dev.Tahnks and Happy Coding ! Stay bleesed .
