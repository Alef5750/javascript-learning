// Import the 'express' module
import express, { Request, Response } from 'express';
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

interface User {
  id: string, 
  email: string,
  password: string
}
// Create an Express application
const app = express();

// Set the port number for the server
const port = 3000;

// make a get request for getting all users
app.get('/users', (req: Request, res: Response) => {

})
// Define a route for the root path ('/')
app.get('/', (req: Request, res: Response) => {
  // Send a response to the client
  res.send('Hello, TypeScript + Node.js + Express!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});