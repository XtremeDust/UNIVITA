<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegulationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'title'=>$this->title,
            'file'=>$this->file_url,
            'scope'=>$this->scope,
            'create_by' => $this->whenLoaded('create_by_user', function () {
                return [
                    'id' => $this->create_by->id,
                    'name' => $this->create_by->name,
                ];
            }),
            'fecha_publicacion'=>$this->published,
            
        ];
    }
}
