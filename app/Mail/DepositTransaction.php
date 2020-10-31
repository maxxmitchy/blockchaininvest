<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DepositTransaction extends Mailable
{
    use Queueable, SerializesModels;
    protected $transaction;
    protected $transactionWallet;
    public function __construct($transaction, $transactionWallet)
    {
        $this->transaction = $transaction;
        $this->transactionWallet = $transactionWallet;
    }

    public function build()
    {
        return $this->markdown('emails.deposits')
        ->with([
            'transaction' => $this->transaction,
            'userWallet' => $this->transactionWallet,
        ]);
    }
}
