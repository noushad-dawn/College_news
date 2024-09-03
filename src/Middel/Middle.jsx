import React from 'react'
import Postbox from '../components/postbox/Postbox';
import './Middle.css'
const Middle = () => {
  return (
    <div className='mid'>
      <Postbox 
      username="noushad_dawn"
      postContent={{ type: 'image', src:"./assets/images/barbara.jpg" }} 
      profileImage='./assets/images/barbara.jpg'
      />
    
        <Postbox
      username="Zhongli_morax"
    
      postContent={{ type: 'video', src:'./assets/videos/genshin.mp4' }}
      profileImage='./assets/images/zhongli.webp'
      />
      <Postbox
      username="kunal_verma"

      postContent={{ type: 'image', src:'./assets/images/kunal.jpg'  }} 
      profileImage='./assets/images/kunal.jpg'
      />
      <Postbox
      username="Lucky_666"
      postContent={{ type: 'image', src:'./assets/images/lucky.jpg' }}
      profileImage='./assets/images/lucky.jpg'
      />
    
    </div>
  )
}

export default Middle;