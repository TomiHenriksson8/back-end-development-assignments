## My REST API
This REST API provides basic CRUD functionalities for managing items without using any frameworks like Express.

## Getting Started
Prerequisites
Make sure you have Node.js installed on your machine. If not, download and install Node.js.

## Setting up the project:
Clone this repository.
Navigate to the project directory.
Install required dependencies using npm install.
Start the development server using npm start.
Your server should be running on http://127.0.0.1:3000/.

## Endpoints
GET /api/media
Fetches a list of all media.

GET /api/media/:mediaId
Retrieves a specific media item by its ID.

POST /api/media
Creates a new media item. Requires multipart/form-data with the title, user_id, and file.

PUT /api/media/:mediaId
Updates a media item by its ID. Requires a JSON body with media_id, user_id, filename, filesize, media_type, title, and description.

DELETE /api/media/:mediaId
Deletes a media item by its ID.

GET /api/users
Fetches a list of all users.

GET /api/users/:userId
Retrieves a specific user by their ID.

POST /api/users
Creates a new user. Requires a JSON body with username, password, and email.

PUT /api/users/:userId
Updates a user's details by their ID. Requires a JSON body with username, password, and email.

DELETE /api/users/:userId
Deletes a user by their ID.

## Testing the API
You can utilize tools like Postman or use the provided requests.http file if you have a compatible IDE to execute the requests directly.

## Error Handling
In case of errors, the API responds with a JSON object with a message property. Example:

{
    "message": "404 Resource not found!"
}