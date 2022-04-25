<?php

use App\Http\Controllers\EquipmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Вывод пагинированного списка оборудования с возможностью поиска путем указания query параметров советующим ключам ответа
Route::get('/equipment', [EquipmentController::class, 'list']);

Route::get('/equipment/{id}', static function($id) {
    // Запрос данных по id
});

Route::post('/equipment', [EquipmentController::class, 'add']);

Route::put('/equipment/{equipment:id}', [EquipmentController::class, 'save']);

Route::delete('/equipment/{equipment:id}', [EquipmentController::class, 'delete']);

Route::get('/equipment-type', static function() {
    // Удаление записи
});
