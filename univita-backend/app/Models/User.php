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

    public function teams()
    {
        return $this->belongsToMany(Team::class, 'team_user');
    }

    public function events()
    {
        return $this->hasMany(Event::class, 'created_by_user');
    }

    public function captainOff(){
        return $this->hasMany(Team::class, 'captain_id');
    }
    
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function eventSubscription()
    {
        return $this->hasOne(EventSubscription::class);
    }

    public function createdSports()
    {
        return $this->hasMany(Sport::class, 'created_by_user');
    }

    public function createdRegulations()
    {
        return $this->hasMany(Regulation::class, 'created_by_user');
    }




}
