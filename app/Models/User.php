<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'country',
        'phone',
        'profile_picture',
        'citizenship_id',
        'is_guest',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected function casts():array
     {
        return
        [
            'email_verified_at'=>'datetime',
            'password'=>'hashed',
            'is_guest'=>'boolean',
            'citizenship_id'=>'string',
        ];
    }

    // Relationships

    //a single user has many reservations
    public function reservations():HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    //a single user can make many reviews
    public function reviews():HasMany
    {
        return $this->hasMany(Review::class);
    }

    //a single can make many payemnts
    public function payments():HasMany
    {
        return $this->hasMany(Payment::class);
    }

    //a single user can have many chat sessions
    public function chatSessions():HasMany
    {
        return $this->hasMany(ChatSession::class);
    }

    //helper function
    public function isGuest():bool
    {
        return $this->is_guest === true;
    }

    public function isRegistered():bool
    {
        return !$this->is_guest === false;
    }
}
