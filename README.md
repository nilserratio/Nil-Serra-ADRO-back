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

## GET /animals Pagination

- method: GET

- dev url: http://localhost:4000/animals?skip=1&limit=3
- prod url: https://nil-serra-final-project-back-202304-bcn.onrender.com/animals?skip=1&limit=3
- body: {
  "animals": [
  {
  "name": "Lily",
  "species": "cat",
  "races": "Ragdoll",
  "gender": "Female",
  "size": "Medium Size",
  "yearOfBirth": "2019",
  "imageUrl": "https://cdn.discordapp.com/attachments/1114238887548698687/1115308389157847162/lily-440.webp",
  "description": "Lily is a gentle Ragdoll cat, born in 2019. She is a calm and affectionate cat who loves to be cuddled and petted. Lily enjoys spending her days lounging around and observing her surroundings. She is looking for a peaceful and loving home where she can relax and receive lots of attention. Lily will bring comfort and serenity to her new family.",
  "user": "646fa090b926156009746913",
  "id": "647e06e68164d0de99df79b0"
  },
  {
  "name": "Leo",
  "species": "cat",
  "races": "Maine-coon",
  "gender": "Male",
  "size": "Big Size",
  "yearOfBirth": "2020",
  "imageUrl": "https://cdn.discordapp.com/attachments/1114238887548698687/1115308389581467719/leo-440.webp",
  "description": "Leo is a handsome Maine Coon cat, born in 2020. He is a friendly and sociable cat who enjoys the company of people and other animals. Leo loves to play and can entertain himself for hours with his toys. He is looking for a loving home where he can receive lots of attention and playtime. Leo will bring joy and companionship to his new family.",
  "user": "646fa090b926156009746913",
  "id": "647e06e68164d0de99df79af"
  },
  {
  "name": "Mia",
  "species": "cat",
  "races": "Siamese",
  "gender": "Female",
  "size": "Medium Size",
  "yearOfBirth": "2021",
  "imageUrl": "https://cdn.discordapp.com/attachments/1114238887548698687/1115308389963153500/mia-440.webp",
  "description": "Mia is a lovely Siamese cat, born in 2021. She is a curious and intelligent cat who enjoys exploring her surroundings. Mia is independent but also enjoys the company of her humans. She is looking for a patient and understanding family who can provide her with a stimulating environment. Mia will make a wonderful companion for those who appreciate her beauty and grace.",
  "user": "646fa090b926156009746913",
  "id": "647e06e68164d0de99df79ae"
  }
  ],
  "totalAnimals": 12
  }
- response: status: 200 OK,

## GET /animals/:idAnimal

- method: GET

- dev url: http://localhost:4000/animals/647e06e68164d0de99df79a6
- prod url: https://nil-serra-final-project-back-202304-bcn.onrender.com/647e06e68164d0de99df79a6
- body: {
  "animalById": {
  "name": "Bella",
  "species": "dog",
  "races": "Border-collie, Poodle",
  "gender": "Female",
  "size": "Medium Size",
  "yearOfBirth": "2019",
  "imageUrl": "https://cdn.discordapp.com/attachments/1114238887548698687/1115308388017000478/bella-440.webp",
  "description": "Bella is a friendly Border Collie and Poodle, born in 2019. She is a loving and playful dog who enjoys spending time with people. Bella is great with children and loves going for long walks. She is looking for an active family who can provide her with plenty of exercise and attention. Bella is a loyal companion who will bring joy to any home.",
  "user": "646fa090b926156009746913",
  "id": "647e06e68164d0de99df79a6"
  }
  }
- response: status: 200 OK
