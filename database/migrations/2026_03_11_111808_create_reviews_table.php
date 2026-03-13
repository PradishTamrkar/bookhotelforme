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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->cascadeOnDelete();
            $table->foreignId('hotel_id')
                  ->constrained('hotels')
                  ->cascadeOnDelete();
            $table->foreignId('reservation_id')
                  ->constrained('reservations')
                  ->cascadeOnDelete();
            $table->unsignedTinyInteger('rating'); // 1 to 5
            $table->text('comment')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();

            $table->unique('reservation_id'); // Ensure one review per reservation
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
