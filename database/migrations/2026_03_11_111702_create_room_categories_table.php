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
        Schema::create('room_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')
                  ->constrained('hotels')
                  ->cascadeOnDelete();
            $table->string('category_name');
            $table->text('category_description')->nullable();
            $table->string('category_images')->nullable();
            $table->unsignedInteger('total_rooms');
            $table->unsignedInteger('max_guests');
            $table->enum('bed_type', ['single', 'double', 'queen', 'king', 'twin']);
            $table->enum('meal_plan', ['EP', 'CP', 'MAP', 'AP'])->default('EP');//EP=no meals, CP=breakfast, MAP=breakfast and dinner, AP=all meals
            $table->decimal('price_per_night', 8, 2);
            $table->unsignedInteger('max_occupancy');
            $table->json('room_ amenities')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_categories');
    }
};
