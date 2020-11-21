<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\WalletController;

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

Auth::routes(['verify' => true]);
Route::get('endpoint', ['\App\Http\Controllers\DashboardController', 'endpoint']);
Route::get('endpointpct', ['\App\Http\Controllers\DashboardController', 'endpointPCT']);
Route::post('storedeposit', ['\App\Http\Controllers\TransactionController', 'store']);
Route::patch('editUser', ['\App\Http\Controllers\UserController', 'update']);
Route::resources([
    'plans' => PlanController::class,
    'wallets' => WalletController::class,
]);

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
