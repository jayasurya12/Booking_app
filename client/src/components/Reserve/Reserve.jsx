import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Reserve.css';

const Reserve = ({ setOpen, hotelId }) => {
    const navigate = useNavigate();

    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotel/room/${hotelId}`);
    const { dates } = useContext(SearchContext);
  
    const getDatesInRange = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const date = new Date(start.getTime());
      const dates = [];
  
      while (date <= end) {
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }
      return dates;
    };
  
    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  
    const isAvailable = (roomNumber) => {
      const isFound = roomNumber.unavailableDate.some((date) => 
      alldates.includes(new Date(date).getTime()));
      return !isFound;
    };
  
    const handleSelect = (e) => {
      const checked = e.target.checked;
      const value = e.target.value;
      setSelectedRooms(
        checked
          ? [...selectedRooms, value]
          : selectedRooms.filter((item) => item !== value)
      );
    };
  
    const handleClick = async () => {
      try {
        const data = await Promise.all(selectedRooms.map((roomId) => {
            const data = axios.put(`/room/availability/${roomId}`,{dates: alldates});
            return data;
          })
        );
        setOpen(false);
        console.log(data[0].data);
        toast.success(`🦄 ${data[0].data.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        setTimeout(() => {
          navigate("/");
        }, 8000);
        
      } catch (err) {
        console.log(err);
      }
    };
    return (
        <div className="reserve">
          <div className="rContainer">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="rClose"
              onClick={() => setOpen(false)}
            />
            <span>Select your rooms:</span>
            {data?.map((item) => (
              <div className="rItem" key={item?._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item?.title}</div>
                  <div className="rDesc">{item?.description}</div>
                  <div className="rMax">
                    Max people: <b>{item?.maxPeople}</b>
                  </div>
                  <div className="rPrice">{item?.price}</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => (
                    <div className="room" key={roomNumber._id}>
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleClick} className="rButton">
              Reserve Now!
            </button>
          </div>
        </div>
      );
}

export default Reserve