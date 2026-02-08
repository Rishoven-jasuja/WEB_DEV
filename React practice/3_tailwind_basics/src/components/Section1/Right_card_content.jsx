import React from 'react'
import { MoveRight } from 'lucide-react'

const Right_card_content = (props) => {
  return (
    <div className='absolute top-0 left-0 h-full w-full p-6 flex flex-col justify-between'>
      
      <h2 className='bg-white text-2xl font-bold rounded-full h-10 w-10 flex justify-center items-center'>
        {props.id +1}
      </h2>

      <div>
        <p className='leading-loose text-lg p-2 font-sans text-white mt-16'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, optio?
        </p>
      </div>

      <div className='flex gap-5'>
        <button className='bg-blue-400 flex-1 h-10 text-lg font-semibold rounded-3xl text-white'>
         {props.tag}
        </button>

        <button className='bg-blue-400 h-10 w-12 flex justify-center items-center rounded-3xl text-white'>
          <MoveRight size={32} />
        </button>
      </div>

    </div>
  )
}

export default Right_card_content
