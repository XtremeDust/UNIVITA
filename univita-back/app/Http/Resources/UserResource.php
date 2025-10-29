<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'nombre' => $this->name,
            'email' => $this->email,
            'rol' => $this->role,
            'cedula' => $this->cedula,
            'telefono' => $this->telefono,
            'team' => $this->whenLoaded('teams', function () {
                return $this->teams->map(fn($team) => [
                    'id' => $team->id,
                    'team_name' => $team->team_name,
                ])->all();
            }),
            
        ];
    }
}
