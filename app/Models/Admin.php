<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_name',
        'admin_email',
        'admin_password',
        'hotel_id',
        'phone',
        'is_active',
    ];

    protected $hidden = [
        'admin_password',
        'remember_token',
    ];

    protected function casts():array {
        return
        [
            'email_verified_at'=>'datetime',
            'admin_password'=>'hashed',
            'is_active'=>'boolean',
        ];
    }

    //Relationships
    //a superadmin can have many hotels
    public function hotels(): HasMany
    {
        return $this->hasMany(Hotel::class);
    }
}
