interface BtProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export function Button ({children, className, ...props}:BtProps){
    
    const variants = {
        'primary':'',
        'secondary':''
    }
    return(
        <button className={`clase padre ${className}`}
        {...props}
        >
            {children}            
        </button>
   ) 
 } export default Button