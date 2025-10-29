<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regulation extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by_user',
        'title',
        'file_url',
        'scope',
        'published',
    ];

    protected $casts = [
        'published' => 'date',
    ];

    // Usuario creador
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_user');
    }

    // Entidades a las que está asociado 
    public function tournaments()
    {
        return $this->belongsToMany(Tournament::class, 'tournament_regulations');
    }

    public function disciplines()
    {
        return $this->belongsToMany(Discipline::class, 'discipline_regulations');
    }

    public function activities()
    {
        return $this->belongsToMany(Activity::class, 'activity_regulations');
    }

    public function sports()
    {
        return $this->belongsToMany(Sport::class, 'sport_regulations');
    }
}
