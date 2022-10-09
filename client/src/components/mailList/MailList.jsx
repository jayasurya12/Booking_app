import React from 'react'
import './MailList.css'

const MailList = () => {
  return (
    <div className="mail">
        <h1 className="mailTitle">Save time, save money!</h1>
        <span className="mailDesc">Sihn up and we'll send the best details to you.</span>
        <div className="mailInputCountainer">
            <input type="text" placeholder='Your Eamil' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default MailList