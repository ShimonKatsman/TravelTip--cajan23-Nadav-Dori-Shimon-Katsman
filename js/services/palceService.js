// בס"ד

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

export const palceService = {
    search,
    getLocations,
    remove,
}
const GEO_key = 'AIzaSyDIEKT0NOd__sBTWlouu15_p9C8d4jlkA4'
const PLACE_KEY = 'newPlaces'
let gLocations=_createDemoPlaces()
// _createDemoPlaces()

function _createDemoPlaces() {
   return [{ id: '1234', name: 'jerusalem',location: {lat: 31, lng: 32}, createdAt: Date.now(), updatedAt: '' },
        { id: '1234', name: 'tel-aviv',location: {lat: 31, lng: 32}, createdAt: Date.now(), updatedAt: '' },
        { id:'1234', name: 'petah-tikva',location: {lat: 31, lng: 32}, createdAt: Date.now(), updatedAt: '' }]

        
    
}
function remove(id){
 let idx=   gLocations.findIndex(item=>item.id===id)

 gLocations.splice(idx,1)

}
function getLocations(){
    return gLocations
}
function search(searchValue) {
    // const termLocationMap = [utilService.loadFromStorage(searchValue)]
    // console.log('termLocationMap',termLocationMap);
    
    if (gLocations.find(item=>item.searchValue===searchValue)) return Promise.resolve(gLocations)

    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchValue}&key=${GEO_key}`)
        .then(res => res.json())
        .then(res => ({
            searchValue,
            name: res.results[0].formatted_address,
            location: res.results[0].geometry.location,
            id: res.results[0].place_id,
            createdAt: Date.now(),
            updatedAt: 0,
        })).then(res => {
            gLocations.push(res)
            // utilService.saveToStorage(searchValue, res)
            console.log('gLocations',gLocations);
            
            return gLocations
        })
    .catch(err=>alert('no place found'))
}

//{id, name, lat, lng, weather, createdAt, updatedAt}
