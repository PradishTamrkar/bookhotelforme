<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;

    protected $guarded=['id'];

    protected function casts():array
    {
        return
        [
            'rating'=>'integer',
            'is_verified'=>'boolean',
        ];
    }

    //Relationships
    //a review belongs to a reservation
    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    //a review belongs to a user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    //a review belongs to a hotel
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }
}
