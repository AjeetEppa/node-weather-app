const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const tempMin = document.querySelector('#tempMin')
const tempMax = document.querySelector('#tempMax')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ""
    tempMin.textContent = ""
    tempMax.textContent = ""
    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data)=> {
            if (data.error) {
               return messageOne.textContent  = data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData
            tempMin.textContent = "Minimum Temperture : "+ data.temperatureMin +"."
            tempMax.textContent = "Maximum Temperture : "+ data.temperatureMax +"."
        })
    })

})