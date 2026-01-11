import ChatButton from "@/components/ui/chat-button";
import Dashboard from "@/components/ui/dashboard";
import Navbar from "@/components/ui/navbar";
import { OffersSection } from "@/components/ui/offers";
import SearchBar from "@/components/ui/search-bar";
import Image from "next/image";
import Link from "next/link";
import ExploreSection from "@/components/ui/explore";
import CategoriesSection from "@/components/ui/categories";

export default function Home() {
   return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Dashboard />
        <SearchBar />
        <OffersSection />
        <ExploreSection />
        <CategoriesSection />
      </main>
      <footer id="footer" className="py-12 px-6 mt-20">
        <div className="">
          <div>
            <div className="flex justify-between md:flex-row flex-col">
              <div className="flex flex-col items-center md:items-start space-y-6">
                <Image src="/ZenInn.svg" alt="Zen Inn Logo" width={70} height={30} />
                <p className="text-accent">
                  Find the true pleasure in life
                </p>
              </div>
              <div className="flex items-center space-x-12">
                <Link href="/contact" className="text-secondary">Contact</Link>
                <Link href="/about" className="text-secondary">About us</Link>
              </div>
            </div>
            <div className="border-t-2 border-[var(--color-primary)] mt-10 pt-4 text-center text-accent">
              <div className="flex justify-end items-center space-x-6 md:space-x-8 mb-24 mt-6">
                <Link href="https://www.facebook.com">
                  <Image src="/fb.svg" alt="Facebook" width={10} height={10} />
                </Link>
                <Link href="https://www.twitter.com">
                  <Image src="/x.svg" alt="Twitter" width={20} height={20} />
                </Link>
                <Link href="https://www.instagram.com">
                  <Image src="/ins.svg" alt="Instagram" width={20} height={20} />
                </Link>
              </div>
              <p className="text-secondary">&copy; {new Date().getFullYear()} Zen Inn. Powered by <span className="text-accent">Group 15</span>.<br />All rights reserved.</p>
            </div>
          </div>
        </div>
        <ChatButton />
      </footer>
    </>
    
  );
}
