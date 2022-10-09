import React from 'react'
import useFetch from '../../hooks/useFetch';
import './Featured.css';

const Featured = () => {
    const {data,error,loading} = useFetch("/hotel/countByCity?cities=chennai,Bangalore,Kerela,Mumbai,Delhi,Kolkata");
    return (
    <div className='featured'>
        {
            loading ?"Loading Please Wait":
            <>
                <div className="featuredItem">
                    <img src="https://i.ytimg.com/vi/-pcYyJc-X7k/maxresdefault.jpg"
                    alt="" className="featuredImg" />
                    <div className="featuredTitle">
                        <h2>Chennai</h2>
                        <h3>{data[0]} Properties</h3>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://i.ytimg.com/vi/gH4BqhyTS7A/maxresdefault.jpg" alt="" className="featuredImg" />
                    <div className="featuredTitle">
                        <h2>Bangalore</h2>
                        <h3>{data[1]} Properties</h3>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://i.ytimg.com/vi/SoCAELCiLXE/maxresdefault.jpg" alt="" className="featuredImg" />
                    <div className="featuredTitle">
                        <h2>Kerela</h2>
                        <h3>{data[2]} Properties</h3>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://static.toiimg.com/photo/75012798/mumbai-live.jpg?width=748&resize=4" 
                    alt="" className="featuredImg" />
                    <div className="featuredTitle">
                        <h2>Mumbai</h2>
                        <h3>{data[3]} Properties</h3>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg" 
                    alt="" className="featuredImg" />
                    <div className="featuredTitle">
                        <h2>Delhi</h2>
                        <h3>{data[4]} Properties</h3>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://www.holidify.com/images/cmsuploads/compressed/Rain-in-Kolkata3-4_20171124220126.jpg" 
                    alt="" className="featuredImg" />
                    <div className="featuredTitle">
                        <h2>Kolkata</h2>
                        <h3>{data[5]} Properties</h3>
                    </div>
                </div>
            </>
        }
    </div>
  )
}

export default Featured