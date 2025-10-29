<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'cedula',
        'telefono',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Equipos de los que es miembro
    public function teams()
    {
        return $this->belongsToMany(Team::class, 'team_users');
    }

    // Equipos que capitanea
    public function captainOfTeams()
    {
        return $this->hasMany(Team::class, 'captain_id');
    }

    // Posts creados
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    // Suscripción a notificaciones (si existe)
    public function subscription()
    {
        return $this->hasOne(UserSubscription::class);
    }

    // Entidades creadas por este usuario
    public function createdSports()
    {
        return $this->hasMany(Sport::class, 'created_by_user');
    }

    public function createdRegulations()
    {
        return $this->hasMany(Regulation::class, 'created_by_user');
    }

    public function createdTournaments()
    {
        return $this->hasMany(Tournament::class, 'created_by_user');
    }

    public function createdActivities()
    {
        return $this->hasMany(Activity::class, 'created_by_user');
    }

    // Relaciones como Coach/Entrenador
    public function coachedAcademicOfferings()
    {
        return $this->hasMany(AcademicOffering::class, 'coach_user_id');
    }

    public function coachedVarsityTeams()
    {
        return $this->hasMany(VarsityTeam::class, 'coach_user_id');
    }

    // Relaciones como Estudiante/Atleta
    public function academicEnrollments()
    {
        return $this->hasMany(AcademicEnrollment::class, 'student_user_id');
    }

    public function varsityTeamMemberships()
    {
        return $this->hasMany(VarsityTeamMember::class);
    }

    // Inscripciones individuales a disciplinas
    public function disciplineEntries()
    {
        return $this->hasMany(DisciplineEntry::class);
    }
}
