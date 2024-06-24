# Spotify-API

## Overview

Spotify-API is a RESTful API that provides access to a wide range of features within the Spotify music platform. It allows developers to integrate Spotify's functionalities such as browsing music, managing playlists, and controlling playback into their applications.

### Development Tools
[![technologies](https://skillicons.dev/icons?i=nestjs,ts,postgresql,git,github,docker)](#backend)

<div style="display: flex; gap: 30px; align-items: center;">
  <img src="https://user-images.githubusercontent.com/62142146/208088732-e168fd64-3e48-4f48-b14d-9d91fa7d99f6.svg" width="70">
  <img src="https://raw.githubusercontent.com/swagger-api/swagger.io/wordpress/images/assets/SWC-logo-clr.png" height="70">
</div>


## Table of Contents

- [Spotify-API](#spotify-api)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Schema Diagram for DB](#schema-diagram-for-db)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Endpoints](#endpoints)
  - [Key Features](#key-features)
  - [Technology Stack](#technology-stack)
      - [Backend](#backend)
      - [Documentation](#documentation)
      - [Version Control](#version-control)
  - [How to Contribute](#how-to-contribute)


## Getting Started

### Prerequisites

Before getting started, ensure you have installed the following:

- Node.js and npm
- PostgreSQL

### Installation

1. Clone the repository: `$ git clone git@github.com:mohamedAEmara/Spotify-API.git`
2. Install dependencies: `$ npm install`
3. Configure environment variables: Create a `.env` file in the root directory.
   - Copy `.env.example` content to `.env` file
   - Add values for environment variables
    ```bash
       PORT=3000
       SECRET=HAD@T23
       DB_HOST=localhost
       DB_PORT=5432
       DB_USERNAME=postgres
       DB_PASSWORD=postgres
       DB_NAME=spotify-api
       NODE_ENV=devlopment
4. Migrate Prisma schema to the database by running these commands:
      ```bash
       $ npx prisma generate
       $ npx prisma migrate dev --name init
   
  
## Endpoints

After running the server, you can access Endpoints with documentation from:
```code
    localhost:3000/api
```

### Key Features
- Authentication with Two-Factor Authentication to use OTP for more security
- Upload audio files with validation on inputs
- Stream & Play songs
- Pagination & filtering songs
- Seeding for adding initial data to work on
## Technology Stack

The **Spotify-API** uses the following technologies and tools:

#### Backend

- **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **PostgreSQL:** A powerful, open-source relational database used for storing user data, playlists, and tracks information.
- **TypeORM:** A modern database toolkit and ORM for Node.js and TypeScript.
- **Docker:** A platform for running Postgres on without installing it on your machine
#### Documentation

- **Swagger:** Used for documenting and providing interactive API requests.

#### Version Control

- **Git:** A distributed version control system.
- **GitHub:** A web-based platform for version control and collaboration.

## How to Contribute

If you'd like to contribute to the project or have suggestions for improvement, please do not hesitate to make a pull request.