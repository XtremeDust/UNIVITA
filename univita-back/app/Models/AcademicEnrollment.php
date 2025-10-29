<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicEnrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'offering_id',
        'student_user_id',
        'state',
    ];

    // La oferta académica a la que se inscribió
    public function offering()
    {
        return $this->belongsTo(AcademicOffering::class, 'offering_id');
    }

    // El estudiante inscrito
    public function student()
    {
        return $this->belongsTo(User::class, 'student_user_id');
    }
}
