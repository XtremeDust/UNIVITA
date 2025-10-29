<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by_user',
        'name',
        'descrip',
        'state',
        'img',
        'init_date',
        'end_date',
    ];

    protected $casts = [
        'init_date' => 'date',
        'end_date' => 'date',
    ];

    // Usuario creador
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_user');
    }

    // Disciplinas (torneos específicos) dentro de este torneo padre
    public function disciplines()
    {
        return $this->hasMany(Discipline::class);
    }

    // Reglamentos asociados a este torneo (a través de tabla pivote)
    public function regulations()
    {
        return $this->belongsToMany(Regulation::class, 'tournament_regulations');
    }
}
