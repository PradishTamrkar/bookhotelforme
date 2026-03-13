<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected function casts():array
    {
        return [
            'room_images'=>'array',
            'floor_number'=>'integer',
        ];
    }

    //Relationships
    //a room belongs to one hotel
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    //a room belongs to a category
    public function roomCategory(): BelongsTo
    {
        return $this->belongsTo(RoomCategory::class);
    }

    //a room appers in many reservations details
    public function reservationDetails(): HasMany
    {
        return $this->hasMany(ReservationDetail::class);
    }

    //Helper function
    public function isAvailable(): bool
    {
        return $this->room_status === 'available';
    }
}
