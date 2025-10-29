<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discipline extends Model
{
    use HasFactory;

    protected $fillable = [
        'tournament_id',
        'sport_id',
        'category',
        'game_mode',
        'state',
        'max_inscrits',
        'formato',
    ];

    // Torneo padre al que pertenece
    public function tournament()
    {
        return $this->belongsTo(Tournament::class);
    }

    // Deporte base de esta disciplina
    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }

    // Inscripciones a esta disciplina (individuales o de equipo)
    public function entries() // Renombrado de tournamentEntries
    {
        return $this->hasMany(DisciplineEntry::class);
    }

    // Partidos que se juegan en esta disciplina
    public function games()
    {
        return $this->hasMany(Game::class);
    }

    // Reglamentos asociados a esta disciplina (a través de tabla pivote)
    public function regulations()
    {
        return $this->belongsToMany(Regulation::class, 'discipline_regulations');
    }
}
