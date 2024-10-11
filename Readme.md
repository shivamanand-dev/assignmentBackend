# Backend Project

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a backend service designed to handle [brief description of the service]. It is built using [programming language/framework] and follows best practices for scalability and maintainability.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/shivamanand-dev/assignmentBackend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd your-repo
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Configuration

After cloning the repository, you need to set up your environment variables. Create a `.env` file in the root directory of the project and add the following lines:

```env
DB_CONNECT_STRING = mongodb://localhost:27017/
JWT_SECRET = secret
PORT = 4000
```

These variables are essential for connecting to the database and handling JWT authentication.

## Usage

To run the project locally, use the following command:

```sh
npm start
```

The server will start on `http://localhost:4000`.

## API Endpoints

Here are some of the main API endpoints:

- `POST /auth/register` - Signup API
- `POST /auth/login` - Login API
- `PUT /auth/edit` - Edit your profile when logged in
- `PUT /auth/editByEmail` - Edit any profile using email
- `GET /auth/users` - Fetch all users

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
