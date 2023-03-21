const accesoriesBaseUrl = 'http://localhost:3000/api/accessories';

export function getAccessoriesApiCall() {
    const promise = fetch(accesoriesBaseUrl);
    return promise;
}

export function getAccessoryByIdApiCall(accessoryId) {
    const url = `${accesoriesBaseUrl}/${accessoryId}`;
    const promise = fetch(url);
    return promise;
}

export function addAccessoryApiCall(accessory) {
    const accessoryString = JSON.stringify(accessory);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        accessoryString
    };
    const promise = fetch(accesoriesBaseUrl, options);
    return promise;
}

export function updateAccessoryApiCall(accessoryId, accessory) {
    const url = `${accesoriesBaseUrl}/${accessoryId}`;
    const accessoryString = JSON.stringify(accessory);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: accessoryString,
    };
    const promise = fetch(url, options);
    return promise;
}