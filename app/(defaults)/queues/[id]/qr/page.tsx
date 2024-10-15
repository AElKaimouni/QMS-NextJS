'use client';

import React from 'react';
import QRCode from 'react-qr-code';
import { TbCopy } from "react-icons/tb";


const QrCodeComponent = () => {
    const qrCodeValue = 'http://www.admin-dashboard.com'; // Replace this with the actual value

    const handleCopyLink = () => {
        navigator.clipboard.writeText(qrCodeValue);
    };

    return (
        <div className="flex min-h-full w-full flex-col items-center justify-center">
            <div className="w-96 p-6 text-center">
                <h1 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-white-light">Here is your QR Code</h1>

                {/* QR Code */}
                <div className="mb-4 flex items-center justify-center rounded-xl bg-gray-100 p-4">
                    <QRCode value={qrCodeValue} size={240} />
                </div>

                {/* Link and Copy Button */}
                <div className="mb-4 flex items-center justify-center space-x-2">
                    <input type="text" value={qrCodeValue} readOnly className="form-input" />
                    <button onClick={handleCopyLink} className="btn btn-primary px-4">
                        <TbCopy className='size-4 mr-2' />
                        Copy
                    </button>
                </div>

                {/* Skip Button */}
                <button className="mt-4 text-gray-500 underline transition hover:text-gray-700 dark:text-white-light">Skip</button>
            </div>
        </div>
    );
};

export default QrCodeComponent;
