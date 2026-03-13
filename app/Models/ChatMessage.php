<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatMessage extends Model
{
    use HasFactory;

    protected $guarded=['id'];

    protected function casts():array
    {
        return
        [
            'suggested_hotels'=>'array',
        ];
    }

    //Relationships
    //a chat message belongs to a chat session
    public function chatSession():BelongsTo
    {
        return $this->belongsTo(ChatSession::class);
    }

    //Helper function
    //check if the message is from the user or the system
    public function isFromUser(): bool
    {
        return $this->role === 'user';
    }

    public function isFromSystem(): bool
    {
        return $this->role === 'system';
    }
}
