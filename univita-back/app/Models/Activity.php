<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by_user',
        'title',
        'body',
        'img',
        'type',
        'state',
        'activity_date',
        'location',
    ];

     protected $casts = [
        'activity_date' => 'date',
    ];

    // Usuario creador
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_user');
    }

    // Reglamentos asociados a esta actividad (a través de tabla pivote)
    public function regulations()
    {
        return $this->belongsToMany(Regulation::class, 'activity_regulations');
    }
}
