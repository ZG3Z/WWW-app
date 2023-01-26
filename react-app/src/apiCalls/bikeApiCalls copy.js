const bikesBaseUrl = 'http://localhost:3000/api/bikes';

export function getBikesApiCall() {
    const promise = fetch(bikesBaseUrl);
    return promise;
}

export function getBikeByIdApiCall(bikeId) {
    const url = `${bikesBaseUrl}/${bikeId}`;
    const promise = fetch(url);
    return promise;
}

export function addBikeApiCall(bike) {
    const bikeString = JSON.stringify(bike);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: bikeString
    };
    const promise = fetch(bikesBaseUrl, options);
    return promise;
}

export function updateBikeApiCall(bikeId, bike) {
    const url = `${bikesBaseUrl}/${bikeId}`;
    const bikeString = JSON.stringify(bike);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bikeString,
    };
    const promise = fetch(url, options);
    return promise;
}