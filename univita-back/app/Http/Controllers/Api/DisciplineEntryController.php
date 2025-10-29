<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DisciplineEntryResource;
use App\Models\DisciplineEntry;
use Illuminate\Http\Request;

class DisciplineEntryController extends Controller
{
    public function index()
    {
        
        $entries = DisciplineEntry::with([
            'team.users',       // Necesario para 'nombre' y 'integrantes_total'
            'discipline.sport'  // Necesario para 'disciplina' y 'categoria'
        ])->get();

     
        return DisciplineEntryResource::collection($entries);
    }
}
