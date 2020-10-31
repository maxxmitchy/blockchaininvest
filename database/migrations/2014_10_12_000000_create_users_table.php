<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('last_name')->unique();
            $table->string('email')->unique();
            $table->unsignedBigInteger('referrer_id')->nullable();
            $table->foreign('referrer_id')->references('id')->on('users');
            $table->integer('plan_id');
            $table->double('roiBTC', 8, 2)->default(0);
            $table->double('roiETH', 8, 2)->default(0);
            $table->double('roiLTC', 8, 2)->default(0);
            $table->double('roiBCC', 8, 2)->default(0);
            $table->string('country')->nullable();
            $table->string('phone');
            $table->string('btc')->nullable();
            $table->string('eth')->nullable();
            $table->string('ltc')->nullable();
            $table->string('bcc')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('psw');
            $table->string('password');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
