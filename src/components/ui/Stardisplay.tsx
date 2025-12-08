'use client'
import React from "react";
import Image from "next/image";

interface StarDisplayProps {
    score: number;
    size?: string;
}

export const StarDisplay = ({ score, size = "size-5" }: StarDisplayProps) => {
    return (
        <div className="flex gap-1 items-center" aria-label={`Valoración de ${score} estrellas`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="relative">
                    <Image
                        className={`${size} transition-opacity duration-300 ${
                            star <= score
                            ? 'brightness-100' 
                            : 'grayscale invert-50 opacity-30'
                        }`}
                        src={'/estrella.png'} 
                        alt={star <= score ? "★" : "☆"}
                        width={24} 
                        height={24}
                    />
                </div>
            ))}
        </div>
    );
};