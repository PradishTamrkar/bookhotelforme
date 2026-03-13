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
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->string('destination_name');
            $table->string('destination_slug')->unique();
            $table->enum('region_type', ['city', 'trekking', 'wildlife', 'pilgrimage']);
            $table->string('province')->nullable();
            $table->text('destination_description')->nullable();
            $table->json('nearby_attractions')->nullable();
            $table->string('destination_image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('destinations');
    }
};
