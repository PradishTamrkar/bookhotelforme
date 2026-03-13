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
        Schema::create('reservations_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')
                  ->constrained('reservations')
                  ->cascadeOnDelete();
            $table->foreignId('room_id')
                  ->constrained('rooms')
                  ->cascadeOnDelete();
            $table->decimal('price_per_night', 10, 2);
            $table->decimal('total_price_per_rooom',10,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations_details');
    }
};
