interface TransactionCard {
    date: Date,
    id: string,
    amount: number,
    type: string,
    receiver: number,
    sender: number,
    myAccountNumber: number,
}
const TransactionCard = ({ date, id, amount, type, receiver, myAccountNumber }: TransactionCard) => {
    const transactionDate = new Date(date);
    return (
        <div className="w-full min-h-20 bg-secondary flex justify-between items-center rounded-md px-4 py-2">
            <div className="">
                <div className="date text-sm">{`${transactionDate.getDate()}-${transactionDate.getMonth() + 1}-${transactionDate.getFullYear()}`}</div>
                {type === "transfer" && <div className="to">{receiver === myAccountNumber ? "From: " : "To: "} {receiver}</div>}
                <div className="id text-xs">{id}</div>
            </div>
            <div className={`${receiver === myAccountNumber ? "text-green-400" : "text-red-400"}`}>
                <div className="amount font-semibold">Rs. {amount}</div>
                <div className="type text-gray-400">{type}</div>
            </div>
        </div>
    )
}

export default TransactionCard