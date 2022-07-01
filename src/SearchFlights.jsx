import { useEffect } from "react"
import { useState } from "react"
import  SearchResults  from "./SearchResults"

function SearchFlights() {

    const [flights, setFlights] = useState(null)
    const [flightsLoading, setFlightsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [date, setDate] = useState("")
    const [people, setPeople] = useState(1)
    const [origin, setOrigin] = useState("")
    const [departure, setDeparture] = useState("")
    const [isChecked, setIsChecked] = useState(false);

    const loadFlights = async () => {


            const response = await fetch(`https://api.skypicker.com/flights?sort=date&asc=1&fly_from=${origin}&fly_to=${departure}${date}&direct_flights=${isChecked}&partner=data4youcbp202106`)

            const responseData = await response.json()

            console.log(responseData)

            if (responseData.status === "Bad Request") {
                setError(responseData.error)
                setFlightsLoading(false)

            } else {
                const sortedData = responseData.data.sort(
                    (a, b) => {
                        return a.dTime - b.dTime
                    }
                )

                const filterByPeople = sortedData.filter((e, i) => {
                    return e.availability.seats > people
                })

                setFlights(filterByPeople)
                setFlightsLoading(false)
            }
    

            

    }




    return (
        <>
        <div className="search__container">
            <h2  className="search__title">Search for your flight!</h2>
           
            <div className="search__inputs">
                <label htmlFor="">Date:</label>
                <input className="search__date" type="date" onChange={
                    (e) => {
                        setDate("&depart_after="+ e.target.value + "T00:00")
                    }
                }/>
                        <div className="checkbox">

                            <label htmlFor="">
                <input type="checkbox" checked={isChecked} onChange={ () => {
                    setIsChecked(!isChecked)
                }
                    
                } />Direct flight
                </label>

                
            </div>
            </div>
            <div className="search__inputs">
            <label htmlFor="">Departure from:</label>
                <select className="search__origin" name="" id="search__origin" onChange={
                    (e) => {
                        setOrigin(e.target.value)
                    }
                }>
                    <option value="">Select departure </option>
                    <option value="PRG">Prague</option>
                    <option value="BER">Berlin</option>
                    <option value="WAW">Warsaw</option>
                    <option value="PED">Pardubice</option>

                </select>
            </div>
            <div className="search__inputs">
            <label htmlFor="">Arrival at:</label>
                <select className="search__" name="" id="search__destination" onChange={
                    (e) => {
                        setDeparture(e.target.value)
                    }
                }>
                    <option value="">Select destination</option>
                    <option value="VLC">Valencia</option>
                    <option value="BCN">Barcelona</option>
                    <option value="MAD">Madrid</option>
                    <option value="MXP">Milano</option>
                    <option value="ATH">Athens</option>
                </select>
            </div>
            <div className="search__inputs">
            <label htmlFor="">Number of travellers:</label>
            <input placeholder="Type a number" className="search__people" type="number" onChange={
                (e) => {
                    setPeople(e.target.value)
                }
            }/>
              
            </div>

            <button className="search__button" onClick={
                () => {
                    loadFlights()
                    setFlightsLoading(true)
                }
                
                }>SEARCH!</button>



        </div>

        {
            
            error ? <div className="search__error">{error}</div> :
            
            
            // (flightsLoading ? <div className="loadingio-spinner-reload-c8ho0od0x2l"><div className="ldio-hmrmmska1oq">
            // <div><div></div><div></div><div></div></div>
            // </div></div> : <SearchResults results={flights} />)
            (flightsLoading ?   (<svg class="svg-calLoader" xmlns="http://www.w3.org/2000/svg" width="230" height="230"><path class="cal-loader__path" d="M86.429 40c63.616-20.04 101.511 25.08 107.265 61.93 6.487 41.54-18.593 76.99-50.6 87.643-59.46 19.791-101.262-23.577-107.142-62.616C29.398 83.441 59.945 48.343 86.43 40z" fill="none" stroke="#0099cc" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10 10 10 10 10 10 432" stroke-dashoffset="77"/><path class="cal-loader__plane" d="M141.493 37.93c-1.087-.927-2.942-2.002-4.32-2.501-2.259-.824-3.252-.955-9.293-1.172-4.017-.146-5.197-.23-5.47-.37-.766-.407-1.526-1.448-7.114-9.773-4.8-7.145-5.344-7.914-6.327-8.976-1.214-1.306-1.396-1.378-3.79-1.473-1.036-.04-2-.043-2.153-.002-.353.1-.87.586-1 .952-.139.399-.076.71.431 2.22.241.72 1.029 3.386 1.742 5.918 1.644 5.844 2.378 8.343 2.863 9.705.206.601.33 1.1.275 1.125-.24.097-10.56 1.066-11.014 1.032a3.532 3.532 0 0 1-1.002-.276l-.487-.246-2.044-2.613c-2.234-2.87-2.228-2.864-3.35-3.309-.717-.287-2.82-.386-3.276-.163-.457.237-.727.644-.737 1.152-.018.39.167.805 1.916 4.373 1.06 2.166 1.964 4.083 1.998 4.27.04.179.004.521-.076.75-.093.228-1.109 2.064-2.269 4.088-1.921 3.34-2.11 3.711-2.123 4.107-.008.25.061.557.168.725.328.512.72.644 1.966.676 1.32.029 2.352-.236 3.05-.762.222-.171 1.275-1.313 2.412-2.611 1.918-2.185 2.048-2.32 2.45-2.505.241-.111.601-.232.82-.271.267-.058 2.213.201 5.912.8 3.036.48 5.525.894 5.518.914 0 .026-.121.306-.27.638-.54 1.198-1.515 3.842-3.35 9.021-1.029 2.913-2.107 5.897-2.4 6.62-.703 1.748-.725 1.833-.594 2.286.137.46.45.833.872 1.012.41.177 3.823.24 4.37.085.852-.25 1.44-.688 2.312-1.724 1.166-1.39 3.169-3.948 6.771-8.661 5.8-7.583 6.561-8.49 7.387-8.702.233-.065 2.828-.056 5.784.011 5.827.138 6.64.09 8.62-.5 2.24-.67 4.035-1.65 5.517-3.016 1.136-1.054 1.135-1.014.207-1.962-.357-.38-.767-.777-.902-.893z" className="cal-loader__plane" fill="#000033"/></svg>) : <SearchResults results={flights} />)

        }

        
                


        </>
    )
}

export default SearchFlights