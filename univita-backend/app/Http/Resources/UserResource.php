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
            'name'=>$this->name ?? '',
            'email' => $this->email ?? '',
            'cedula' => $this->cedula ?? '',
            'telefono' => $this->telefono ?? '',
            'role'=>$this->role,
            'team' => $this->whenLoaded('team', function () {
                return [
                    'id' => $this->team->id,
                    'team_name' => $this->team->team_name,
                ];
            }),
        ];
    }
}
