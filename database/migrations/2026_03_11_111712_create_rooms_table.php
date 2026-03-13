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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')
                  ->constrained('hotels')
                  ->cascadeOnDelete();
            $table->foreignId('room_category_id')
                  ->constrained('room_categories')
                  ->cascadeOnDelete();
            $table->string('room_number');
            $table->unsignedBigInteger('floor_number')->default(1);
            $table->enum('room_status', ['available', 'occupied', 'maintenance'])->default('available');
            $table->string('room_images')->nullable();
            $table->timestamps();

            //a room number should be unique within a hotel
            $table->unique(['hotel_id', 'room_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
