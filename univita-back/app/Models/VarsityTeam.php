<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VarsityTeam extends Model
{
    use HasFactory;

    protected $fillable = [
        'sport_id',
        'category',
        'coach_user_id',
    ];

    // Deporte de la selección
    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }

    // Entrenador de la selección
    public function coach()
    {
        return $this->belongsTo(User::class, 'coach_user_id');
    }

    // Miembros de la plantilla
    public function members()
    {
        return $this->hasMany(VarsityTeamMember::class);
    }

     // Relación many-to-many para obtener directamente los usuarios/atletas
    public function players()
    {
        return $this->belongsToMany(User::class, 'varsity_team_members', 'varsity_team_id', 'user_id')
                    ->withPivot('season') 
                    ->withTimestamps();
    }
}
