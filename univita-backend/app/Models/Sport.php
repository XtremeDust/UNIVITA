<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_user');
    }

    public function disciplines()
    {
        return $this->hasMany(Discipline::class);
    }

    public function sportRegulations()
    {
        return $this->hasMany(SportRegulation::class);
    }
    
}
