import {useState} from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar';
import {useLocation} from 'react-router-dom';
import {format} from 'date-fns';
import { DateRange } from 'react-date-range';
import './List.css';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';

const List = () => {
  const location = useLocation();
  const [destination,setDestination] = useState(location.state.destination);
  const [dates,setDates] = useState(location.state.dates);
  const [options,setoptions] = useState(location.state.options);
  const [openDate,setOpenDate] = useState(false);
  const [min,setMin] = useState(undefined);
  const [max,setMax] = useState(undefined);

  function capitalize(description) {
    let data =description.toLowerCase();
    return data[0]?.toUpperCase() + data?.slice(1);
  }
  const {data,error,loading,reFetch} = useFetch(`/hotel?city=${capitalize(destination)}&min=${min||0}&max=${max||999}`);
  const handleClick =()=>{
    reFetch();
  };
console.log(options)

  return (
    <div>
      <Navbar/>
      <Header type='list'/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <div className="listTitle">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input type="text" placeholder={destination}/>
              </div>
              <div className="lsItem">
                <label>Check-In-Date</label>
                <span onClick={()=>setOpenDate(!openDate)}>
                  {`
                  ${format(dates[0]?.startDate, "dd/mm/yyy")}
                  to
                  ${format(dates[0]?.endDate, "dd/mm/yyy")}
                  `}
                  </span>
                  {openDate && 
                  <DateRange onChange ={(item)=>{
                    setDates([item.selection])
                  }}
                  minDate={new Date()}
                  ranges ={dates}
                  />}
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min Price <small>per night</small>
                    </span>
                    <input type="Number" 
                    onChange={(e)=>setMin(e.target.value)}
                    className="lsOptionInput" />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max Price <small>per night</small>
                    </span>
                    <input type="Number" 
                    onChange={(e)=>setMax(e.target.value)}
                    className="lsOptionInput" />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Adult
                    </span>
                    <input type="Number" min={1} className="lsOptionInput" placeholder={options?.adult}/>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Children
                    </span>
                    <input type="Number" min={0} className="lsOptionInput" placeholder={options?.children}/>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Room
                    </span>
                    <input type="Number" min={1} className="lsOptionInput" placeholder={options?.room}/>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {
            loading ? "Loading":<>
            
              {data?.map(item=>(
                <SearchItem key={item?._id} item ={item}/>
              ))}
            </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List