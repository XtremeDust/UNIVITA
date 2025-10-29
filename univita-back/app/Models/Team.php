<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'team_name',
        'logo',
        'color',
        'captain_id',
    ];

    // Capitán del equipo
    public function captain()
    {
        return $this->belongsTo(User::class, 'captain_id');
    }

    // Miembros del equipo
    public function users()
    {
        // Asegúrate que la tabla pivote sea 'team_users'
        return $this->belongsToMany(User::class, 'team_users');
    }

    // Inscripciones de este equipo en disciplinas
    public function disciplineEntries()
    {
        return $this->hasMany(DisciplineEntry::class);
    }
}
