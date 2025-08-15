//iconos de las redes
import {rederImg} from "@/types/socialmedia"
import {redes} from "@/types/socialmedia"


 function Redes({size}:rederImg){
    return(
        <ul className="grid grid-flow-col place-items-center gap-1 p-1">
            {redes.map((icon)=>(
                <li key={icon.id} className={size==='size-6' ? size:icon.size}>
                    <a href={icon.Url}>
                        <img src={icon.img} alt={icon.red}/>
                    </a>
                </li>
            ))}
        </ul>
    );
 }

 export default Redes;