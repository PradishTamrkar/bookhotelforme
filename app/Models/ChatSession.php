<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class ChatSession extends Model
{
    use HasFactory;

    protected $guarded=['id'];

    protected function casts():array
    {
        return
        [
            'context'=>'array',
            'is_active'=>'boolean',
        ];
    }

    //Relationships
    //a chat session belongs to a user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    //a chat session has many messages
    public function messages(): HasMany
    {
        return $this->hasMany(ChatMessage::class);
    }

    //auto generate session token
    public static function booted(): void
    {
        static::creating(function ($session) {
            $session->session_token = Str::uuid();
        });
    }

    //Helper function
    //update extracted context as chatbot genereates more info
    public function updateContext(array $newContext): void
    {
        $this->update([
            'context' => array_merge($this->context ?? [], $newContext)
        ]);
    }
}
