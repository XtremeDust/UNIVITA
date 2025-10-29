<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicOffering extends Model
{
    use HasFactory;

    protected $fillable = [
        'sport_id',
        'coach_user_id',
        'semester',
        'state',
        'max_students',
    ];

    // Deporte que se ofrece
    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }

    // Entrenador/Profesor
    public function coach()
    {
        return $this->belongsTo(User::class, 'coach_user_id');
    }

    // Estudiantes inscritos en esta oferta
    public function enrollments()
    {
        return $this->hasMany(AcademicEnrollment::class, 'offering_id');
    }

    // Relación many-to-many para obtener directamente los estudiantes
    public function students()
    {
        return $this->belongsToMany(User::class, 'academic_enrollments', 'offering_id', 'student_user_id')
                    ->withPivot('state') // Opcional: Cargar estado de la inscripción
                    ->withTimestamps(); // Opcional: Cargar fechas de inscripción
    }
}
