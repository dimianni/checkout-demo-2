import Image from "next/image"
import Link from "next/link"
import logo from '../../../public/checkout_logo.svg'

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-blue-900">
            <div className="container flex h-16 items-center justify-center">
                <Link className="h-full max-h-full flex justify-center items-center" href="/">
                    <Image src={logo} alt="T" style={{ width: "auto", height: "40%" }} />
                </Link>
            </div>
        </header>
    )
}