<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_user');
    }

    public function disciplines()
    {
        return $this->hasMany(Discipline::class);
    }

    public function eventRegulations()
    {
        return $this->hasMany(EventRegulation::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function games()
    {
        return $this->hasMany(Game::class);
    }

}
