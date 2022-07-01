import { useEffect } from "react"
import { useState } from "react"
import  SearchResults  from "./SearchResults"

function SearchFlights() {

    const [flights, setFlights] = useState(null)

    const [origin, setOrigin] = useState("PRG")
    const [departure, setDeparture] = useState("VLC")
    const [isChecked, setIsChecked] = useState(false);

    const loadFlights = async () => {
        const response = await fetch(`https://api.skypicker.com/flights?fly_from=${origin}&fly_to=${departure}&sort=date&direct_flights=${isChecked}&partner=data4youcbp202106`)

        const responseData = await response.json()

        // console.log(responseData.data)
        setFlights(responseData.data)


    }



    useEffect(() => {
        loadFlights()
    }, [origin, departure, isChecked])

    return (
        <>
        <div className="search__container">
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
            <div className="search__inputs">
                <label htmlFor="">Direct flight
                <input type="checkbox" checked={isChecked} onChange={ () => {
                    setIsChecked(!isChecked)
                }
                    
                } />
                </label>
                
            </div>

        </div>

        {
            flights ? <SearchResults results={flights} /> : "No flights available"
        }

        
                


        </>
    )
}

export default SearchFlights