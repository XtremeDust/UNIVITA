<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\TeamResource;
use App\Models\Team;

class TeamController extends Controller
{
    public function index()
    {
        // Cargamos la relación 'users' que el TeamResource necesita
        $teams = Team::with('users', 'captain')->get();
        
        // Devolvemos una colección del recurso
        return TeamResource::collection($teams);
    }
}
