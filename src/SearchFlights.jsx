import { useEffect } from "react"
import { useState } from "react"
import  SearchResults  from "./SearchResults"

function SearchFlights() {

    const [flights, setFlights] = useState(null)
    const [flightsLoading, setFlightsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [date, setDate] = useState("")
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

                setFlights(sortedData)
                setFlightsLoading(false)
            }
    

            

    }



    // useEffect(() => {
    //     loadFlights()
    // }, [])

    return (
        <>
        <div className="search__container">
            <h2  className="search__title">Search for your flight!</h2>
            <div className="search__inputs">
                <input type="date" onChange={
                    (e) => {
                        setDate("&depart_after="+ e.target.value + "T00:00")
                    }
                }/>
            </div>
            <div className="search__inputs">
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
            <div className="search__inputs checkbox">
                <label htmlFor="">
                <input type="checkbox" checked={isChecked} onChange={ () => {
                    setIsChecked(!isChecked)
                }
                    
                } />Direct flight
                </label>
                
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
            
            
            (flightsLoading ? <div className="loadingio-spinner-reload-c8ho0od0x2l"><div className="ldio-hmrmmska1oq">
            <div><div></div><div></div><div></div></div>
            </div></div> : <SearchResults results={flights} />)

        }

        
                


        </>
    )
}

export default SearchFlights