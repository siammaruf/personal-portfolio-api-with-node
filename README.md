![GitHub pull requests](https://img.shields.io/github/issues-pr/siammaruf/personal-portfolio-api-with-node)

![GitHub stars](https://img.shields.io/github/stars/siammaruf/personal-portfolio-api-with-node?style=social)
![GitHub stars](https://img.shields.io/github/forks/siammaruf/personal-portfolio-api-with-node?style=social)
![GitHub stars](https://img.shields.io/github/watchers/siammaruf/personal-portfolio-api-with-node?style=social)
![GitHub follow](https://img.shields.io/github/followers/siammaruf?label=Follow&style=social)
## 🗎 Personal portfolio API with node and express
This is a personal portfolio backend API with node.js, express, and mongodb. I am continuing to work on it to make it better. Also, planning to develop the frontend part with React.js/Next.js. I always consider myself a learner. So, feel free to suggest me any better idea to move forward in my career
## 🚀 Demo
I am working on it. So, it will be coming later

## 🏃 Running Locally
```bash
$ git clone https://github.com/siammaruf/personal-portfolio-api-with-node.git
$ cd personal-portfolio-api-with-node
$ npm install
$ npm i -g nodemon
$ npm run dev / npm run server
```
<br>

## 🛠 Built With
- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [multer](https://www.npmjs.com/package/multer)
- [joi](https://www.npmjs.com/package/joi)
- [cors](https://www.npmjs.com/package/cors)
- [nodemon](https://www.npmjs.com/package/nodemon)

<br>

## 👻 Documentation ( REST API )
The REST API to the example app is described below.

### Authentication APIs
Create user and authorization access and refresh token. I have used JWT web token for this part.

| Method | Endpoint          |
|--------|-------------------|
| POST   | /api/signup       |
| POST   | /api/login        |
| POST   | /api/refreshtoken |
| DELETE | /api/refreshtoken |

### Post APIs
Create post for build blog part

| Method | Endpoint       | Authorization |
|--------|----------------|---------------|
| GET    | /api/posts     | No            |
| GET    | /api/posts/:id | No            |
| POST   | /api/posts     | Yes           |
| PUT    | /api/posts/:id | Yes           |
| DELETE | /api/posts/:id | Yes           |

### Category APIs
Create Category for post. The api will maintain relation with post

| Method | Endpoint            | Authorization |
|--------|---------------------|---------------|
| GET    | /api/categories     | No            |
| GET    | /api/categories/:id | No            |
| POST   | /api/categories     | Yes           |
| PUT    | /api/categories/:id | Yes           |
| DELETE | /api/categories/:id | Yes           |

### Media APIs 
Store Media or files with the api. This will main relation with user profile, post, and project

| Method | Endpoint       | Authorization |
|--------|----------------|---------------|
| GET    | /api/media     | No            |
| GET    | /api/media/:id | No            |
| POST   | /api/media     | Yes           |
| DELETE | /api/media/:id | Yes           |

### Projects APIs
Create project for current user. The api will maintain relation with user profile

| Method | Endpoint          | Authorization |
|--------|-------------------|---------------|
| GET    | /api/projects     | No            |
| GET    | /api/projects/:id | No            |
| POST   | /api/projects     | Yes           |
| PUT    | /api/projects/:id | Yes           |
| DELETE | /api/projects/:id | Yes           |

### Skills APIs
Create skill for user profile. The api will maintain relation with user profile 

| Method | Endpoint        | Authorization |
|--------|-----------------|---------------|
| GET    | /api/skills     | No            |
| GET    | /api/skills/:id | No            |
| POST   | /api/skills     | Yes           |
| PUT    | /api/skills/:id | Yes           |
| DELETE | /api/skills/:id | Yes           |

### Educations APIs
Add Education for user profile. The api will maintain relation with user profile

| Method | Endpoint            | Authorization |
|--------|---------------------|---------------|
| GET    | /api/educations     | No            |
| GET    | /api/educations/:id | No            |
| POST   | /api/educations     | Yes           |
| PUT    | /api/educations/:id | Yes           |
| DELETE | /api/educations/:id | Yes           |

### Profiles APIs
Create user profile. The api will maintain relation with user, skills, education, and projects

| Method | Endpoint          | Authorization |
|--------|-------------------|---------------|
| GET    | /api/profiles     | No            |
| GET    | /api/profiles/:id | No            |
| POST   | /api/profiles     | Yes           |
| PUT    | /api/profiles/:id | Yes           |
| DELETE | /api/profiles/:id | Yes           |

## 🤝 Contribute
If you want to contribute to this app, you're always welcome!
See [Contributing Guidelines](https://github.com/G3root/readme-generator/blob/master/CONTRIBUTING.md).
## 📩 Contact
I know that first and foremost you are looking for a tool to solve your problems, but if you enjoy
it that much, why not tell me? I would love to hear from you 😉