import React from 'react'
import Right_card from './Right_card'

const Right_content = (props) => {
  return (
   <div className='h-full w-3/4 p-4 flex gap-4'>
      { props.users.map(function(elem,idx){
        return <Right_card img={elem.img} tag={elem.tag} key={idx} id={idx} />
      }

      )}

    </div>
  )
}

export default Right_content
