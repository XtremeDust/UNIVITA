'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Image from "next/image";

interface CustomSearchSelectProps {
  options: string[]; 
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export default function CustomSearchSelect({
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  label,
  disabled = false
}: CustomSearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) setSearchTerm('');
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="w-full relative" ref={wrapperRef}>
      {label && <label className="block text-gray-700 text-md mb-1">{label}</label>}

      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full p-3  border border-gray-400 shadow-md rounded-lg cursor-pointer transition-all
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-univita'}
          ${isOpen ? 'ring-2 ring-unimar border-transparent' : 'border-gray-300'}
        `}
      >
        <span className={`block truncate ${!value ? 'text-gray-400' : 'text-black'}`}>
          {value || placeholder}
        </span>
        
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
             <Image 
                src="https://res.cloudinary.com/dnfvfft3w/image/upload/v1759101273/flecha-hacia-abajo-para-navegar_zixe1b.png" 
                alt="arrow" 
                width={16} 
                height={16} 
             />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          
          <div className="p-2 border-b border-gray-100 bg-gray-50">
            <input
              ref={inputRef}
              autoFocus
              type="text"
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <ul className="max-h-30 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`
                    px-4 py-2 cursor-pointer text-sm transition-colors
                    hover:bg-blue-50 hover:text-blue-700
                    ${value === option ? 'bg-blue-100 font-semibold text-blue-800' : 'text-gray-700'}
                  `}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">
                No se encontraron resultados
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}