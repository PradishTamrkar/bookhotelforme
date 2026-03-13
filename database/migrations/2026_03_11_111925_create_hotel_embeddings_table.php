<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hotel_embeddings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')
                  ->constrained('hotels')
                  ->cascadeOnDelete();
            $table->text('chunk_text');
            $table->json('embedding_vector');
            $table->enum('chunk_type', [
                'description',
                'amenities',
                'location',
                'reviews',
                'pricing'
            ]);
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotel_embeddings');
    }
};
