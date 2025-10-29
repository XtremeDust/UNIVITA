<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Carga la relación 'teams' para incluirla en el Resource
        $users = User::with('teams')->get();

        // Devuelve la colección formateada por UserResource
        return UserResource::collection($users);
    }

    public function show(User $user)
    {
        // Carga las relaciones que quieras mostrar para un solo usuario
        $user->load('teams', 'captainOfTeams');
        // Devuelve un solo recurso
        return new UserResource($user);
    }
}
