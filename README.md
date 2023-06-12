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

## DELETE /:idAnimal

- method: DELETE
- dev url: http://localhost:4000/animals/:idAnimal
- prod url: https://nil-serra-final-project-back-202304-bcn.onrender.com/:idAnimal
- body:
- Authorization: Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYTA5MGI5MjYxNTYwMDk3NDY5MTMiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODUxMjM1NDMsImV4cCI6MTY4NTcyODM0M30.fotRryVTJH9kHthbUykwoEzGwDW43O1cAxZ3MSat5HI
- response: status: 200 OK, {
  "Animal deleted"
  }

  ## POST /animals/create

  - method: POST

- dev url: http://localhost:4000/animals/create
- prod url: https://nil-serra-final-project-back-202304-bcn.onrender.com/animals/create
- body: {
  "name": "Jack",
  "species": "dog",
  "races": "Border-collie, Chou-chow",
  "gender": "Female",
  "size": "Medium Size",
  "yearOfBirth": "2019",
  "imageUrl": "https://cdn.discordapp.com/attachments/1114238887548698687/1115308388017000478/bella-440.webp",
  "description": "Bella is a friendly Border Collie and Poodle, born in 2019. She is a loving and playful dog who enjoys spending time with people. Bella is great with children and loves going for long walks. She is looking for an active family who can provide her with plenty of exercise and attention. Bella is a loyal companion who will bring joy to any home."
  }
- response: status: 200 OK, {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYTA5MGI5MjYxNTYwMDk3NDY5MTMiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODUxMjM1NDMsImV4cCI6MTY4NTcyODM0M30.fotRryVTJH9kHthbUykwoEzGwDW43O1cAxZ3MSat5HI"
  }
