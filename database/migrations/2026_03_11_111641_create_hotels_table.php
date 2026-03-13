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
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
             $table->foreignId('destination_id')
                  ->constrained('destinations')
                  ->cascadeOnDelete();
            $table->string('hotel_name');
            $table->string('hotel_slug')->unique();
            $table->text('description')->nullable();
            $table->unsignedTinyInteger('star_rating')->default(1);
            $table->string('address');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->unsignedInteger('altitude_meters')->nullable();
            $table->json('hotel_amenities')->nullable();
            $table->json('hotel_images')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('contact_email')->nullable();
            $table->enum('status', ['active', 'inactive', 'pending'])->default('pending');
            $table->text('policies')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
