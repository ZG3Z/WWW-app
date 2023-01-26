export const customerList = [
    {
        "ID_customer": 1,
        "Name": "Jan",
        "Surname": "Kowalski",
        "Telephone": "123456789",
        "Email": "jan.kowalski@rbike.com",
    },
    {
        "ID_customer": 2,
        "Name": "Anna",
        "Surname": "Nowak",
        "Telephone": "987654321",
        "Email": "anna.nowak@rbike.com",
    },
    {
        "ID_customer": 3,
        "Name": "Adam",
        "Surname": "Kowalczyk",
        "Telephone": "88888888",
        "Email": "adam.kowalczyk@rbike.com",
    }
]

export const customerDetailsList = [
    {
        "ID_customer": 1,
        "Name": "Jan",
        "Surname": "Kowalski",
        "Telephone": "123456789",
        "Email": "jan.kowalski@rbike.com",
        "Rentals": [
            {
                "ID_rental": 1,
                "Date_from": '2022-03-04',
                "Date_to": '2022-03-06',
                "Bike": {
                    "ID_bike": 1,
                    "Brand": "Specialized",
                    "Model": "Rockhopper",
                    "Colour": "Czarny",
                }
            },
            {
                "ID_rental": 3,
                "Date_from": '2022-05-10',
                "Date_to": '2022-06-04',
                "Bike": {
                    "ID_bike": 2,
                    "Brand": "Unibike",
                    "Model": "Indiana",
                    "Colour": "Czerwony",
                }
            },
            {
                "ID_rental": 5,
                "Date_from": '2022-09-10',
                "Date_to": '2022-09-24',
                "Bike": {
                    "ID_bike": 3,
                    "Brand": "Cube",
                    "Model": "SL Road",
                    "Colour": "Niebieski",
                }
            }
        ]
    },
    {
        "ID_customer": 2,
        "Name": "Anna",
        "Surname": "Nowak",
        "Telephone": "987654321",
        "Email": "anna.nowak@rbike.com",
        "Rentals": [
            {
                "ID_rental": 2,
                "Date_from": '2022-04-20',
                "Date_to": '2022-05-12',
                "Bike": {
                    "ID_bike": 1,
                    "Brand": "Specialized",
                    "Model": "Rockhopper",
                    "Colour": "Czarny",
                }
            },
            {
                "ID_rental": 6,
                "Date_from": '2022-09-18',
                "Date_to": '2022-09-20',
                "Bike": {
                    "ID_bike": 1,
                    "Brand": "Specialized",
                    "Model": "Rockhopper",
                    "Colour": "Czarny",
                }
            }
        ]
    },
    {
        "ID_customer": 3,
        "Name": "Adam",
        "Surname": "Kowalczyk",
        "Telephone": "888888888",
        "Email": "adam.kowalczyk@rbike.com",
        "Rentals": [
            {
                "ID_rental": 4,
                "Date_from": '2022-07-24',
                "Date_to": '2022-08-14',
                "Bike": {
                    "ID_bike": 3,
                    "Brand": "Cube",
                    "Model": "SL Road",
                    "Colour": "Niebieski",
                }
            }
        ]
    }
]