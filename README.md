# NodeJS Database Challenge

## :dart: The Challenge

This will be an application that should store incoming and outgoing financial transactions and allow the registration and listing of these transactions, in addition to allowing the creation of new records in the database by sending a CSV file.

## Routes

- **`POST /transactions`**: The route must receive `title`, `value`, `type`, and `category` within the body of the request, the `type` being the type of the transaction, which should be `income` for incoming (deposits) and `outcome` for exiting (withdrawing). When registering a new transaction, it must be stored within your database, having the fields `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`.

- **`REQ 1`**: For the category, you must create a new table, which will have the fields `id`, `title`, `created_at`, `updated_at`.

- **`REQ 2`**: Before creating a new category, always make sure that a category with the same title already exists. If it exists, use the `id` already in the database.

```json
{
  "id": "uuid",
  "title": "Payment",
  "value": 3000,
  "type": "income",
  "category": "Salary"
}
```

- **`GET /transactions`**: This route should return a listing of all the transactions you have registered so far, along with the sum of the entries, withdrawals and total credit. This route must return an object in the following format

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Payment",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Freela",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Credit Card",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Gamer Desk",
      "value": 1200,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Recreation",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```
- **`DELETE /transactions/:id`**: The route must delete a transaction with the `id` present in the route parameters;

- **`POST /transactions/import`**: The route should allow the import of a file with `.csv` format containing the same information needed to create a transaction `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`, where each line of the CSV file must be a new record for the database, and finally return all `transactions` that have been imported into your database. The CSV file must follow the following structure:

| title           |  type   | value | category |
| --------------- | :-----: | :---: | :------: |
| Loan            | income  | 1500  |  Others  |
| Website Hosting | outcome |  50   |  Others  |
| Ice cream       | outcome |   3   |   Food   |

## Tests

For this challenge we have the following tests:

<h4 align="center">
  ⚠️ Before running the tests, create a database with the name "gostack_desafio06_tests" so that all tests can run correctly ⚠️
</h4>

- **`should be able to create a new transaction`**: For this test to pass, your application must allow a transaction to be created, and return a JSON with the created transaction.

* **`should create tags when inserting new transactions`**: For this test to pass, your application must allow that when creating a new transaction with a category that does not exist, it is created and inserted in the category_id field of the transaction with the `id` just created.

- **`should not create tags when they already exists`**: For this test to pass, your application must allow that when creating a new transaction with a category that already exists, it is assigned to the category_id field of the transaction with the `id` of that existing category, not allowing the creation of categories with the same `title`.

* **`should be able to list the transactions`**: For this test to pass, your application must allow an array of objects to be returned containing all transactions along with the balance of income, outcome and total transactions that have been created so far.

- **`should not be able to create outcome transaction without a valid balance`**: In order for this test to pass, your application must not allow a transaction of the `outcome` type to exceed the total amount the user has in cash (total income), returning a response with HTTP 400 code and an error message in the following format: `{error: string}`.

* **`should be able to delete a transaction`**: For this test to pass, you must allow your delete route to delete a transaction, and when deleting it, it returns an empty response, with status 204.

- **`should be able to import transactions`**: For this test to pass, your application must allow a CSV file to be imported, containing the following [model](https://github.com/Rocketseat/bootcamp-gostack-desafios/blob/master/desafio-database-upload/assets/file.csv). With the imported file, you must allow all records and categories that were present in that file to be created in the database, and return all transactions that were imported.

# :rocket: Releasing the Kraken

## Requirements

You will only need Node.js, Postgres DB and a node global package, Yarn, installed in your environment.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node -v
    v12.18.0

    $ npm -v
    6.13.7

###

### PostgreSQL

https://hub.docker.com/_/postgres

###

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

## :computer: Install

    $ git clone https://github.com/pupato13/nodejs-database-challenge
    $ cd nodejs-database-challenge
    $ yarn install

## :checkered_flag: Running the project

    $ yarn dev

Access: [localhost:3333](http://localhost:3333/transactions)

PS: To run all routes, you will need to install an API testing tool. Below are two that I use to work with:

[Insomnia](https://insomnia.rest/)

[Postman](https://www.postman.com/)

PS 2: To access your database, I you can use DBeaver:
[DBeaver](https://dbeaver.io/)

## :white_check_mark: Running tests

    $ yarn test
