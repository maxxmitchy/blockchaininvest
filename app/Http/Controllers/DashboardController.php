<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function endpointPCT(Request $request)
    {
        $curl = curl_init();

        // $cryptodata = "https://api.nomics.com/v1/currencies/sparkline?key=5ddbf2e5730bd126796cb638abf01eed&ids=BTC,ETH,LTC&start=2020-09-01T00%3A00%3A00Z&end=2020-10-13T00%3A00%3A00Z";

        $cryptodata = "https://api.nomics.com/v1/currencies/ticker?key=5ddbf2e5730bd126796cb638abf01eed&ids=BTC,ETH,LTC&interval=1d&convert=USD&per-page=100&page=1";

        curl_setopt_array($curl, array(
            CURLOPT_URL => $cryptodata,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            // CURLOPT_HTTPHEADER => array(
            //     "Authorization: Bearer sk_test_4395989e283809f41e940adf53b4c497cf7a8225",
            //     "Cache-Control: no-cache",
            // ),
        ));

        $response = curl_exec($curl);

        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            return response($response);
        }
    }

    public function endpoint(Request $request)
    {
        $curl = curl_init();

        $cryptodata = "https://api.nomics.com/v1/currencies/sparkline?key=5ddbf2e5730bd126796cb638abf01eed&ids=BTC,ETH,LTC&start=2020-09-01T00%3A00%3A00Z&end=2020-10-13T00%3A00%3A00Z";

        curl_setopt_array($curl, array(
            CURLOPT_URL => $cryptodata,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            // CURLOPT_HTTPHEADER => array(
            //     "Authorization: Bearer sk_test_4395989e283809f41e940adf53b4c497cf7a8225",
            //     "Cache-Control: no-cache",
            // ),
        ));

        $response = curl_exec($curl);

        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            return response($response);
        }
    }
}
