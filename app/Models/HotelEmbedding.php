<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HotelEmbedding extends Model
{
    use HasFactory;

    protected $guarded=['id'];

    protected function casts():array
    {
        return
        [
            'embedding_vector'=>'array',
            'metadata'=>'array',
        ];
    }

    //Relationships
    //a hotel embedding belongs to a hotel
    public function hotel():BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }
}
