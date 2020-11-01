<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index()
    {
        $plan = Plan::all();
        return response($plan);
    }

    public function store(Request $request)
    {
        //
    }

    public function update(Request $request, Plan $plan)
    {
        //
    }

    public function destroy(Plan $plan)
    {
        //
    }
}
