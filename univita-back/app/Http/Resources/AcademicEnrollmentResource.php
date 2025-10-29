<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcademicEnrollmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_inscripcion' => $this->id,
            'estado_inscripcion' => $this->state,
            // datos del estudiante usando UserResource
            'estudiante' => new UserResource($this->whenLoaded('student')), 
            // datos básicos de la oferta académica
            'oferta_academica' => $this->whenLoaded('offering', function() {
                return [
                    'id_oferta' => $this->offering->id,
                    'semestre' => $this->offering->semester,
                    // Carga el deporte si lo necesitas
                    'deporte' => $this->offering->relationLoaded('sport')? $this->offering->sport->title
                                    : null,
                ];
            }),
            'fecha_inscripcion' => $this->created_at->format('Y-m-d'), // Opcional
        ];
    }
}
