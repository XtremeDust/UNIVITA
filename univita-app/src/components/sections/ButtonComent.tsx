export default function Comment() {
    return(
        <div className="flex flex-wrap text-[24px] items-center justify-center p-3 my-5 space-y-4 gap-5">
            <div className="flex flex-col lg:w-3/5 space-y-3">
                <h2 className=" lg:text-4xl text-center lg:text-justify">¿Listo Para Transformar La Experiencia Deportiva?</h2>
                <p className="text-[20px]  text-center lg:text-justify">Queremos que nos des tu opinión y dejes tu experiencia par que podamos seguir creiendo contigo</p>
            </div>
            <a href="#" className="bg-emerald-600 text-[18px] lg:text-[20px] rounded-2xl p-5 hover:shadow-2xl hover:shadow-fuchsia-800 transition-all duration-300">Dejanos Tu Comentario</a>
        </div>
    )
}