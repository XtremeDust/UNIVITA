'use client'
import React, { useState, useEffect } from 'react'
import { Button, Input } from '@/types/ui_components'
import Image from 'next/image'

interface EventRatingProps {
  eventId: number;
  eventStatus: 'proximo' | 'activo' | 'finalizado';
}

export default function EventRatingSection({ eventId, eventStatus }: EventRatingProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
    const [hoverRating, setHoverRating] = useState(0);
  
  const [hasVoted, setHasVoted] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

   if (eventStatus !== 'finalizado') return null; 

  useEffect(() => {
    const votedLocally = localStorage.getItem(`voted_event_${eventId}`);
    if (votedLocally) {
      setHasVoted(true);
    }
    setIsVisible(true);
  }, [eventId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) return setError("Por favor, selecciona una puntuación.");
    if (!email.trim().endsWith('@unimar.edu.ve')) return setError("Debes usar tu correo institucional (@unimar.edu.ve).");

    setIsSubmitting(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      
      const res = await fetch(`${API_URL}/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tournament_id: eventId,
          email,
          score: rating,
          comment
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409 || data.message?.includes('ya votaste')) {
            setHasVoted(true);
            localStorage.setItem(`voted_event_${eventId}`, 'true');
            return;
        }
        throw new Error(data.message || 'Error al enviar valoración');
      }

      setHasVoted(true);
      localStorage.setItem(`voted_event_${eventId}`, 'true');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasVoted) {
    return (
      <div className="animate-in fade-in zoom-in duration-300 bg-green-50 p-6 rounded-xl text-center border border-green-200 mt-8">
        <h3 className="text-green-800 font-bold text-xl">¡Gracias por tu opinión!</h3>
        <p className="text-green-600">Ya hemos registrado tu voto para este torneo.</p>
      </div>
    );
  }


  return (
    <section className="bg-white text-black p-6 rounded-xl shadow-md mt-8 border border-gray-100 transition-all duration-300">
        <div className="relative z-10 text-center md:text-left mb-6">
            <h3 className="text-lg md:text-2xl font-semibold text-gray-800">
                ¿Qué te pareció el evento?
            </h3>
            <p className="text-gray-500 mt-2 text-md">
                Tu voz cuenta. Califícanos en segundos.
            </p>
        </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        
      <div className="flex gap-3 justify-center py-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
          
        >
            <Image 
                className={`size-10 md:size-12 transition-all duration-200 ${
                    star <= (hoverRating || rating)
                    ? 'brightness-100 drop-shadow-md' 
                    : ' invert-50 grayscale-50 opacity-30 hover:grayscale-0'
                }`}
                src={'/estrella.png'} 
                alt={`estrella ${star}`}
                width={60}
                height={60}
            />
        </button>
      ))}
      </div>

        <div className="grid gap-4 md:grid-cols-2">
            <Input 
                type="email" 
                placeholder="tu.correo@unimar.edu.ve" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full input" 
            />
            <Input 
                type="text" 
                placeholder="Comentario (opcional)" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full input"
            />
        </div>

        {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium">
                {error}
            </div>
        )}

        <div className="flex justify-end">
            <Button 
                type="submit" 
                disabled={isSubmitting}
                className={`
                    bg-unimar text-white px-6 py-2 rounded-lg 
                    hover:opacity-90 transition-all active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center gap-2
                `}
            >
                {isSubmitting ? (
                    <>Enviando...</>
                ) : 'Enviar Valoración'}
            </Button>
        </div>
      </form>
    </section>
  )
}