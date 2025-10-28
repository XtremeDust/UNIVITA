<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SportRegulation extends Model
{
    use HasFactory;
    
    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }

    public function regulation()
    {
        return $this->belongsTo(Regulation::class);
    }
}
