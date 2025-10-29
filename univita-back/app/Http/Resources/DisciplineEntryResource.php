<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DisciplineEntryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //verificar si usuario individual
        $competitorName = $this->user_id ? $this->user?->name : $this->team?->team_name;
        //si individual valor integrante 1 sino contar
        $memberCount = $this->user_id ? 1 : $this->team?->users?->count() ?? 0;

       return [
            'id' => $this->id,
            'nombre' => $competitorName ?? 'Competidor Desconocido',
            'disciplina' => $this->discipline->sport->title,
            'categoria' => $this->discipline->category,
            'estado' => $this->state,
            'integrantes_total' => $memberCount,
        ];
    }
}
