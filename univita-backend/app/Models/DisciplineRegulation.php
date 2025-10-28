<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisciplineRegulation extends Model
{
    use HasFactory;

    public function discipline()
    {
        return $this->belongsTo(Discipline::class);
    }

    public function regulation()
    {
        return $this->belongsTo(Regulation::class);
    }   
}
