// בס"ד

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { palceService } from './services/palceService.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSreach = onSreach


//https://maps.googleapis.com/maps/api/geocode/json?address= &key=AIzaSyDIEKT0NOd__sBTWlouu15_p9C8d4jlkA4
function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// function onAddPet() {
//     const newPet = petService.getEmptyPet()
//     newPet.name = utilService.randomPetName()
//     console.log('newPet', newPet)
//     petService.save(newPet).then(loadPets)

// }
function onSreach(ev) {
    ev.preventDefault()
    let elInput = document.querySelector('[type="search"]')
    let sreachValue = elInput.value
    palceService.search(sreachValue)
        .then(renderPlaces)


    console.log('value', elInput);

}
function renderPlaces(places) {
    const { id, name, location, createdAt,updatedAt } = places
    const strHtml = `<tr class="location-info ${id}">
    <td>${id.slice(0,3)}</td>
    const { id, name, location, createdAt } = places
    const strHtml = <tr class="location-info ${id}">
    <td>${id.slice(0, 3)}</td>
    <td>${name}</td>
    <td>${location.lat}</td>
    <td>${location.lng}</td>
    <td>${createdAt}</td>
    <td>${updatedAt}</td>
    <td><button onclick="onRemove(${id})">X</button></td> 
</tr>`
document.querySelector('.table-body').innerHTML+=strHtml

}
// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}