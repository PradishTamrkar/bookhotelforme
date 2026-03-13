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
        Schema::create('manager', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')
                  ->constrained()
                  ->cascadeOnDelete();
            $table->string('manager_name');
            $table->string('manager_email')->unique();
            $table->string('manager_password');
            $table->string('phone')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manager');
    }
};
