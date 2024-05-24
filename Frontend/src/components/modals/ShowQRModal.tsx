import QRCode from "react-qr-code";

const ShowQRModal = ({ accountNumber }: { accountNumber: number }) => {
    return (
        <dialog id="show_QR" className="modal">
            <div className="modal-box bg-primary h-72 w-72">
                <QRCode className="w-full h-full" value={`${accountNumber}`} />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default ShowQRModal