# Stayzy - Hotel Booking Website - Server

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
├── configs/
│   └── cloudinary.js
├── controllers/
│   ├── userController.js
│   ├── placeController.js
│   ├── photoController.js
│   └── bookingController.js
├── middleware/
│   ├── getUserDataFromToken.js
│   └── upload.js
├── models/          # Database models
│   ├── User.js
│   ├── Place.js
│   └── Booking.js
├── routes/
│   ├── userRoutes.js
│   ├── placeRoutes.js
│   ├── photoRoutes.js
│   └── bookingRoutes.js
├── index.js         # Entry point
├── package.json     # Dependencies
├── .env             # Environment Variables
├── .env.example     # Environment Variables Example
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
   PORT=4000
   JWT_SECRET=your_jwt_secret
   MONGO_URL=your_mongodb_connection_string

   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

## Usage

Start the development server:

```bash
npm start
```

The API will be available at `http://localhost:4000`

## Models

- **User** - Stores user account information
- **Place** - Stores hotel/place details
- **Booking** - Stores booking reservations

## Contributing

Contributions are welcome! Please follow the existing code structure and commit conventions.

## License

MIT
