<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisciplineEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'discipline_id',
        'user_id', // Puede ser null
        'team_id', // Puede ser null
        'state',
    ];

    // Disciplina a la que se inscribe
    public function discipline()
    {
        return $this->belongsTo(Discipline::class);
    }

    // Usuario inscrito (si es individual)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Equipo inscrito (si es grupal)
    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    // Partidos donde esta inscripción juega como Equipo A
    public function gamesAsTeamA()
    {
        return $this->hasMany(Game::class, 'entry_id_team_a');
    }

    // Partidos donde esta inscripción juega como Equipo B
    public function gamesAsTeamB()
    {
        return $this->hasMany(Game::class, 'entry_id_team_b');
    }
}
