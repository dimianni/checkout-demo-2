import Image from "next/image"
import Link from "next/link"
import logo from '../../../public/logo.png'

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-green-500">
            <div className="container flex h-16 items-center justify-center">
                <Link className="h-full max-h-full" href="/">
                    <Image src={logo} alt="T" style={{ width: "auto", height: "100%" }} />
                </Link>
            </div>
        </header>
    )
}