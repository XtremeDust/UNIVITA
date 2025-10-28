<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TournamentEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'team_id',
        'discipline_id',
        'state',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id');
    }

    public function discipline()
    {
        return $this->belongsTo(Discipline::class, 'discipline_id');
    }

    public function gamesAsTeamA()
    {
        return $this->hasMany(Game::class, 'entryId_team_a');
    }

    public function gamesAsTeamB()
    {
        return $this->hasMany(Game::class, 'entryId_team_b');
    }
}
