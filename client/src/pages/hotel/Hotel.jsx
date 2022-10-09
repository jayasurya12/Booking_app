import React, { useContext, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLocationDot,faCircleArrowLeft,faCircleXmark,faCircleArrowRight} from '@fortawesome/free-solid-svg-icons'
import './Hotel.css';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/Reserve/Reserve';

const Hotel = () => {
  const {user} =useContext(AuthContext);
  const navigate = useNavigate();
  const [openModel ,setOpenModel] = useState(false);

  const [slideNumber ,setSlideNumber] = useState(0);
  const [open ,setOpen] = useState(false);
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const {data,error,loading}= useFetch(`/hotel/Id/${id}`);
  const photos =[
    {
      src:"https://cdn1.goibibo.com/voy_ing/t_g/13afc4e8a99311e7a17e02755708f0b3.jpg"
    },
    {
      src:"https://ik.imgkit.net/3vlqs5axxjf/external/ik-seo/http://www.cfmedia.vfmleonardo.com/imageRepo/7/0/108/881/243/Club_room_bathroom_O/Trident-Chennai-Room.jpg?tr=w-780%2Ch-437%2Cfo-auto"
    },
    {
      src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/3e/1e/56/itc-one-room.jpg?w=1200&h=-1&s=1"
    },
    {
      src:"https://exp.cdn-hotels.com/hotels/5000000/4950000/4942800/4942760/c30c7448_z.jpg?impolicy=fcrop&w=500&h=333&q=medium"
    },
    {
      src:"https://m.lemontreehotels.com/getattachment/d9db21c6-0c22-42bc-ac3a-5f7e30073097/Superior-Room.aspx"
    },
    {
      src:'https://media-cdn.tripadvisor.com/media/photo-m/1280/18/e9/9c/24/jp-suite-room.jpg'
    }
  ];
  const handleOpen =(index)=>{
    setSlideNumber(index);
    setOpen(true)
  }
  const {dates,options} =useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000*60*60*24;

  function dayDifference(date1,date2){
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays+1;
  }

  const days = (dayDifference(dates[0]?.endDate,dates[0]?.startDate));
  const handleMove =(diresction)=>{
    let newSlideNumber;
    if(diresction === 'left'){
      newSlideNumber = slideNumber === 0 ?5 :slideNumber -1;
    }else{
      newSlideNumber = slideNumber === 5 ? 0 :slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  }
  const handleClick= ()=>{
    if(user){
      setOpenModel(true)
    }else{
      navigator('/login')
    }
  }
  console.log(options)
  return (
    <div>
      <Navbar/>
      <Header type='list'/>
      {
        loading ?"Loading":(
          <div className="hotelContainer">
          {open && (
            <div className="slide">
              <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=>setOpen(false)}/>
              <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={()=>handleMove("left")}/>
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={()=>handleMove("right")}/>
            </div>
          )
          }
          <div className="hotelWrapper">
            <button className="bookNow"
            onClick={handleClick}>Reserver or Book Now!</button>
            <h1 className="hotelTitle">{data?.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot}/>
              <span>{data?.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data?.distance}m from center
            </span>
            <span className="hotelPriceHighLight">
              Book a stay over rupe{data?.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {
                data?.photos?.map((photo,index)=>(
                  <div className="hotelImgWrapper" key={index}>
                    <img src={photo} alt="" 
                    onClick={()=>handleOpen(index)}
                    className="hotelImg" />
                  </div>
                ))
              }
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data?.title}</h1>
                {/* {data.description} */}
                <div className="hotelDesc">
                  {/* Located a 5-minute walk from Chennai Gate in Krakow,Tower
                  Street Apartments has accommodations with air conditioning
                  and free wifi. The units come with hardwoodfloors and features a fully
                  equipped kitchenette with a microwave, a flat-screen TV, and
                  a private bathroom with shower and a hairdryer.
                  A fridge is also offered, as well as an electric tea pot and a coffee machine.
                  Popular points of interest near the apartment include Cloth Hall,
                  Main Market Square and Town Hall Tower. The nearest airport is Chennai international 
                  10km from Tower Street Apartments, and the property offers a paid airport shuttle service.  */}
                  {data?.description}
                </div>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>{days * data?.cheapestPrice*options?.room} rupes</b> ({days} night)
                </h2>
                <button onClick={handleClick}>Reserver or book next!</button>
              </div>
            </div>
          </div>
        <MailList/>
        <Footer/>
        </div>
        )
      }
      {
        openModel &&
        <Reserve setOpen ={setOpenModel} hotelId ={id}/>
      }
    </div>
  )
}

export default Hotel