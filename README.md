

# Endpoints

## Media Endpoints

GET /api/media: Fetches a list of all media.

GET /api/media/:mediaId: Retrieves a specific media item by its ID.

POST /api/media: Creates a new media item. Requires multipart/form-data with the title, user_id, and file. Authenticated users only.

PUT /api/media/:mediaId: Updates a media item by its ID. Requires JSON body with details. Owner only.

DELETE /api/media/:mediaId: Deletes a media item by its ID. Owner only.

## User Endpoints

GET /api/users: Fetches a list of all users.

GET /api/users/:userId: Retrieves a specific user by their ID.

POST /api/users: Creates a new user. Requires a JSON body with username, password, and email.

PUT /api/users/:userId: Updates a user's details by their ID. Authenticated user only.

DELETE /api/users/:userId: Deletes a user by their ID. Authenticated user only.

## Authentication

POST /api/auth/login: Authenticate users and provide a JWT for accessing protected routes.
ON success returns a JWT for authenticated sessions.

## Testing the API
You can utilize tools like Postman or use the provided requests.http file if you have a compatible IDE to execute the requests directly.

