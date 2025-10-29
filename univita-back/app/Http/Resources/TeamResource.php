<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
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
            'nombre' => $this->team_name,
            'logo' => $this->logo,
            'color' => $this->color,
            'captain' => $this->whenLoaded('captain', function () {
                return [
                    'id' => $this->captain->id,
                    'name' => $this->captain->name,
                ];
            }),

            'integrantes_data' => UserResource::collection($this->whenLoaded('users')),
            'integrantes_total' => $this->whenLoaded('users', fn()=>$this->users->count(), 0), 
        ];

    }
}
