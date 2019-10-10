[![Coverage Status](https://coveralls.io/repos/github/andela/caret-bn-backend/badge.svg?branch=develop)](https://coveralls.io/github/andela/caret-bn-backend?branch=develop)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
[![Build Status](https://travis-ci.org/andela/caret-bn-backend.svg?branch=develop)](https://travis-ci.org/andela/caret-bn-backend) [![Maintainability](https://api.codeclimate.com/v1/badges/df0d33bd05578ed6fff6/maintainability)](https://codeclimate.com/github/andela/caret-bn-backend/maintainability)

Barefoot Nomad - Making company travel and accomodation easy and convinient.
=======

## Vision :telescope:
Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

---

## Documentation :book:

For API documentation, please visit https://caret-bn-backend.herokuapp.com//api/v1/api-docs/

## Setting Up The Application :wrench:

### A. Docker

1. Install Docker on your local machine by following [these](https://docs.docker.com/install/) instructions.

2. After you have ensured that docker is running, clone the repo.

3. Configure your environment with the following as follows:

```
# DATABASE CONFIG
DB_USERNAME=
DB_PASSWORD=

# DEVELOPMENT DATABASE
DEVELOPMENT_DB=

# TEST DATABASE
TEST_DB=

# PRODUCTION DATABASE
PRODUCTION_DB=
PRODUCTION_PORT=
DATABASE_PRODUCTION_HOST=
DATABASE_PRODUCTION_PORT=

# DATABASE HOST // Default to localhost
DATABASE_HOST=localhost

# DOCKER CONFIG

# DOCKER DB CONFIG
DATABASE_PORT= 

# APPLICATION

APPLICATION_PORT=port_your_application_will_run_on

```

4. When the repo is cloned, run the command ` docker-compose build ` to build the image out

5. If you have no errors run ` docker-compose up `. 

6. Access ` http://localhost:<:APPLICATION_PORT> ` in Postman, if docker is running correctly, you will be returned with a message:

    ```javascript
   { 
      "status": 200,
      "message": "Welcome to Barefoot Nomad!"
   }
    ```

7. Ensure you have Postgres running 

  _**Note:** Your Postgres Database will run on port ` <:DATABASE_PORT> `. If you're using PgAdmin or Postico ensure you create a database on the server ` localhost:<:DATABASE_PORT> ` 

8. When the server is running, create a database on your new PG server. Ensure your new development database is the same name as your ` DEVELOPMENT_DB `  and your test database is the same name as ` TEST_DB  ` environment variables

9. Run the command ` sequelize db:migrate:all `

10. Run the command sequelize ` db:seed:all `

11. Check your database to ensure proper functionality and correctness. 

12. To run a production version of the application, set up environment variables and execute the command ` docker-compose -f docker-compose.yml -f docker-compose.prod.yml up `

## API Endpoints :droplet:

- #### Sign up endpoint
| Endpoint | Request Method | Request parameter |
| ---------- |----------- | ------------- |
| [/api/v1/users/register](https://caret-bn-backend.herokuapp.com//api/v1/users/register) | POST | { "email": "krinkunyf@gmail.com", "username": "KrinkYF", "password": "Kun376$$#$", "confirmPassword": "Kun376$$#$" } |


# Bugs :bug:
No known bugs.
If you spot one, let us know

# Author :computer:
[Andela Rwanda's](https://www.andela.com) Team ^CARET 
