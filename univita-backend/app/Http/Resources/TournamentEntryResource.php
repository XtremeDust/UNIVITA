<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TournamentEntryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->team->team_name, // Renombramos 'team_name' a 'nombre'
            'disciplina'=>$this->discipline->sport->title,
            'categoria'=>$this->discipline->category,
            'estado'=>$this->state,
            'integrantes_total' => $this->team->users->count(),
            
        ];
    }
}
