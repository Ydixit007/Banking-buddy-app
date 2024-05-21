import { Scanner } from "@yudiel/react-qr-scanner"

interface ModalType extends HTMLElement {
    close: () => {}
}

interface QrModal {
    activateCam: boolean,
    setActivateCam: (value: React.SetStateAction<boolean>) => void,
    setAccount: (value: React.SetStateAction<number>) => void,
}

const QRModal = ({ activateCam, setActivateCam, setAccount }: QrModal) => {
    const handelQRScan = (text: string) => {
        const modal: ModalType = document.getElementById("qr_modal") as ModalType;
        const accountNumber = Number(text);
        if (accountNumber) {
            setAccount(accountNumber);
        } else {
            console.log("Invalid QR")
        }
        modal.close();
        setActivateCam(false);
    }
    return (
        <dialog id="qr_modal" className="modal">
            <div className="modal-box">
                <h3 className="">Scan QR</h3>
                <div className="h-64 w-full flex justify-center items-center">
                    <div className="camera h-56 w-56">
                        <Scanner
                            enabled={activateCam}
                            onResult={handelQRScan}
                            onError={(error) => console.log(error?.message)}
                        />
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default QRModal