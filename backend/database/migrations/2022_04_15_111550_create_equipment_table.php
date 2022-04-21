<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipment_name', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('code')->comment('code_equipment');
            $table->string('code_equipment')->comment('code_equipment');
            $table->string('serial_number')->unique()->comment('serial_number');
            $table->text('notes')->comment('message_users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('equipment_name');
    }
};
