<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       return [
            
            'id_suscripcion' => $this->id,

            'suscriptor' => new UserResource($this->whenLoaded('user')),

            'fecha_suscripcion' => $this->created_at->format('d/m/Y'),
            'hace_tiempo' => $this->created_at->diffForHumans(),
        ];
    }
}
