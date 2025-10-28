<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Regulation extends Model
{
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_user');
    }

    public function disciplineRegulations()
    {
        return $this->hasMany(DisciplineRegulation::class);
    }

    public function eventRegulations()
    {
        return $this->hasMany(EventRegulation::class);
    }

    public function sportRegulations()
    {
        return $this->hasMany(SportRegulation::class);
    }


}
