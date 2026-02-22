# Hotel Booking Website - Server

A Node.js and Express-based backend API for a hotel booking application built with the MERN stack.

## Features

- User authentication and authorization
- Hotel/Place management
- Booking system
- RESTful API endpoints
- MongoDB database integration

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## Project Structure

```
server/
├── controllers/      # Route controllers
├── models/          # Database models
│   ├── User.js
│   ├── Place.js
│   └── Booking.js
├── uploads/         # Uploaded files directory
├── index.js         # Entry point
├── package.json     # Dependencies
└── README.md        # This file
```

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with necessary environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

## Usage

Start the development server:

```bash
npm start
```

The API will be available at `http://localhost:5000`

## Models

- **User** - Stores user account information
- **Place** - Stores hotel/place details
- **Booking** - Stores booking reservations

## Contributing

Contributions are welcome! Please follow the existing code structure and commit conventions.

## License

MIT
