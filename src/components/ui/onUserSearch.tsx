'use client'
import React, { useState } from 'react'
import { Input, Button } from '@/types/ui_components'

interface User {
  id: number;
  nombre: string; 
  cedula: string;
  email: string;
  telefono?: string;
}

interface StudentSearchProps {
  onStudentFound: (student: User) => void;
  onStudentNotFound?: (cedula: string) => void;
}

export default function StudentSearch({ onStudentFound, onStudentNotFound }: StudentSearchProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const [searchCedula, setSearchCedula] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setSearchCedula(val);
  };

  const handleSearch = async () => {
    if (!/^[0-9]{7,9}$/.test(searchCedula)) {
        setError("La cédula debe tener entre 7 y 9 dígitos.");
        return;
    }

    setIsSearching(true);
    setError('');

    try {
        const cedulaNormalizada = `V-${searchCedula}`;
        const res = await fetch(`${API_URL}/users/search?cedula=${cedulaNormalizada}`);

        if (res.status === 404) {
            setError('Estudiante no encontrado.');
            if (onStudentNotFound) onStudentNotFound(searchCedula);
            return;
        }

        if (!res.ok) throw new Error('Error en búsqueda');

        const data = await res.json();
        
        onStudentFound(data.data || data); 
        
        setSearchCedula('');

    } catch (err) {
        setError('Error de conexión o servidor.');
        console.error(err);
    } finally {
        setIsSearching(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-700 ml-1">
            Buscar Estudiante
        </label>
        
        <div className="flex gap-2 items-start">
            <div className="flex-1 relative flex items-center">
                <span className="absolute left-3 text-gray-500 pointer-events-none z-10">V-</span>
                <Input 
                    type="text" 
                    placeholder="Cédula (solo números)..."
                    className="input w-full pl-9 py-2 bg-white transition-all focus:ring-2 focus:ring-unimar/50"
                    value={searchCedula}
                    onChange={handleInputChange}
                    onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSearch()}
                    disabled={isSearching}
                />
            </div>
            
            <Button 
                onClick={handleSearch} 
                disabled={isSearching || !searchCedula} 
                className="bg-unimar text-white font-bold px-6 py-2 rounded-xl hover:bg-unimar/90 disabled:opacity-50 transition-colors"
            >
                {isSearching ? '...' : 'Buscar'}
            </Button>
        </div>

        {error && (
            <div className="flex justify-between items-center p-2 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
                <span>{error}</span>
                <button onClick={() => setError('')} className="font-bold px-2">✕</button>
            </div>
        )}
    </div>
  )
}