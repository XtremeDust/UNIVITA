import React from 'react'
import Image from "next/image";
import {Card,CardImg} from '@/types/ui_components'
import {univita} from '@/types/univita'

export default function Univita() {
  return (
    <div className='place-content-center w-full h-full place-items-center justify-evenly bg-unimar text-white space-y-6 '>
        <section className='Univita flex flex-col xl:flex-row place-items-center p-2 gap-5 mt-5'>
          <img src="#" alt="logo" className='bg-gray-500 w-sm sm:w-[32rem] h-[24rem] rounded-2xl' />
          <div className='texto w-sm sm:w-[32rem] h-[12rem] lg:w-[48rem] xl:w-[40rem] 2xl:w-[48rem] place-content-center text-justify p-3 space-y-2'>
            <h3 className='text-[3rem]'>Univita</h3>
             <p className='text-[18px] ml-3'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, explicabo. Eos laudantium doloremque beatae voluptas repellendus enim doloribus nulla, nobis, voluptatibus sapiente laborum nihil explicabo fugiat deleniti labore magnam accusantium.
              </p> 
          </div>
        </section>
        <section className=' otros flex flex-wrap gap-5 justify-center-safe w-full h-full space-y-6 mb-5'>
          {univita.map((card)=>(
            <Card key={`${card.id}`} className='grid grid-row rounded-none border-r-2 last:border-0 place-items-center space-y-3 group'>
                <Image
                     className="group-hover:scale-110 transition-all duration-300 ease-in-out"
                     src={card.img}
                     width={105}
                     height={105}
                     alt={card.title}
                     /> 
                <h3 className='text-[18px]'>{card.title}</h3>
            </Card>
          ))}
          
          
         
        </section>
      
    </div>
  )
}
