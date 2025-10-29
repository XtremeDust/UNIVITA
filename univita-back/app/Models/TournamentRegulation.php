<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TournamentRegulation extends Model
{
    use HasFactory;

    protected $fillable = [
        'tournament_id',
        'regulation_id',
    ];

    public function tournament()
    {
        return $this->belongsTo(Tournament::class);
    }

    public function regulation()
    {
        return $this->belongsTo(Regulation::class);
    }
}
