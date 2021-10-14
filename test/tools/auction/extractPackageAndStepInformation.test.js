const extract = require('../../../tools/auction/extractPackageAndStepInformation');

test('Extract package v1 information', () => {
    const auction = {
        'key': 'TEST_ec6311d3-1f77-4ee5-80d3-3c63f5ccfa55',
        'name': 'TEST_ec6311d3-1f77-4ee5-80d3-3c63f5ccfa55',
        'creator': 'FLASH',
        'target': ['TEST_AGENCY'],
        'valid_until': '2021-10-14T10:51:30.505Z',
        'puPlace': ['630 rue salvadore allende', '57390', 'audin-le-tiche', 'France', 'FR'],
        'puLocation': '49.472036,5.958004',
        'puDate': '2021-10-15T09:51:30.505Z',
        'dePlace': ['8 rue de surene', '75008', 'Paris', 'France', 'FR'],
        'deLocation': '48.870660281245435,2.3217107186185633',
        'deDate': '2021-10-16T09:51:30.505Z',
        'dimension': ['1', '100', '120', '120', '5', 'no'],
        'distance': 500,
        'visible': 'private',
        'notes': 'Agency: RTECH\nOrder type: agreed-price',
        'id': 'ff14ff3a-9b54-4811-a24f-0c252aa82198',
        'options': ['PKG_V1'],
        'reported_at': '2021-10-14T09:51:30.548Z',
        'valid_from': '2021-10-14T09:51:30.548Z',
        'type': 'auction',
        'status': 'created',
        'currency': 'EUR',
        'source': ['TEST_SHIPPER'],
        'sourceName': 'TEST_SHIPPER',
        'vehicles': ['lambda', 'pkw', 'break', 'frg1', 'frg2', 'frg3', 'frg4', 'frg4h', 'frgr', 'pl5', 'pl9', 'semi', 'semim', 'semif', 'trailer', 'lambda_side_load', 'frg4_side_load', 'frg4h_side_load', 'frgr_side_load', 'pl5_side_load', 'pl9_side_load', 'semi_side_load', 'semim_side_load', 'semif_side_load', 'trailer_side_load', 'lambda_tail_lift', 'frg4_tail_lift', 'frg4h_tail_lift', 'frgr_tail_lift', 'pl5_tail_lift', 'pl9_tail_lift', 'semi_tail_lift', 'semim_tail_lift', 'semif_tail_lift', 'trailer_tail_lift'],
        'targetStatus': [''],
        'targetName': ['TEST_AGENCY'],
        'winningbid': '',
        'extras': [],
        'referer_url': 'n/c',
        'request token': '9dd67b44-4ef6-445a-8487-8e15217370e5'
    };

    const transport = {
        'steps': [{
            'id': 1,
            'key': 'TEST_ec6311d3-1f77-4ee5-80d3-3c63f5ccfa55-A',
            'date': '2021-10-15T09:51:30.505Z',
            'address': {
                'street': '630 rue salvadore allende',
                'zipcode': '57390',
                'city': 'audin-le-tiche',
                'country': 'France',
                'countryCode': 'FR',
                'location': '49.472036,5.958004'
            }
        }, {
            'id': 2,
            'key': 'TEST_ec6311d3-1f77-4ee5-80d3-3c63f5ccfa55-B',
            'date': '2021-10-16T09:51:30.505Z',
            'address': {
                'street': '8 rue de surene',
                'zipcode': '75008',
                'city': 'Paris',
                'country': 'France',
                'countryCode': 'FR',
                'location': '48.870660281245435,2.3217107186185633'
            }
        }],
        'packages': [{
            'puID': 1,
            'deID': 2,
            'quantity': 1,
            'length': 100,
            'width': 120,
            'height': 120,
            'weight': 5,
            'note': null,
            'stackable': 'no',
            'adrCode': null,
            'value': null,
            'insuranceCode': null
        }],
        'extraCost': [],
        'vehicles': ['lambda', 'pkw', 'break', 'frg1', 'frg2', 'frg3', 'frg4', 'frg4h', 'frgr', 'pl5', 'pl9', 'semi', 'semim', 'semif', 'trailer', 'lambda_side_load', 'frg4_side_load', 'frg4h_side_load', 'frgr_side_load', 'pl5_side_load', 'pl9_side_load', 'semi_side_load', 'semim_side_load', 'semif_side_load', 'trailer_side_load', 'lambda_tail_lift', 'frg4_tail_lift', 'frg4h_tail_lift', 'frgr_tail_lift', 'pl5_tail_lift', 'pl9_tail_lift', 'semi_tail_lift', 'semim_tail_lift', 'semif_tail_lift', 'trailer_tail_lift']
    };

    expect(extract(auction)).toStrictEqual(transport);
});

test('Extract package v2 information', () => {
    const auction = {
        'key': 'TEST_e6516381-9a18-408e-8a5b-1d1e2b8ea58d',
        'name': 'TEST_e6516381-9a18-408e-8a5b-1d1e2b8ea58d',
        'creator': 'FLASH',
        'target': ['TEST_AGENCY'],
        'valid_until': '2021-10-14T10:51:48.189Z',
        'puPlace': ['630 rue salvadore allende', '57390', 'audin-le-tiche', 'France', 'FR'],
        'puLocation': '49.472036,5.958004',
        'puDate': '2021-10-15T09:51:48.189Z',
        'dePlace': ['8 rue de surene', '75008', 'Paris', 'France', 'FR'],
        'deLocation': '48.870660281245435,2.3217107186185633',
        'deDate': '2021-10-16T09:51:48.189Z',
        'dimension': ['1', '100', '120', '120', '5', '', '1,0088,1234', '', ''],
        'distance': 500,
        'visible': 'private',
        'vehicles': ['frg1'],
        'notes': 'Agency: RTECH\nOrder type: spot',
        'options': ['PKG_V2'],
        'id': '51c6cd9a-709b-4fc9-b85d-a48074d968a8',
        'reported_at': '2021-10-14T09:51:48.198Z',
        'valid_from': '2021-10-14T09:51:48.198Z',
        'type': 'auction',
        'status': 'created',
        'currency': 'EUR',
        'source': ['TEST_SHIPPER'],
        'sourceName': 'TEST_SHIPPER',
        'targetStatus': [''],
        'targetName': ['TEST_AGENCY'],
        'winningbid': '',
        'extras': [],
        'referer_url': 'n/c',
        'request token': '0e1b8ab7-946d-4274-b602-9f10db00383f'
    };

    const transport = {
        'steps': [{
            'id': 1,
            'key': 'TEST_e6516381-9a18-408e-8a5b-1d1e2b8ea58d-A',
            'date': '2021-10-15T09:51:48.189Z',
            'address': {
                'street': '630 rue salvadore allende',
                'zipcode': '57390',
                'city': 'audin-le-tiche',
                'country': 'France',
                'countryCode': 'FR',
                'location': '49.472036,5.958004'
            }
        }, {
            'id': 2,
            'key': 'TEST_e6516381-9a18-408e-8a5b-1d1e2b8ea58d-B',
            'date': '2021-10-16T09:51:48.189Z',
            'address': {
                'street': '8 rue de surene',
                'zipcode': '75008',
                'city': 'Paris',
                'country': 'France',
                'countryCode': 'FR',
                'location': '48.870660281245435,2.3217107186185633'
            }
        }],
        'packages': [{
            'puID': 1,
            'deID': 2,
            'quantity': 1,
            'length': 100,
            'width': 120,
            'height': 120,
            'weight': 5,
            'note': null,
            'stackable': 'no',
            'adrCode': '1,0088,1234',
            'value': '',
            'insuranceCode': '',
            'adr': {'class': '1', 'un_code': '0088', 'packing_group': '1234'}
        }],
        'extraCost': [],
        'vehicles': ['frg1']
    };

    expect(extract(auction)).toStrictEqual(transport);
});

test('Extract package multistep information', () => {
    const auction = {
        'key': 'TEST_5630e123-62d1-4970-a4a9-b082669c68fc',
        'name': 'TEST_5630e123-62d1-4970-a4a9-b082669c68fc',
        'creator': 'FLASH',
        'target': ['TEST_AGENCY'],
        'valid_until': '2021-10-14T10:54:41.020Z',
        'puPlace': ['8 rue de surene', '75008', 'Paris', 'France', 'FR'],
        'puLocation': '48.8707626,2.319565',
        'puDate': '2021-10-15T09:54:41.020Z',
        'dePlace': ['19 Rue Edmond Reuter', '5326', 'Contern', 'Luxembourg', 'LU'],
        'deLocation': '49.59,6.22',
        'deDate': '2021-10-17T09:54:41.020Z',
        'options': ['MULTISTEP'],
        'dimension': ['1', '100', '100', '100', '46', '', 'yes', '', '', '', 'A', '8 rue de surene', '75008', 'Paris', 'France', 'FR', '48.8707626,2.319565', 'Europe/Paris', 'Test 1', 'Test 1', 'test1@test.test', '300000000', '2021-10-15T09:54:41.020Z', '2021-10-15T09:54:41.020Z', 'B', '19 Rue Edmond Reuter', '5326', 'Contern', 'Luxembourg', 'LU', '49.59,6.22', 'Europe/Paris', 'Test 2', 'Test 2', 'test2@test.test', '300000002', '2021-10-17T09:54:41.020Z', '2021-10-17T09:54:41.020Z', '1', '50', '50', '50', '17', '', 'yes', '', '', '', 'a', '8 rue bellevue', '57600', 'forbach', 'France', 'FR', '49.19,6.89', 'Europe/Paris', 'Test 1', 'Test 1', 'test1@test.test', '300000000', '2021-10-16T09:54:41.020Z', '2021-10-16T09:54:41.020Z', 'B', '19 Rue Edmond Reuter', '5326', 'Contern', 'Luxembourg', 'LU', '49.59,6.22', 'Europe/Paris', 'Test 2', 'Test 2', 'test2@test.test', '300000002', '2021-10-17T09:54:41.020Z', '2021-10-17T09:54:41.020Z'],
        'distance': 500,
        'visible': 'private',
        'vehicles': ['frg4'],
        'notes': 'Agency: RTECH\nOrder type: spot',
        'id': 'dba76a6f-a32a-4801-a870-929eba395ec0',
        'reported_at': '2021-10-14T09:54:41.025Z',
        'valid_from': '2021-10-14T09:54:41.025Z',
        'type': 'auction',
        'status': 'created',
        'currency': 'EUR',
        'source': ['TEST_SHIPPER'],
        'sourceName': 'TEST_SHIPPER',
        'targetStatus': [''],
        'targetName': ['TEST_AGENCY'],
        'winningbid': '',
        'extras': [],
        'referer_url': 'n/c',
        'request token': 'b340798c-c866-4cf3-b9e0-bb2ed26f7360'
    };

    const transport = {
        'steps': [{
            'id': 1,
            'key': 'TEST_5630e123-62d1-4970-a4a9-b082669c68fc-A',
            'date': '2021-10-15T09:54:41.020Z',
            'dateUntil': '2021-10-15T09:54:41.020Z',
            'address': {
                'street': '8 rue de surene',
                'zipcode': '75008',
                'city': 'Paris',
                'country': 'France',
                'countryCode': 'FR',
                'location': '48.8707626,2.319565',
                'timezone': 'Europe/Paris'
            },
            'contact': {'companyName': 'Test 1', 'name': 'Test 1', 'email': 'test1@test.test', 'phone': '300000000'}
        }, {
            'id': 2,
            'key': 'TEST_5630e123-62d1-4970-a4a9-b082669c68fc-a',
            'date': '2021-10-16T09:54:41.020Z',
            'dateUntil': '2021-10-16T09:54:41.020Z',
            'address': {
                'street': '8 rue bellevue',
                'zipcode': '57600',
                'city': 'forbach',
                'country': 'France',
                'countryCode': 'FR',
                'location': '49.19,6.89',
                'timezone': 'Europe/Paris'
            },
            'contact': {'companyName': 'Test 1', 'name': 'Test 1', 'email': 'test1@test.test', 'phone': '300000000'}
        }, {
            'id': 3,
            'key': 'TEST_5630e123-62d1-4970-a4a9-b082669c68fc-B',
            'date': '2021-10-17T09:54:41.020Z',
            'dateUntil': '2021-10-17T09:54:41.020Z',
            'address': {
                'street': '19 Rue Edmond Reuter',
                'zipcode': '5326',
                'city': 'Contern',
                'country': 'Luxembourg',
                'countryCode': 'LU',
                'location': '49.59,6.22',
                'timezone': 'Europe/Paris'
            },
            'contact': {'companyName': 'Test 2', 'name': 'Test 2', 'email': 'test2@test.test', 'phone': '300000002'}
        }],
        'packages': [{
            'puID': 1,
            'deID': 3,
            'quantity': 1,
            'length': 100,
            'width': 100,
            'height': 100,
            'weight': 46,
            'note': '',
            'stackable': 'yes',
            'adrCode': '',
            'value': '',
            'insuranceCode': ''
        }, {
            'puID': 2,
            'deID': 3,
            'quantity': 1,
            'length': 50,
            'width': 50,
            'height': 50,
            'weight': 17,
            'note': '',
            'stackable': 'yes',
            'adrCode': '',
            'value': '',
            'insuranceCode': ''
        }],
        'extraCost': [],
        'vehicles': ['frg4']
    };

    expect(extract(auction)).toStrictEqual(transport);
});
