const db = require('../../config/mysql2/db');

exports.getRentals = () => {
    const query = `SELECT ID_rental, Client_ID_client, Bike_ID_bike, Date_from, Date_to, 
                          ID_bike, Brand, Model, Colour, 
                          ID_client , Name, Surname, Telephone, Email
                   FROM Rental 
                   LEFT JOIN Client ON Client_ID_client = ID_client
                   LEFT JOIN Bike ON Bike_ID_bike = ID_bike`         
    
    return db.promise().query(query)
            .then( (results, fields) => {
                const rentals = [];
                for(let i=0; i<results[0].length; i++){
                    const row = results[0][i];
                    const rental = {
                        ID_rental: row.ID_rental,
                        Date_from: row.Date_from,
                        Date_to: row.Date_to,
                        Client: {
                            ID_client: row.ID_client,
                            Name: row.Name,
                            Surname: row.Surname,
                            Telephone: row.Telephone,
                            Email: row.Email
                        },
                        Bike: {
                            ID_bike: row.ID_bike,
                            Brand: row.Brand,
                            Model: row.Model,
                            Colour: row.Colour
                        }
                    };
                    rentals.push(rental);
                }
                console.log(rentals);
                return rentals;
            })
            .catch( err => {
                console.log(err);
                throw err;
            }); 
};

exports.getRentalById = (rentalId) => {
    const query = `SELECT ID_rental, Client_ID_client, Bike_ID_bike, Date_from, Date_to, 
                          ID_bike, Brand, Model, Colour, 
                          ID_client , Name, Surname, Telephone, Email
                   FROM Rental 
                   LEFT JOIN Client ON Client_ID_client = ID_client
                   LEFT JOIN Bike ON Bike_ID_bike = ID_bike
                   WHERE ID_rental = ?`      
    
    return db.promise().query(query, [rentalId])
            .then( (results, fields) => {
                const row = results[0][0];
                if(!row) {
                    return {};
                }
                const rental = {
                    ID_rental: parseInt(rentalId),
                    Date_from: row.Date_from,
                    Date_to: row.Date_to,
                    Client: {
                        ID_client: row.ID_client,
                        Name: row.Name,
                        Surname: row.Surname,
                        Telephone: row.Telephone,
                        Email: row.Email
                    },
                    Bike: {
                        ID_bike: row.ID_bike,
                        Brand: row.Brand,
                        Model: row.Model,
                        Colour: row.Colour
                    }
                };
                return rental;
            })
            .catch( err => {
                console.log(err);
                throw err;
            }); 
};

exports.createRental = (newRentalData) => {
    console.log('createRental');
    console.log(newRentalData);
    const sql = 'INSERT into Rental (Client_ID_client, Bike_ID_bike, Date_from, Date_to) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql, [newRentalData.Client_ID_client, newRentalData.Bike_ID_bike, newRentalData.Date_from, newRentalData.Date_to]);
};

exports.updateRental = (rentalId, rentalData) => {
    const sql = 'UPDATE Rental set Client_ID_client = ?, Bike_ID_bike = ?, Date_from = ?, Date_to = ? WHERE ID_rental = ?';
    return db.promise().execute(sql, [rentalData.Client_ID_client, rentalData.Bike_ID_bike, rentalData.Date_from, rentalData.Date_to, rentalId]);
};

exports.deleteRental = (rentalId) => {
    const sql = 'DELETE FROM Rental WHERE ID_rental IN (?)';
    return db.promise().execute(sql, [rentalId]);
};