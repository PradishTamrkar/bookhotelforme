<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $guarded=['id'];

    protected function casts():array
    {
        return
        [
            'amount'=>'decimal:2',
            'payment_meta'=>'array',
            'paid_at'=>'datetime',
        ];
    }

    //Relationships
    //a payment belongs to a reservation
    public function reservation():BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    //a payment belongs to a user
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    //Helper function

    public function isComplete(): bool
    {
        return $this->status === 'complete';
    }

    public function isRefunded(): bool
    {
        return $this->status === 'refunded';
    }
}
