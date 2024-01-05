<p align="center">
  <img src="https://casaz.vercel.app/logo.png" width="120px" alt="Talks app logo"/>
</p>

## Real Estate - CASAZ

<p>Find your dream home with our real estate website. Browse through thousands of listings, connect with expert agents, and discover the perfect property for your lifestyle. Start your search today and make your homeownership dreams a reality.<p>

## Table of contents

- [Real Estate - CASAZ](#real-estate---casaz)
- [Table of contents](#table-of-contents)
- [Overview](#overview)
  - [Feature](#feature)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
- [](#)
- [Author](#author)

## Overview

### Feature

Users should be able to:

- [x] See homepage
- [x] See properties page
- [x] See property detail page
- [x] See contact page

### Screenshot

![image](https://user-images.githubusercontent.com/57162533/224265544-857ceede-f169-43cb-8e58-b424cacbd7af.png)
![image](https://user-images.githubusercontent.com/57162533/224265597-473e9f1e-5519-4add-9ae9-9233c83173b1.png)
![image](https://user-images.githubusercontent.com/57162533/224265658-a8cbdbb4-da18-46d1-b31c-d8379de4843c.png)

### Links

- Live Site URL: [Live Site](https://perumtdl.vercel.app/)

## My process

### Built with

- Next JS
- Typescript
- Chakra UI
- Prisma

# Prisma Database Schema for a User Management System

This is a Prisma database schema for a user management system. It defines the data models and relationships for users, accounts, sessions, verification tokens, complaints, and payments.

## Installation

To use this schema, you will need to install Prisma and create a `.env` file with your database connection string.

```
npm install -g prisma
```

```
# .env
DATABASE_URL=postgresql://localhost:5432/user-management
```

## Models

### User

The `User` model represents a user of the system. It has the following fields:

- `id`: The unique identifier for the user.
- `name`: The user's name.
- `email`: The user's email address.
- `emailVerified`: A flag indicating whether the user's email address has been verified.
- `password`: The user's password.
- `role`: The user's role in the system.
- `createdAt`: The date and time when the user was created.
- `updatedAt`: The date and time when the user was last updated.

### Account

The `Account` model represents an account that a user has with a third-party service. It has the following fields:

- `id`: The unique identifier for the account.
- `userId`: The ID of the user that the account belongs to.
- `type`: The type of account (e.g. "google", "facebook").
- `provider`: The name of the third-party service that the account is with.
- `providerAccountId`: The unique identifier for the account on the third-party service.
- `refresh_token`: The refresh token for the account.
- `access_token`: The access token for the account.
- `expires_at`: The expiration date for the access token.
- `token_type`: The type of token (e.g. "bearer").
- `scope`: The scope of the token.
- `id_token`: The ID token for the account.
- `session_state`: The session state for the account.
- `oauth_token_secret`: The OAuth token secret for the account.
- `oauth_token`: The OAuth token for the account.

### Session

The `Session` model represents a user's session. It has the following fields:

## Author

- Website - [PeaceAntoHim](https://github.com/PeaceAntoHim)
