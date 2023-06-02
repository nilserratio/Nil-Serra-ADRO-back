# Endpoints

## GET /ping

- method: GET
- dev url: http://localhost:4000/ping
- prod url: https://nil-serra-final-project-back-202304-bcn.onrender.com/ping
- body:
- response: status: 200 OK, {
  "message": "Entered"
  }

## POST /user/login

- method: POST
- dev url: http://localhost:4000/user/login
- prod url: https://nil-serra-final-project-back-202304-bcn.onrender.com/user/login
- body: {
  "username": "admin",
  "password": "admin"
  }
- response: status: 200 OK, {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYTA5MGI5MjYxNTYwMDk3NDY5MTMiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODUxMjM1NDMsImV4cCI6MTY4NTcyODM0M30.fotRryVTJH9kHthbUykwoEzGwDW43O1cAxZ3MSat5HI"
  }

## GET /animals

- method: GET
- dev url: http://localhost:4000/animals
- prod url: https://nil-serra-final-project-back-202304-bcn.onrender.com/animals
- body:
- Authorization: Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYTA5MGI5MjYxNTYwMDk3NDY5MTMiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODUxMjM1NDMsImV4cCI6MTY4NTcyODM0M30.fotRryVTJH9kHthbUykwoEzGwDW43O1cAxZ3MSat5HI
- response: status: 200 OK, {
  "animals": []
  }
