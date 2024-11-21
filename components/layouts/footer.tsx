export default function Footer() {
    return (
        <div className="text-black sm:py-6">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    Copyright &copy; {new Date().getFullYear()}, QuickQ. All Rights Reserved.
                </p>
            </div>
        </div>
    );
}
