<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VarsityTeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'varsity_team_id',
        'season',
    ];

    // El usuario/atleta
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // El equipo universitario al que pertenece
    public function varsityTeam()
    {
        return $this->belongsTo(VarsityTeam::class);
    }
}
