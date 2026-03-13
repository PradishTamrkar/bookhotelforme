<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use \Illuminate\Support\Str;

class Destination extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'nearby_attraction' => 'array',
            'is_active' => 'boolean',
        ];
    }

    //Relationships
    //a destination can have many season info
    public function seasonInfos():HasMany
    {
        return $this->hasMany(SeasonInfo::class);
    }

    //a destination can have many hotels
    public function hotels():HasMany
    {
        return $this->hasMany(Hotel::class);
    }

    //autogenerate slug from name
     protected static function booted(): void
    {
        static::creating(function ($destination) {
            $destination->slug = Str::slug($destination->name);
        });
    }

    //route model binding by slug
    public function getRouteKeyName(): string
    {
        return 'destination_slug';
    }
}
