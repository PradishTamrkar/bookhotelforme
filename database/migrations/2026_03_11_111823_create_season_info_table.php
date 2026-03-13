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
        Schema::create('season_info', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')
                  ->constrained('destinations')
                  ->cascadeOnDelete();
            $table->enum('month',['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
            $table->enum('weather_type',['sunny','rainy','snowy','cloudy','monsoon']);
            $table->decimal('average_temperature', 5, 2)->nullable();
            $table->text('travel_notes')->nullable();
            $table->boolean('is_peak_season')->default(false);
            $table->timestamps();

            $table->unique(['destination_id', 'month']); // Ensure one entry per destination per month
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('season_info');
    }
};
