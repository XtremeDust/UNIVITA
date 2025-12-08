'use client'
import React, {useRef, useEffect,useState} from 'react'
import Image from "next/image";
import {Card} from '@/types/ui_components'
import {univita} from '@/types/univita'
import {ActiveLink} from "@/components/ui/Router";
import { motion, useInView, Variants } from "framer-motion";

const heroSectionVariants: Variants = {
  initial: { opacity: 0 }, 
  animate: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.3,
      delayChildren: 0.2  
    } 
  },
};

const heroItemVariants: Variants = {
  initial: { opacity: 0, x: -50, scale: 0.9 }, 
  animate: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: {
      duration: 0.8,
      ease: [0.17, 0.55, 0.55, 1],
    }
  },
};

const cardsContainerVariants: Variants = {
  hidden: { transition: { staggerChildren: 0.15, staggerDirection: -1 } }, 
  visible: { 
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2 
    } 
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Univita() {

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 }); 
  const [animateHero, setAnimateHero] = useState(false);

  const cardsRef = useRef(null);
  const areCardsInView = useInView(cardsRef, { once: true, amount: 0.2 });
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    if (isHeroInView) setAnimateHero(true);
  }, [isHeroInView]);

  useEffect(() => {
    if (areCardsInView) setAnimateCards(true);
  }, [areCardsInView]);

  return (
    <div 
      className=' w-full h-full place-content-center place-items-center justify-evenly text-white lg:space-y-10 relative bg-gradient-to-tl from-bg-unimar via-sky-900 to-unimar color-gradient-animation'
    >
      <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/30"></div>

        <motion.section 
          ref={heroRef}
          variants={heroSectionVariants}
          initial='initial'
          animate={animateHero ? "animate" : "initial"}
          className='relative z-20 Univita flex flex-col xl:flex-row my-8 place-items-center w-[98%] justify-evenly'
        >
          <motion.div variants={heroItemVariants}>
            <ActiveLink href='/login'>
              <Image
                className='bg-transparent w-sm sm:w-[20rem] h-[20rem] rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500'
                src={"https://res.cloudinary.com/dnfvfft3w/image/upload/v1759018562/Gemini_Generated_Image_vt78q4vt78q4vt78_1__1_-removebg-preview_1_uwshiz.png"}
                alt='logo'
                width={700}
                height={700}
              />
            </ActiveLink>
          </motion.div>

          <motion.div 
            variants={heroItemVariants}
            className='relative z-20 texto w-[90%] md:w-[48rem] xl:w-[50%] 2xl:w-[50%] place-content-center text-center xl:text-justify space-y-1'
          >
            <h3 className='text-[1.5rem] md:text-[2rem] xl:text-[2.5rem] font-bold'>Bienvenido a Univita</h3>
             <p className='text-[18px] p-1.5'>                
                El nuevo capítulo de la Universidad de Margarita se escribe a través de este módulo: un bastión de eficiencia forjado para la excelencia. Es la plataforma que consolida el espíritu de comunidad, la energía del deporte y la riqueza de la cultura bajo una misma arquitectura digital, garantizando que cada registro, evento y logro se convierta en parte de la historia de nuestra casa de estudios.
              </p> 
          </motion.div>
          
        </motion.section>

        <motion.section
          ref={cardsRef}
          variants={cardsContainerVariants}
          initial="hidden"
          animate={areCardsInView ? "visible" : "hidden"}
          className='relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center p-4 justify-evenly w-full h-full bg-gray-100 text-black '>
          {univita.map((card)=>(
            <motion.div  key={card.id}
              variants={cardItemVariants}
              whileHover={{ scale: 1.05,  }}
              transition={{ duration: 0.3 }}
              className=' group w-full h-full bg-white text-center rounded-xl scale-90 hover:scale-88 shadow-2xl cursor-pointer transition-transform transform duration-300 ease-in-out'
            >
              <Card >
                  <ActiveLink href={card.url} className=' size-full space-y-3 p-6 flex flex-col place-content-center place-items-center text-center'>
                        <div className='p-1.5  bg-blue-200/80 rounded-full flex items-center justify-center mb-4'>
                          <Image
                              className="w-[8rem] rounded-full group-hover:scale-90  transition-all duration-300 ease-in-out bg-unimar"
                              src={card.img}
                              width={500}
                              height={500}
                              alt={card.title}
                              /> 
                        </div>
                        <h3 className='text-[1.4rem] '>{card.title}</h3>
                  </ActiveLink>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/*
        <section className=' flex flex-wrap xl:gap-10 justify-center w-full h-full mb-10 '>
                  {univita.map((card)=>(
                    <Card key={card.id} className='flex flex-row rounded-none group border-dashed not-last:border-b-2 first:border-b-2 not-last:border-0 md:not-first:odd:border-b-0 md:odd:border-r-2 xl:not-last:border-0 xl:not-last:border-r-2 2xl:w-[21rem] card-small'>
                        <ActiveLink href={card.url} className='w-full h-full space-y-3 place-content-center place-items-center text-center p-6'>
                              <Image
                                  className="group-hover:scale-105 transition-all duration-300 ease-in-out w-[8rem] md:w-[10rem] ring-4 ring-white rounded-full"
                                  src={card.img}
                                  width={500}
                                  height={500}
                                  alt={card.title}
                                  /> 
                              <h3 className='text-[18px]'>{card.title}</h3>
                        </ActiveLink>
                      </Card>
                  ))}
        </section>
        */}
    </div>
  )
}
