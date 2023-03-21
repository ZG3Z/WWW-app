const equipmentsBaseUrl = 'http://localhost:3000/api/equipments';

export function getEquipmentsApiCall() {
    const promise = fetch(equipmentsBaseUrl);
    return promise;
}

export function getEquipmentByIdApiCall(equipmentId) {
    const url = `${equipmentsBaseUrl}/${equipmentId}`;
    const promise = fetch(url);
    return promise;
}

export function addEquipmentApiCall(equipment) {
    const equipmentString = JSON.stringify(equipment);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: equipmentString
    };
    const promise = fetch(equipmentsBaseUrl, options);
    return promise;
}

export function updateEquipmentApiCall(equipmentId, equipment) {
    const url = `${equipmentsBaseUrl}/${equipmentId}`;
    const equipmentString = JSON.stringify(equipment);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: equipmentString,
    };
    const promise = fetch(url, options);
    return promise;
}