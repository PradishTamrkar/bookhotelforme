<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Str;
class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'desctination_id',
        'manager_id',
        'hotel_name',
        'hotel_slug',
        'description',
        'star_rating',
        'address',
        'latitude',
        'longitude',
        'altitude_meters',
        'hotel_amenities',
        'hotel_images',
        'contact_number',
        'contact_email',
        'status',
        'policies',
    ];

    protected function casts():array
    {
        return [
            'hotel_amenitites'=>'array',
            'hotel_images'=>'array',
            'star_rating'=>'integer',
            'altitude_meters'=>'integer',
            'latitude'=>'decimal:7',
            'longitude'=>'decimal:7',
        ];
    }

    //Relationships
    //a hotel belongs to a destination
    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }

    //a hotel has many manager
    public function manager(): HasMany
    {
        return $this->hasMany(Manager::class);
    }

    // a hotel has many room categories
    public function roomCategories(): HasMany
    {
        return $this->hasMany(RoomCategory::class);
    }

    //a hotel has many rooms through room categories
    public function rooms(): HasManyThrough
    {
        return $this->hasManyThrough(Room::class, RoomCategory::class);
    }

    //a hotel has many reservations
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    //a hotel has many reviews
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    //a hotel has many hotelEmbeddings
    public function hotelEmbeddings(): HasMany
    {
        return $this->hasMany(HotelEmbedding::class);
    }

    //autogenerate slug from name
     protected static function booted(): void
    {
        static::creating(function ($hotel) {
            $hotel->slug = Str::slug($hotel->name);
        });
    }

    //route model binding by slug
    public function getRouteKeyName(): string
    {
        return 'hotel_slug';
    }
}

