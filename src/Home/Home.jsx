import React from 'react'
import Leftside from '../components/Leftside/Leftside';
import Middle from '../Middel/Middle';
import Right from '../components/right/Right';
import './Home.css'
const Home = () => {
  return (
    <div>
      <div className="main">
       <div className="leftside">
       <Leftside/>
       </div>
       <div className="mid">
       <Middle/>
       </div>
       <div className="right">
       <Right/>
       </div>
      </div>
    </div>
  )
}

export default Home;