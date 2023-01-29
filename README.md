# Rbike - bike rental

* [Model](#model)
* [Tabels](#tabels)
* [Roles](#roles)

##  Model 
![topic](https://user-images.githubusercontent.com/102870734/215332688-69ab70aa-744d-487c-b569-18ea25faed13.png)

## Tabels

 *Table Customer*
|  FIELD NAME   |     TYPE      |   REQUIRE  |     DESCRIPTION    |
| ------------- | ------------- | ---------- | ------------------ |
|  ID_customer  |  integer      |  yes       | Primary key        |
|  Name         |  varchar      |  yes       | Customer name      |
|  Surname      |  varchar      |  yes       | Customer surname   |
|  Telephone    |  varchar      |  no        | Customer telephone |
|  Email        |  varchar      |  yes       | Customer e-mail    |
|  Password     |  varchar      |  yes       | Customer password  |

*Table Bike*
|  FIELD NAME   |     TYPE      |   REQUIRE  |     DESCRIPTION    |
| ------------- | ------------- | ---------- | ------------------ |
|  ID_bike      |  integer      |  yes       | Primary key        |
|  Brand        |  varchar      |  yes       | Bike brand         | 
|  Model        |  varchar      |  yes       | Bike model         |
|  Colour       |  varchar      |  yes       | Bike colour        |

*Table Rental*
|      FIELD NAME       |     TYPE      |   REQUIRE  |          DESCRIPTION         |
| --------------------- | ------------- | ---------- | ---------------------------- |
|  ID_rental            |  integer      |  yes       | Primary key                  |
|  Customer_ID_customer |  integer      |  yes       | Foreign key - table Customer | 
|  Bike_ID_bike         |  integer      |  yes       | Foreign key - table Bike     |
|  Date_from            |  datetime     |  yes       | Rental date from             |
|  Date_to              |  datetime     |  yes       | Rental date from             |
|  Equipment            |  tinyint      |  yes       | Bike equipment               |

*Table Accessory*
|  FIELD NAME   |     TYPE      |   REQUIRE  |     DESCRIPTION    |
| ------------- | ------------- | ---------- | ------------------ |
|  ID_accessory |  integer      |  yes       | Primary key        |
|  Name         |  varchar      |  yes       | Accessory name     | 

*Table Equipment*
|       FIELD NAME        |     TYPE      |   REQUIRE  |          DESCRIPTION          |
| ----------------------- | ------------- | ---------- | ----------------------------- |
|  ID_equipment           |  integer      |  yes       | Primary key                   |
|  Bike_ID_bike           |  integer      |  yes       | Foreign key - table Bike      |
|  Accessory_ID_accessory |  integer      |  yes       | Foreign key - table Accessory |

## Roles

*Unlogged user*
* log in
* register a new user
* change language
* review non-sensitive data from tables: Customer, Bike and Accessory

*Logged user*
* change language
* review details from tables: Customer, Bike and Accessory
* review only own rentals and their details
* add new own rentals

*Admin*
* change language
* register a new user
* review details, add new and update them from table Customer
* review details and delete them from table Accessory
* review details, add, update and delete them from tables: Bike and Rental
* assign accessories to the bike
