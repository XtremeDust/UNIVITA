import Image from "next/image";

const MagicButton = ({ url, isAvailable }: { url?: string, isAvailable: boolean }) => {
    if (isAvailable && url) {
        return (
            <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-1 bg-unimar text-white px-2.5 py-0.5 rounded-xl font-semibold shadow-md shadow-unimar/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-unimar/40 active:scale-95"
            >
                <span>Descargar</span>
                <Image 
                    src={'/descarga.png'}
                    alt="download" 
                    width={35} 
                    height={35} 
                    className=" invert grayscale transition-transform group-hover:-translate-y-0.5" 
                /> 
            </a>
        );
    }
    return (
        <div className="px-4 py-2 bg-gray-100 text-gray-400 text-sm font-medium rounded-lg border border-gray-200 border-dashed cursor-not-allowed select-none">
            No disponible
        </div>
    );
}; export default MagicButton