# React Native Practice

A collection of practice projects built with React Native (Expo), Node.js, Express, and MongoDB.

## Projects

### 1. [Auth Project](./auth)
Full-stack authentication system:
- **Frontend**: React Native with Expo, controlled inputs for Email and Password, mode toggle between Login and Sign Up.
- **Backend**: Node.js + Express API (`http://localhost:5000`) with MongoDB (Mongoose), password hashing via `bcrypt`, and JWT session tokens.

#### How to Run Auth:
1. **Backend**:
   ```bash
   cd auth/backend
   npm install
   node server.js
   ```
2. **Mobile App**:
   ```bash
   cd auth
   npm install
   npx expo start
   ```

