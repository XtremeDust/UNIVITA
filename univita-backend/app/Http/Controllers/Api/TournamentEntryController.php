<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\TournamentEntryResource;
use App\Models\TournamentEntry;

class TournamentEntryController extends Controller
{
    public function index()
    {
        //Cargamos todas las relaciones anidadas
        $entries = TournamentEntry::with([
            'team.users', // Para 'nombre' y 'integrantes_total'
            'discipline.sport' // Para 'deporte' y 'categoria'
        ])->get();

        return TournamentEntryResource::collection($entries);
    }
}
