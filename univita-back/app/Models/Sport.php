<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by_user',
        'title',
        'descrip',
        'mode',
    ];

    // Usuario creador
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_user');
    }

    // Disciplinas (torneos)
    public function disciplines()
    {
        return $this->hasMany(Discipline::class);
    }

    // Ofertas académicas
    public function academicOfferings()
    {
        return $this->hasMany(AcademicOffering::class);
    }

    // Equipos universitarios (selecciones)
    public function varsityTeams()
    {
        return $this->hasMany(VarsityTeam::class);
    }

    // Reglamentos asociados a este deporte
    public function regulations()
    {
        return $this->belongsToMany(Regulation::class, 'sport_regulations');
    }
}
