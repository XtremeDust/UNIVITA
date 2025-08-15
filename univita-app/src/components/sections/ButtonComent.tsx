export default function Comment() {
    return(
        <div className="flex flex-wrap text-[24px] items-center justify-center lg:space-y-12 space-y-2 p-3  lg:gap-5 ">                        
            <div className="flex flex-col lg:w-3/5 space-y-3">
                <h2 className=" lg:text-4xl text-center lg:text-justify">¿Listo Para Elevar el nivel de la Experiencia Deportiva?</h2>
                <p className="text-[20px]  text-center lg:text-justify">Queremos que nos des tu opinión y dejes tu experiencia par que podamos seguir creiendo contigo</p>
            </div>
            <a href="#" className="text-[18px] text-white lg:text-[20px] rounded-2xl transition-all duration-300 hover:scale-105 
            bg-[#0d4d98] p-4
            ">               
                    Dejanos Tu Comentario               
            </a>
        </div>
    )
}