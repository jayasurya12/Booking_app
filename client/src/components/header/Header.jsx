import './Header.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBed,faPlane,faCar,faTaxi,faCalendarDays,faPerson} from '@fortawesome/free-solid-svg-icons'
import {useContext, useState} from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import {useNavigate,Link} from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Header = ({type}) => {
    const [openDate, setOpenDate]=useState(false);
    const [destination,setDestination] =  useState("")
    const {user} =useContext(AuthContext)
    const [dates,setDates] =  useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
      const [openOption, setOpenOption]=useState();
      const [options, setOptions]=useState({
        adult:1,
        children:0,
        room:1
      });
      const navigate = useNavigate();
      const handleOption =(name,operation)=>{
        setOptions(pre=>{
            return {
                ...pre,
                [name]:operation === "i" ? options[name] +1 :options[name] -1
            }
        })
      }
      const {dispatch} = useContext(SearchContext);
      const handleSearch = async()=>{
        try {
            function convention(city){
                return city.toLowerCase().charAt(0).toUpperCase()+city.slice(1);
            };
            if(destination.length>1){
                
                const data = await axios.get(`https://booking-appz.herokuapp.com/api/hotel?city=${convention(destination)}`);
                if(data.status== 404){
                   return toast.error(data.response.data.msg, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                }
                dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
                navigate('/list',{state:{destination,dates,options}})
            }else{
                toast.error("Plz Enter the City Name", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        } catch (error) {
            toast.error(error.response.data.msg, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        } 
       
    }
  return (
    <div className='header'>
        <div className={type === 'list'?"headerContainer listMode":"headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stay</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flight</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car rental</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Attraactions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Taxi</span>
                </div>
            </div>
            {
            type!=='list' &&
                <>
                    <h1 className='headerTitle'>A lifetime of discount? It's Genius.</h1>
                    <p className='headerDesc'>
                        Get rewarded for travel - unlock instant save of 10% or more with Roombooking account
                    </p>
                    {
                        !user &&
                        <Link to='/LoginSignup'><button className="headerBtn">Sign in / Register</button></Link>
                    }
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faTaxi} className='headerIcon'/>
                            <input type='text' 
                                placeholder='Where are you going'
                                className='headerSearchInput'
                                onChange={e=>setDestination(e.target.value)}
                            />
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
                            <span 
                                className="headerSearchText"
                                onClick={()=>setOpenDate(!openDate)}
                            >
                                    {`${format(dates[0].startDate,"dd/mm/yyy")} to ${format(dates[0].endDate,"dd/mm/yyy")}`}
                            </span>
                            {
                                openDate?<DateRange
                                editableDateInputs={true}
                                onChange={item => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                minDate ={new Date()}
                                className='date'
                            />:""
                            }
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
                            <span className="headerSearchText" onClick={()=>setOpenOption(!openOption)}>
                                {`${options.adult} adult . ${options.children} children . ${options.room} room`}
                            </span>
                        {
                            openOption &&
                            <div className="options">
                            <div className="optionItem">
                                <span className="optionText">adult</span>
                                <div className="optionCounter">
                                    <button className="optionCounterButton" disabled={options.adult <=1} onClick={()=>handleOption("adult","d")}>-</button>
                                    <span className="optionCounterNumber">{options.adult}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("adult","i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">children</span>
                                <div className="optionCounter">
                                    <button className="optionCounterButton" disabled={options.children <=0} onClick={()=>handleOption("children","d")}>-</button>
                                    <span className="optionCounterNumber">{options.children}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("children","i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">room</span>
                                <div className="optionCounter">
                                    <button className="optionCounterButton" disabled={options.room <=1} onClick={()=>handleOption("room","d")}>-</button>
                                    <span className="optionCounterNumber">{options.room}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("room","i")}>+</button>
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </>
            }
        </div>
        <ToastContainer 
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </div>
  )
}

export default Header