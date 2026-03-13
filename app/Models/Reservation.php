<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Reservation extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected function casts():array
    {
        return [
            'check_in'=>'datetime',
            'check_out'=>'datetime',
            'number_of_guests'=>'integer',
            'total_price'=>'decimal:2',
        ];
    }

    //Relationships
    //a reservation belongs to a user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // a reservation belongs to a hotel
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    //a reservation has many reservation details
    public function reservationDetails():HasMany
    {
        return $this->hasMany(ReservationDetail::class);
    }

    //a reservation has one payment
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    //a reservation has one review
    public function review(): HasOne
    {
        return $this->hasOne(Review::class);
    }

    //Helper function
    //calculate total nights based on check_in and check_out
    public function getTotalNightsAttribute(): int
    {
        return $this->check_in->diffInDays($this->check_out);
    }
}
