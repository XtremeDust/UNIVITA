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
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  
  const [hasVoted, setHasVoted] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const votedLocally = localStorage.getItem(`voted_event_${eventId}`);
    if (votedLocally) setHasVoted(true);
    setIsVisible(true);
  }, [eventId]);

  if (!isVisible || eventStatus === 'proximo') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) return setError("¡No olvides tocar las estrellas para calificar!");
    if (!email.trim().endsWith('@unimar.edu.ve')) return setError("Usa tu correo institucional (@unimar.edu.ve).");

    setIsSubmitting(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tournament_id: eventId, email, score: rating, comment })
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409 || data.message?.includes('ya votaste')) {
            setHasVoted(true);
            localStorage.setItem(`voted_event_${eventId}`, 'true');
            return;
        }
        throw new Error(data.message || 'Error al enviar');
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
      <div className="w-full bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-500">
         <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">🎉</span>
         </div>
        <h3 className="text-green-800 font-bold text-2xl mb-2">¡Gracias por tu feedback!</h3>
        <p className="text-green-600">Tu opinión nos ayuda a mejorar el deporte en la Unimar.</p>
      </div>
    );
  }

  return (
    <section className="bg-white text-black p-6 md:p-8 rounded-2xl shadow-xl mt-8 border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-unimar/5 rounded-full blur-2xl"></div>

      <div className="relative z-10 text-center md:text-left mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            {eventStatus === 'activo' ? '¿Cómo va el torneo?' : '¿Qué te pareció el evento?'}
        </h3>
        <p className="text-gray-500 mt-2 text-lg">
            Tu voz cuenta. Califícanos en segundos.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
      <div className="flex gap-3 justify-center md:justify-start py-2">
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
                    : 'grayscale opacity-30 hover:grayscale-0'
                }`}
                src={'/estrella.png'} 
                alt={`estrella ${star}`}
                width={60}
                height={60}
            />
        </button>
      ))}
      </div>

        <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">Correo Institucional</label>
                <Input 
                    type="email" 
                    placeholder="usuario@unimar.edu.ve" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-gray-50 border-gray-200 focus:ring-unimar focus:border-unimar rounded-xl py-3 px-4"
                />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">Comentario (Opcional)</label>
                <Input 
                    type="text" 
                    placeholder="¿Algo que destacar?" 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-gray-50 border-gray-200 focus:ring-unimar focus:border-unimar rounded-xl py-3 px-4"
                />
            </div>
        </div>

        {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm text-center font-medium animate-pulse">
                ⚠️ {error}
            </div>
        )}

        <div className="flex justify-end pt-2">
            <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto bg-unimar hover:bg-unimar/90 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-unimar/20 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Enviando...' : 'Enviar Valoración'}
            </Button>
        </div>
      </form>
    </section>
  )
}