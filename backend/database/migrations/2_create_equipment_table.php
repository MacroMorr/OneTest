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
        Schema::create('equipment', static function (Blueprint $table) {
            $table->increments('id');
            $table->integer('equipment_type_id', false, true)->comment('Equipment type id');
            $table->string('code')->unique()->comment('Code equipment');
            $table->string('serial_number')->unique()->comment('Serial number');
            $table->text('note')->comment('Note');
            $table->timestamps();
            $table->foreign('equipment_type_id')->on('equipment_type')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
