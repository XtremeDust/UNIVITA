<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityRegulation extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity_id',
        'regulation_id',
    ];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function regulation()
    {
        return $this->belongsTo(Regulation::class);
    }
}
