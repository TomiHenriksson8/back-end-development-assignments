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
GET /
Displays the home page with welcome message and API documentation hints.

GET /items
Fetches a list of all items.

GET /items/:id
Retrieves a specific item by its ID.

POST /items
Creates a new item. Requires a JSON body with the name property.

PUT /items/:id
Updates an item's name by its ID. Requires a JSON body with the name property.

DELETE /items/:id
Deletes an item by its ID.

## Testing the API
You can utilize tools like Postman or use the provided requests.http file if you have a compatible IDE to execute the requests directly.

## Error Handling
In case of errors, the API responds with a JSON object with a message property. Example:

{
    "message": "404 Resource not found!"
}