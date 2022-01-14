# 13 Object Relational Mapping (ORM): E-commerce Back End:
This is a back-end e-commerce site using Express.js API, which has been configured with Sequelize in order to interact with a MySL database.

## User Story:
As the manager at an internet retail company, I want a back-end for my e-commerce website that uses the latest technologies so that my company can compete with other e-commerce companies.

## User experience:
Given a functional Express.js API:
When I add my database name, MySQL username, and MySQL password to an environment variable file, then I am able to connect to a database using Sequelize.
When I enter schema and seed commands, then a development database is created and is seeded with test data.
When I enter the command to invoke the application, then my server is started and the Sequelize models are synced to the MySQL database.
When I open API GET routes in Insomnia Core for categories, products, or tags, then the data for each of these routes is displayed in a formatted JSON.
When I test API POST, PUT, and DELETE routes in Insomnia Core, then I am able to successfully create, update, and delete data in my database.

## Database Models
The database contains the following four models, including the requirements listed for each model:

* `Category`
  * `id`
    * Integer
    * Doesn't allow null values
    * Set as primary key
    * Uses auto increment
  * `category_name`
    * String
    * Doesn't allow null values

* `Product`
  * `id`
    * Integer
    * Doesn't allow null values
    * Set as primary key
    * Uses auto increment
  * `product_name`
    * String
    * Doesn't allow null values
  * `price`
    * Decimal
    * Doesn't allow null values
    * Validates that the value is a decimal
  * `stock`
    * Integer
    * Doesn't allow null values
    * Set a default value of 10
    * Validates that the value is numeric
  * `category_id`
    * Integer
    * References the `category` model's `id` 

* `Tag`
  * `id`
    * Integer
    * Doesn't allow null values
    * Set as primary key
    * Uses auto increment
  * `tag_name`
    * String

* `ProductTag`
  * `id`
    * Integer
    * Doesn't allow null values
    * Set as primary key
    * Uses auto increment
  * `product_id`
    * Integer
    * References the `product` model's `id`
  * `tag_id`
    * Integer
    * References the `tag` model's `id`

## Associations
Association methods are executed on the Sequelize models to create the following relationships between them:

* `Product` belongs to `Category`, as a category can have multiple products but a product can only belong to one category.
* `Category` has many `Product` models.
* `Product` belongs to many `Tag` models. Using the `ProductTag` through model, allow products to have multiple tags and tags to have many products.
* `Tag` belongs to many `Product` models.


## Walkthrough video link:
The walkthrough video shows the POST, PUT, and DELETE routes for products and tags being tested in Insomnia Core.
https://github.com/rawc72/Challenge_No-13/issues/1#issue-1102779422

## Github repository link:
https://github.com/rawc72/Challenge_No-13.git

