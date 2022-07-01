import { DateTime } from 'luxon';



function SearchResults({results}) {

    console.log(results)
    return ( results &&
        <div className="search__results">



            <table>
                <thead>
                <tr>
                    <th>Departure time</th>
                    <th>Flight from</th>
                    <th>Flight to</th>
                    <th>Flight duration</th>
                    <th>Airline</th>
                    <th>Stopovers</th>
                    <th>Available seats</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
            {
                results && results.map((result, i) => {
                    return (
                        <tr key={i}>
                            {/* <td>{result.dTime}</td> */}
                            <td>{DateTime.fromMillis(result.dTime * 1000).toFormat('dd LLL yyyy hh:mm')}</td>


                            
                            <td>{result.cityFrom}</td>
                            <td>{result.cityTo}</td>
                            <td>{result.fly_duration}</td>
                            <td>{result.airlines}</td>
                            <td>{
                            
                            result.route.length > 1 ? 
                            (
                                // for (let i = 0; i < results.route.length - 2; i++) {
                                //     return 
                                // }
                                result.route.map((route, index) => {
                                    if (index < (result.route.length) - 1) {
                                        return <span key={index}>{route.cityTo} </span>
                                    }

                                    // return <span>{route.cityTo}</span>
                                    
                                })
                                
                            )
                            : "No stopovers"
                            
                            }
                            </td>
                            <td>{result.availability.seats}</td>
                            <td>{result.price} €
</td>
                        </tr>
                    )
                })
            }
            </tbody>
            </table>
        </div>
    )
}

export default SearchResults