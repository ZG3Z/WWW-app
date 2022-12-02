const db = require('../../config/mysql2/db');

exports.getBikes = () => {
    return db.promise().query('SELECT * FROM Bike')
            .then( (results, fields) => {
                console.log(results[0]);
                return results[0];
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
};

exports.getBikeById = (bikeId) => {
    const query = `SELECT ID_bike, Brand, Model, Colour, 
                          ID_rental, Client_ID_client, Bike_ID_bike, Date_from, Date_to, 
                          ID_client , Name, Surname, Telephone, Email
                   FROM Bike 
                   LEFT JOIN Rental ON Bike_ID_bike = ID_bike
                   LEFT JOIN Client ON Client_ID_client = ID_client
                   WHERE ID_bike = ?`         
    
    return db.promise().query(query, [bikeId])
            .then( (results, fields) => {
                const firstRow = results[0][0];
                if(!firstRow) {
                    return {};
                }
                const bike = {
                    ID_bike: parseInt(bikeId),
                    Brand: firstRow.Brand,
                    Model: firstRow.Model,
                    Colour: firstRow.Colour,
                    Rentals: []
                }
                for(let i=0; i<results[0].length; i++){
                    const row = results[0][i];
                    if(row.ID_rental) {
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
                            }
                        };
                        bike.Rentals.push(rental);
                    }
                }
                return bike;
            })
            .catch( err => {
                console.log(err);
                throw err;
            }); 
};

exports.createBike = (newBikeData) => {
    const brand = newBikeData.Brand;
    const model = newBikeData.Model;
    const colour = newBikeData.Colour;

    const sql = 'INSERT into Bike (Brand, Model, Colour) VALUES (?, ?, ?)';

    return db.promise().execute(sql, [brand, model, colour]);
};

exports.updateBike = (bikeId, bikeData) => {
    const brand = bikeData.Brand;
    const model = bikeData.Model;
    const colour = bikeData.Colour;

    const sql = 'UPDATE Bike set Brand = ?, Model = ?, Colour = ? WHERE ID_bike = ?';
    return db.promise().execute(sql, [brand, model, colour, bikeId]);
};

exports.deleteBike = (bikeId) => {
    const sql1 = 'DELETE FROM Rental WHERE Bike_ID_bike = ?';
    const sql2 = 'DELETE FROM Bike WHERE ID_bike = ?';
    
    return db.promise().execute(sql1, [bikeId])
            .then(() =>{
                return db.promise().execute(sql2, [bikeId])
            });
};