<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoomCategory extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected function casts():array{
        return [
            'category_images'=>'array',
            'room_amenities'=>'array',
            'price_per_night'=>'decimal:2',
            'max_guests'=>'integer',
            'total_rooms'=>'integer',
        ];
    }

    //Relationships
    //a room category belongs to a hotel
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    //a category has many rooms
    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }
}
