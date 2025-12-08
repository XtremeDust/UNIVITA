import { card } from "@/types/sports";
import Image from "next/image";
interface SportProps{
    card:card;
}

export function sportInfo({card}:SportProps){
    if(!card){
        return null
    }

    return(
        <div className={` ${card ? 'text-unimar hover:bg-unimar/10 rounded-lg ':'bg-amber-500'}`}>
        <a key={card.id} href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/regulations/${card.reglamento}/download`} 
            className={`card cursor-pointer flex p-2  place-items-center gap-3`}
            onClick={(e) => e.stopPropagation()}
        >
            <Image src={'/R-02.png'} alt={card.sport} width={50} height={50} />
            Desgargar Reglamento de {card.sport}
        </a>
        </div>
    );
}export default sportInfo;