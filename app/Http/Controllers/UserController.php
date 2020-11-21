<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
    }

    public function update(Request $request)
    {
        if ($request->name === "Bitcoin") {
            User::find(auth()->id())->update([
                'btc' => $request->address,
            ]);
        }
        $request->name === "Ethereum" ? User::find(auth()->id())->update([
            'eth' => $request->address,
        ]) : false;


        return response(['done now']);
    }

    public function destroy($id)
    {
        //
    }
}
