import Image from 'next/image'
import React from 'react'

const Empty = ({label}: {label?: string}) => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
        <div className='relative w-[200px] h-[200px]'>
            <Image src={"/assets/empty.png"} alt='empty' fill className='object-center object-cover'/>
        </div>
        <p>{label}</p>
    </div>
  )
}

export default Empty