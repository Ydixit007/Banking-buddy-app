import QRCode from "react-qr-code";

const ShowQRModal = ({ accountNumber }: { accountNumber: number }) => {
    return (
        <dialog id="show_QR" className="modal">
            <div className="modal-box h-64 w-64">
                <QRCode className="w-full h-full" value={`${accountNumber}`} />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default ShowQRModal