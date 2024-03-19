# Litter Cleanup App Endpoints

## User Authentication
Endpoint: /login
Method: POST
Description: Authenticates a user and generates a JWT token for subsequent requests.

## User Signup
Endpoint: /signup
Method: POST
Description: Registers a new user in the system.

## Save Image
Endpoint: /save
Method: POST
Headers: Authorization: Bearer <JWT_TOKEN>
Description: User can send an analyze image details to be added to the DB

## Organize Cleanup Event
Endpoint: /organize_event
Method: POST
Headers: Authorization: Bearer <JWT_TOKEN>
Description: Enables organizers to create and schedule cleanup events in specific areas.

## Edit Cleanup Event
Endpoint: /edit_event
Method: PUT
Headers: Authorization
Description: Allows organizers to modify the details of a cleanup event, such as the date, time, and location.

## Delete Cleanup Event
Endpoint: /delete_event/:event_id
Method: DELETE
Headers: Authorization
Description: Enables organizers to cancel a scheduled cleanup event.

## Get Cleanup Events
Endpoint: `/cleanup_events`
Method: GET
Headers: Authorization

## Get Cleanup Event Details
Endpoint: `/cleanup_event/:event_id`
Method: GET
Headers: Authorization

## Update Leaderboard
Endpoint: /update_leaderboard
Method: PUT
Headers: Authorization: Bearer <JWT_TOKEN>
Description: Updates the leaderboard based on user activity, such as uploading images of litter.

## Get Educational Content
Endpoint: /educational_content
Method: GET
Headers: Authorization: Bearer <JWT_TOKEN>
Description: Retrieves educational materials about sustainability, waste management, and the consequences of littering.

Note:
<JWT_TOKEN> should be replaced with the actual JWT token obtained during user authentication.
Endpoints related to therapists and patients have been removed as they are not relevant to this application.
Dynamic parameters such as :patient_id and :report_id are not applicable in this context and are not included in the endpoints.