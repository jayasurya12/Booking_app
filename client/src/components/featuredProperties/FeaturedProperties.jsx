import React from 'react'
import useFetch from '../../hooks/useFetch';
import './FeaturedProperties.css'

const FeaturedProperties = () => {
  const {data,error,loading} = useFetch("/hotel?featured=true&limit=4");
  const photo =[
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    "https://watermark.lovepik.com/photo/20211120/large/lovepik-hotel-room-picture_500530786.jpg",
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
  ]
  return (
    <div className="fp">
        {
            loading?"Loading plz Wait":
            <>
                {
                    data?.map((item,index)=>(
                        <div className="fpItem" key={item?._id}>
                            <img src={item?.photos[0]} alt="" className="fpImg" />
                            <span className="fpName">{item?.name}</span>
                            <span className="fpCity">{item?.city}</span>
                            <span className="fpPrice">Starting from Rupes{item?.cheapestPrice}</span>
                            {
                                item?.rating &&
                                    <div className="fpRating" >
                                        <button>{item?.rating}</button>
                                        <span>Excellent</span>
                                    </div>
                            }
                            
                        </div>
                    ))
                }
                
            </>
        }
    </div>
  )
}

export default FeaturedProperties