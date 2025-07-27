//iconos de las redes

const redes = [
  {
  id:1,
  red:"email",
  Url:"",
  img:"email.png",
  size:"size-6"
  },  
  {
  id:2,
  red:"facebook",
  Url:"",
  img:"facebook.png",
  size:"size-6"
  },  
  {
  id:3,
  red:"instagram",
  Url:"",
  img:"instagram.png",
  size:"size-6"
  },  
  {
  id:4,
  red:"youtube",
  Url:"",
  img:"youtube-03.png",
  size:"size-6"
  },  
  {
  id:5,
  red:"X",
  Url:"",
  img:"gorjeo.png",
  size:"size-6"
  },  
  {
  id:6,
  red:"linkedin",
  Url:"",
  img:"linkedin.png",
  size:"size-6"
  },  
]

 function Redes(){
    return(
        <div className="grid grid-flow-col gap-1 p-1 justify-start">
            {redes.map((icon)=>(
                <a key={icon.id} href={icon.Url}>
                    <img src={icon.img} alt={icon.red} className={icon.size}/>
                </a>
            ))}
        </div>
    );
 }

 export default Redes;