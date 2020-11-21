import React from 'react'

const TransactionTable = ({transactions}) => {
    return (
        <div className="table-responsive mb-3">
            <table className="table">
                <thead className="thead-light py-0">
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Address</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map(transaction => {
                        return (
                            <tr key={transaction.id}>
                                <td>
                                    <b
                                        className={`${
                                            transaction.type == "Deposit"
                                                ? "text-success"
                                                : "text-danger"
                                        }`}
                                    >
                                        {transaction.type}
                                    </b>
                                </td>
                                <td>
                                    <b>${transaction.amount}</b>
                                </td>
                                <td>
                                    <b>{transaction.currency}</b>
                                </td>
                                <td>
                                    <b>
                                        {transaction.address.substr(0, 6)}
                                        ...
                                    </b>
                                </td>
                                <td>
                                    <b
                                        className={`${
                                            transaction.status === "pending"
                                                ? "text-danger"
                                                : "text-success"
                                        }`}
                                    >
                                        {transaction.status}
                                    </b>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionTable
