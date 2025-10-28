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
    
    public function users()
    {
        return $this->belongsToMany(User::class, 'team_user');
    }

    public function captain()
    {
        return $this->belongsTo(User::class, 'captain_id');
    }

    public function tournamentEntries()
    {
        return $this->hasMany(TournamentEntry::class, 'team_id');
    }

}
