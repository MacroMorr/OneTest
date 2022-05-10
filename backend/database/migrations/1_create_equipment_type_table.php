<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('equipment_type', static function (Blueprint $table) {
            $table->increments('id');
            $table->string('code')->unique()->comment('Equipment type code');
            $table->string('type')->comment('Equipment type code');
            $table->string('mask_serial_number')->unique()->comment('Mask Serial number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment_type');
    }
};
