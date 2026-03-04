# Notes Management API

Notes Management API is a robust Node.js + Express application for managing notes with advanced filtering, pagination, and strict data validation. The project demonstrates RESTful API architecture, MongoDB indexing, centralized error handling, and schema-based request validation.

---

## FEATURES

• Full CRUD operations (Create, Read, Update, Delete)
• Advanced filtering by predefined tags (Work, Personal, Ideas, Meeting, etc.)
• Full-text search across title and content (MongoDB text index)
• Pagination support:

- page (default: 1, minimum: 1)
- perPage (default: 10, minimum: 5, maximum: 20)
  • Strict validation for Query, Params, and Body using Joi + Celebrate
  • Centralized error handling with http-errors and celebrate middleware
  • Protection against empty PATCH requests

---

## TECH STACK

Runtime:
• Node.js (ES Modules)

Framework:
• Express.js

Database:
• MongoDB with Mongoose ODM

Validation:
• Joi
• Celebrate

Error Handling:
• http-errors
• celebrate error middleware

Environment Configuration:
• dotenv

---

## API ENDPOINTS

NOTES

GET /notes
Get all notes
Supports: pagination, tag filtering, full-text search

GET /notes/:noteId
Get a single note by ID

POST /notes
Create a new note

PATCH /notes/:noteId
Update an existing note
Requires at least one field in the request body

DELETE /notes/:noteId
Delete a note

---

## VALIDATION RULES

Pagination:
• page — number, minimum 1
• perPage — number, minimum 5, maximum 20

ID Validation:
• Custom MongoDB ObjectId validation for all :noteId parameters

Creation:
• title — required, minimum 1 character
• tag — must be one of predefined allowed values

Update:
• At least one of the following fields must be provided:

- title
- content
- tag

---

## INSTALLATION & SETUP

1. Clone the repository:

   git clone <your-repository-url>

2. Install dependencies:

   npm install

3. Create a .env file in the root directory:

   PORT=3000
   MONGO_URL=your_mongodb_connection_string

4. Start the server:

   Development mode (nodemon):
   npm run dev

   Production mode:
   npm start

---

## TESTING

Base URL:
http://localhost:3000

Example complex query:

GET /notes?page=1&perPage=5&tag=Work&search=meeting

You can test the API using Postman or any REST client.

---

## PROJECT CONTEXT

Developed as part of the GoIT Node.js Course.
