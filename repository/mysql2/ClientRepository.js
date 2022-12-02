const db = require('../../config/mysql2/db');

exports.getClients = () => {
    return db.promise().query('SELECT * FROM Client')
            .then( (results, fields) => {
                console.log(results[0]);
                return results[0];
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
};

exports.getClientById = (clientId) => {
    const query = `SELECT ID_client , Name, Surname, Telephone, Email, 
                          ID_rental, Client_ID_client, Bike_ID_bike, Date_from, Date_to, 
                          ID_bike, Brand, Model, Colour
                   FROM Client 
                   LEFT JOIN Rental ON Client_ID_client = ID_client
                   LEFT JOIN Bike ON Bike_ID_bike = ID_bike
                   WHERE ID_client = ?`        
    
    return db.promise().query(query, [clientId])
            .then( (results, fields) => {
                const firstRow = results[0][0];
                if(!firstRow) {
                    return {};
                }
                const client = {
                    ID_client: parseInt(clientId),
                    Name: firstRow.Name,
                    Surname: firstRow.Surname,
                    Telephone: firstRow.Telephone,
                    Email: firstRow.Email,
                    Rentals: []
                }
                for(let i=0; i<results[0].length; i++){
                    const row = results[0][i];
                    if(row.ID_rental) {
                        const rental = {
                            ID_rental: row.ID_rental,
                            Date_from: row.Date_from,
                            Date_to: row.Date_to,
                            Bike: {
                                ID_bike: row.ID_bike,
                                Brand: row.Brand,
                                Model: row.Model,
                                Colour: row.Colour
                            }
                        };
                        client.Rentals.push(rental);
                    }
                }
                return client;
            })
            .catch( err => {
                console.log(err);
                throw err;
            }); 
};

exports.createClient = (newClientData) => {
    const name = newClientData.Name;
    const surname = newClientData.Surname;
    const telephone = newClientData.Telephone;
    const email = newClientData.Email;

    const sql = 'INSERT into Client (Name, Surname, Telephone, Email) VALUES (?, ?, ?, ?)';

    return db.promise().execute(sql, [name, surname, telephone, email]);
};

exports.updateClient = (clientId, clientData) => {
    const name = clientData.Name;
    const surname = clientData.Surname;
    const telephone = clientData.Telephone;
    const email = clientData.Email ? clientData.Email : null;

    const sql = 'UPDATE Client set Name = ?, Surname = ?, Telephone = ?, Email = ? WHERE ID_client = ?';
    return db.promise().execute(sql, [name, surname, telephone, email, clientId]);
};

exports.deleteClient = (clientId) => {
    const sql1 = 'DELETE FROM Rental WHERE Client_ID_client = ?';
    const sql2 = 'DELETE FROM Client WHERE ID_client = ?';
    
    return db.promise().execute(sql1, [clientId])
            .then(() =>{
                return db.promise().execute(sql2, [clientId])
            });
};