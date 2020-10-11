## Description

To-Do List application backend created using NestJS & Typescript 

## Installation

```bash
$ npm install
```

## Running the app

Fill .env with your database credentials
You must first create a table with the name 'Task'.
Columns: 
* id: uuid
* name: character varying
* due_date: timestamp without timezone
* priority: string
* created_at: timestamp without timezone
* updated_at: timestamp without timezone

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

#@ 
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Daniel Solá](https://github.com/DanielSola)

