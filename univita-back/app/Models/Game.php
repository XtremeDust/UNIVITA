<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'entry_id_team_a',
        'score_a',
        'entry_id_team_b',
        'score_b',
        'discipline_id',
        'state',
        'date_matches',
        'ronda',
        'next_match_id',
    ];

    protected $casts = [
        'date_matches' => 'datetime',
    ];

    // Disciplina a la que pertenece el partido
    public function discipline()
    {
        return $this->belongsTo(Discipline::class);
    }

    // Inscripción del Competidor A
    public function entryTeamA() // Renombrado de teamA
    {
        return $this->belongsTo(DisciplineEntry::class, 'entry_id_team_a');
    }

    // Inscripción del Competidor B
    public function entryTeamB() // Renombrado de teamB
    {
        return $this->belongsTo(DisciplineEntry::class, 'entry_id_team_b');
    }

    // Siguiente partido en la llave/bracket
    public function nextGame()
    {
        return $this->belongsTo(Game::class, 'next_match_id');
    }

    // Partido(s) anterior(es)
    public function previousGames()
    {
        return $this->hasMany(Game::class, 'next_match_id');
    }
}
