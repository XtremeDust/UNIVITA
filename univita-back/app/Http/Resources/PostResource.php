<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'titulo' => $this->title,
            'contenido' => $this->body,
            'estado' => $this->status,
            // Incluimos al autor usando UserResource
            'autor' => new UserResource($this->whenLoaded('user')),
            'fecha_creacion' => $this->created_at->format('d/m/Y'),
            //'fecha_actualizacion' => $this->updated_at->format('d/m/Y'),
        ];
    }
}
