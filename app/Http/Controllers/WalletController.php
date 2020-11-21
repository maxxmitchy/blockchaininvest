<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function index()
    {
        $wallet = Wallet::all();
        return response($wallet);
    }

    public function store(Request $request)
    {
        //
    }

    public function update(Request $request, Wallet $wallet)
    {
        //
    }

    public function destroy(Wallet $wallet)
    {
        //
    }
}
