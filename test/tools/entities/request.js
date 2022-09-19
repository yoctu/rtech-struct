module.exports = {
    "points": [
        {
            "key": "A",
            "arrival_from": "2022-09-15T16:30:00.000Z",
            "arrival_until": "2022-09-15T20:30:00.000Z",
            "address": {
                "city": "Nancy",
                "country": "FR",
                "zip_code": "54000",
                "timezone_string": "Europe/Paris",
                "street": "31 rue de la colline",
                "position": {
                    "lat": 48.6987,
                    "lon": 6.1597
                }
            },
            "contact": {
                "name": "Flynn",
                "company_name": "test comma",
                "phone": "+330102030405",
                "email": "test@test.com"
            },
            "package_to_load": [
                "c520bb79-77e6-4b0a-81f9-38dd041378e9"
            ],
            "package_to_unload": []
        },
        {
            "key": "a",
            "arrival_from": "2022-09-16T08:00:00.000Z",
            "arrival_until": "2022-09-16T12:00:00.000Z",
            "address": {
                "city": "Beaugency",
                "country": "FR",
                "zip_code": "45190",
                "timezone_string": "Europe/Paris",
                "street": "3 Place du Martroi",
                "position": {
                    "lat": 47.7773,
                    "lon": 1.6296
                }
            },
            "contact": {
                "name": "Lui",
                "company_name": "Lui"
            },
            "package_to_load": [
                "4085a92f-bedc-4065-a2f0-6350f8eeb3d2"
            ],
            "package_to_unload": [
                "c520bb79-77e6-4b0a-81f9-38dd041378e9"
            ]
        },
        {
            "key": "B",
            "arrival_from": "2022-09-16T12:45:00.000Z",
            "arrival_until": "2022-09-16T16:45:00.000Z",
            "address": {
                "city": "Nantes",
                "country": "FR",
                "zip_code": "44000",
                "timezone_string": "Europe/Paris",
                "street": "10 Rue de Strasbourg",
                "position": {
                    "lat": 47.216,
                    "lon": -1.551
                }
            },
            "contact": {
                "name": "4353425435",
                "phone": "+352234234"
            },
            "package_to_load": [],
            "package_to_unload": [
                "4085a92f-bedc-4065-a2f0-6350f8eeb3d2"
            ]
        }
    ],
    "packages": [
        {
            "package_type": "parcel",
            "quantity": 1,
            "length": 30,
            "width": 20,
            "height": 20,
            "weight": 1,
            "stackable": "4",
            "references": [],
            "tracking_id": "c520bb79-77e6-4b0a-81f9-38dd041378e9",
            "owner": "82SKOREWAY2",
            "status": "waiting_for_pickup",
            "fromStep": "EP2209VVX6-A",
            "toStep": "EP2209VVX6-a",
            "type": "Parcel"
        },
        {
            "quantity": 1,
            "length": 30,
            "width": 20,
            "height": 20,
            "weight": 1,
            "stackable": "4",
            "references": [],
            "tracking_id": "4085a92f-bedc-4065-a2f0-6350f8eeb3d2",
            "owner": "82SKOREWAY2",
            "package_type": "parcel",
            "status": "waiting_for_pickup",
            "fromStep": "EP2209VVX6-a",
            "toStep": "EP2209VVX6-B",
            "type": "Parcel"
        }
    ],
    "transports": [
        {
            "way": [
                "A",
                "a",
                "B"
            ],
            "vehicles": [],
            "distances": [
                468,
                308
            ],
        }
    ],
    "source": [
        "82SKOREWAY2"
    ],
    "extras": [],
    "references": [
        {
            "label": "WBS",
            "value": ""
        },
        {
            "label": "Reference 2",
            "value": ""
        },
        {
            "label": "Reference 3",
            "value": ""
        },
        {
            "label": "Reference 4",
            "value": ""
        },
        {
            "label": "Reference 5",
            "value": ""
        }
    ],
    "customer_interlocutor": {
        "lastname": "Taggart",
        "firstname": "Flynn",
        "email": "o.husson@redspher.com"
    },
    "key": "EP2209VVX6",
    "creator": "FLASH",
    "target": ["FROPSCENTER"]
}
