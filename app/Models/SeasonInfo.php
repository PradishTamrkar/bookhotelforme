<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SeasonInfo extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected function casts(): array
    {
        return
        [
            'average_temperature'=>'decimal:2',
            'is_peak_season'=>'boolean',
        ];
    }

    //Relationships
    //a season info belongs to a destination
    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}
