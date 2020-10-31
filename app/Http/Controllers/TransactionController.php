<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Mail\DepositTransaction;
use Illuminate\Support\Facades\Mail;

class TransactionController extends Controller
{
    public function store(Request $request)
    {

        switch ($request->currency) {
            case 'Bitcoin':
                $address = auth()->user()->btc;
                if(!$address)
                return response('Please update your profile and provide a valid ' . $request->currency . ' wallet address');
                break;
            case 'Ethereum':
                $address = auth()->user()->eth;
                break;
            default:
                $address = auth()->user()->btc;
                break;
        }

        auth()->user()->transactions()->create([
            'user_id' => auth()->id(),
            'amount' => $request->amount,
            'address' => $address,
            'type' => $request->type,
            'currency' => $request->currency,
            'start_date' => Carbon::now(),
            'end_date' => Carbon::now()->addDays($request->range),
        ]);

        $transaction = Transaction::where('user_id', auth()->id())->get()->last();

        switch ($transaction->currency) {
            case 'Bitcoin':
                $transactionWallet = Wallet::where('name', 'Bitcoin')->pluck('value')->first();
                break;
            case 'Ethereum':
                $transactionWallet = Wallet::where('name', 'Ethereum')->pluck('value')->first();
                break;
        }

        dd('done');

        Mail::to($request->user()->email)->send(
            new DepositTransaction($transaction, $transactionWallet)
        );
    }
}
