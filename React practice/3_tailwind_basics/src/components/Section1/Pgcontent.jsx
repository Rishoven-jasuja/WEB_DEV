import React from 'react'
import Left_content from './Left_content'
import Right_content from './Right_content'
const Pgcontent = (props) => {
  return (
    <div className='py-10 px-10 gap-10 items-center h-[90vh] flex justify-between ml-3.5 mr-7 '>
      <Left_content />
      <Right_content users={props.users}/>
    </div>
  )
}

export default Pgcontent
