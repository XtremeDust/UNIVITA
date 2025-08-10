//iconos de las redes

const redes = [
  {
  id:1,
  red:"email",
  Url:"info@unimar.edu.ve",
  img:"email.png",
  size:"size-6"
  },  
  {
  id:2,
  red:"facebook",
  Url:"https://www.facebook.com/share/1CJrXgVUPe/",
  img:"facebook.png",
  size:"size-6"
  },  
  {
  id:3,
  red:"instagram",
  Url:"https://www.instagram.com/universidademargarita",
  img:"instagram.png",
  size:"size-6"
  },  
  {
  id:4,
  red:"youtube",
  Url:"https://www.youtube.com/channel/UCnRVkJ1OW2oLN_TpvXAnUyw",
  img:"youtube-03.png",
  size:"size-6"
  },  
  {
  id:5,
  red:"X",
  Url:"https://www.twitter.com/somosunimar",
  img:"gorjeo.png",
  size:"size-6"
  },  
  {
  id:6,
  red:"linkedin",
  Url:"https://www.linkedin.com/company/univdemargarita",
  img:"linkedin.png",
  size:"size-6"
  },  
]

 function Redes(){
    return(
        <ul className="grid grid-flow-col place-items-center gap-1 p-1">
            {redes.map((icon)=>(
                <li key={icon.id} className={icon.size}>
                    <a href={icon.Url}>
                        <img src={icon.img} alt={icon.red}/>
                    </a>
                </li>
            ))}
        </ul>
    );
 }

 export default Redes;