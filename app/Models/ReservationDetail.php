<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ReservationDetail extends Model
{
    use HasFactory;

    protected $guarded=['id'];

    protected function casts():array
    {
        return
        [
            'price_per_night'=>'decimal:2',
            'total_price_per_room'=>'decimal:2',
        ];
    }

    //Relationships
    //a reservation detail belongs to a reservation
    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    //a reservation detail belongs to a room
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}
