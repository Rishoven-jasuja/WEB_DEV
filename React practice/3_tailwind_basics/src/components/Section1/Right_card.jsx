import React from 'react'
import {MoveRight} from 'lucide-react'
import Right_card_content from './Right_card_content'
const Right_card = (props) => {
  return (
    <div className='h-full w-1/3 p-4 rounded-3xl overflow-hidden relative'>
      <img className='h-full w-full object-cover rounded-3xl' src={props.img}></img>
      
      <Right_card_content tag={props.tag} id={props.id}/>
        
      </div>
   
  
  )
}

export default Right_card
