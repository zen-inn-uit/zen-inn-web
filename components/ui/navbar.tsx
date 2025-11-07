import Link from "next/link";
import Image from "next/image";
import NavbarActionsGuest from "../helpers/navbar-actions-guest";
import NavbarActions from "../helpers/navbar-actions";

export default function Navbar() {
    const isLogin = false;
    return (
        <header className="navbar">
            <nav className="bg-brand px-6">
                <div className="flex justify-between items-center h-14 ">
                    <div style={{position: 'relative', width: '120px', height: '40px'}}>
                        <Link href="/">
                            <Image src="/logo-primary.png" alt="Zen Inn Logo" layout="fill" objectFit="contain" />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/#footer" className="hover:underline">
                            <Image src="/info.svg" alt="Home" width={24} height={24} />
                        </Link>
                        {isLogin ? (
                            <NavbarActions />
                        ) : (
                            <NavbarActionsGuest />
                            
                        )}
                    </div>
                    
                </div>
            </nav>
        </header>
    )
}