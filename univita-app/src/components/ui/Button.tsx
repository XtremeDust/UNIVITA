interface BtProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: string;
}


export function Button ({children, className, variant ,...props}:BtProps){
    
    
    return(
        <button className={`clase padre ${className} ${variant}`}
        {...props}
        >
            {children}            
        </button>
   ) 
 } export default Button


 /*
 const variants = {
        'primary':'text-[18px] text-white lg:text-[20px] rounded-xl transition-all duration-300 hover:scale-105 bg-unimar py-2 px-4',
        'secondary':'text-[18px] text-white lg:text-[20px] rounded-xl transition-all duration-300 hover:scale-105 bg-gray-500 px-4 py-2',
        'danger':'text-[18px] text-white lg:text-[20px] transition-all duration-300 hover:scale-105 bg-red-500 px-3 py-1'
    }
 */