import React from 'react'
import Leftside from '../../Leftside/Leftside';
import SearchPage from '../SearchPage';
import './Wholesearch.css'
const Wholesearch = () => {
  return (
    <div className='main-search'>
        <div className="leftcompo">
        <Leftside/>
        </div>
       <div className="seracrh-compo">
       <SearchPage/>
       </div>
    </div>
  )
}

export default Wholesearch;