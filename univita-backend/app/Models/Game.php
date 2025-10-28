<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;  
    
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function teamA()
    {
        return $this->belongsTo(TournamentEntry::class, 'entryId_team_a');
    }

    public function teamB()
    {
        return $this->belongsTo(TournamentEntry::class, 'entryId_team_b');
    }

    public function nextGame()
    {
        return $this->belongsTo(Game::class, 'next_match_id');
    }


    public function previousGame()
    {
        return $this->hasOne(Game::class, 'next_match_id');
    }
}
