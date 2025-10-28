<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discipline extends Model
{
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }

    public function tournamentEntries()
    {
        return $this->hasMany(TournamentEntry::class, 'discipline_id');
    }

    public function disciplineRegulations()
    {
        return $this->hasMany(DisciplineRegulation::class);
    }

}
