// בס"ד

import { utilService } from './util.service.js'

export const palceService = {
    search,
}
const GEO_key = 'AIzaSyDIEKT0NOd__sBTWlouu15_p9C8d4jlkA4'
const PLACE_KEY = 'newPlaces'
// _createDemoPlaces()

function _createDemoPlaces() {
    let places = utilService.loadFromStorage(PLACE_KEY)
    if (!places || !places.length) {
        places = [{ id: 123, name: 'jerusalem', lat: 31, lng: 32, createdAt: Date.now(), updatedAt: '' },
        { id: 123, name: 'tel-aviv', lat: 31, lng: 32, createdAt: Date.now(), updatedAt: '' },
        { id: 123, name: 'petah-tikva', lat: 31, lng: 32, createdAt: Date.now(), updatedAt: '' }]

        utilService.saveToStorage(PLACE_KEY, places)
    }


}
function search(searchValue) {
    const termLocationMap = utilService.loadFromStorage(PLACE_KEY) || {}
    if (termLocationMap[searchValue]) return Promise.resolve(termLocationMap[searchValue])

    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchValue}&key=${GEO_key}`)
        .then(res => res.json())
        .then(res => ({
            name: res.results[0].formatted_address,
            location: res.results[0].geometry.location,
            id: res.results[0].place_id,
            createdAt: Date.now(),
            updatedAt: 0,
        })).then(res => {
            termLocationMap[searchValue] = res
            utilService.saveToStorage(PLACE_KEY, termLocationMap)
            console.log('hi');
            
            return res
        })
    //.catch(err=>alert('no place found'))
}

//{id, name, lat, lng, weather, createdAt, updatedAt}
