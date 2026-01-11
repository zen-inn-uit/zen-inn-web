import Navbar from "@/components/ui/navbar";
import ChatButton from "@/components/ui/chat-button";
import SearchBarActions from "@/components/helpers/search-bar-actions";
import SearchResults from "@/components/search/SearchResults";

const mockHotels = [
    {
        id: "1",
        name: "Zen Inn Luxury Resort",
        location: "Bali, Indonesia",
        image: "/auth-bg.png", // Using existing image as placeholder
        pricePerNight: 125,
        totalPrice: 375,
        rating: 4.8,
        reviewCount: 234,
        tags: ["Breakfast included", "Free cancellation"],
        nights: 3
    },
    {
        id: "2",
        name: "Serenity Beach Hotel",
        location: "Phuket, Thailand",
        image: "/auth-bg.png",
        pricePerNight: 95,
        totalPrice: 285,
        rating: 4.6,
        reviewCount: 189,
        tags: ["WiFi", "Pool", "Free cancellation"],
        nights: 3
    },
    {
        id: "3",
        name: "Mountain View Villa",
        location: "Kyoto, Japan",
        image: "/auth-bg.png",
        pricePerNight: 145,
        totalPrice: 435,
        rating: 4.9,
        reviewCount: 312,
        tags: ["Breakfast included", "Spa"],
        nights: 3
    },
    {
        id: "4",
        name: "Coastal Paradise Resort",
        location: "Maldives",
        image: "/auth-bg.png",
        pricePerNight: 220,
        totalPrice: 660,
        rating: 4.7,
        reviewCount: 156,
        tags: ["Breakfast included", "Pool", "Gym", "Free cancellation"],
        nights: 3
    },
    {
        id: "5",
        name: "Urban Zen Hotel",
        location: "Tokyo, Japan",
        image: "/auth-bg.png",
        pricePerNight: 110,
        totalPrice: 330,
        rating: 4.5,
        reviewCount: 278,
        tags: ["WiFi", "Gym", "Parking"],
        nights: 3
    },
    {
        id: "6",
        name: "Tropical Garden Resort",
        location: "Phuket, Thailand",
        image: "/auth-bg.png",
        pricePerNight: 85,
        totalPrice: 255,
        rating: 4.4,
        reviewCount: 142,
        tags: ["Breakfast included", "Pool", "WiFi"],
        nights: 3
    },
    {
        id: "7",
        name: "Riverside Retreat",
        location: "Kyoto, Japan",
        image: "/auth-bg.png",
        pricePerNight: 130,
        totalPrice: 390,
        rating: 4.8,
        reviewCount: 201,
        tags: ["Breakfast included", "Spa", "Free cancellation"],
        nights: 3
    },
    {
        id: "8",
        name: "Luxury Spa Resort",
        location: "Bali, Indonesia",
        image: "/auth-bg.png",
        pricePerNight: 165,
        totalPrice: 495,
        rating: 4.9,
        reviewCount: 298,
        tags: ["Breakfast included", "Spa", "Pool", "Gym"],
        nights: 3
    }
];

export default async function SearchPage({searchParams}: {searchParams: Promise<{location?: string, dateFrom?: string, dateTo?: string, guests?: string}>}) {
    const params = await searchParams;

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
            <header>
                <Navbar />
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                <div className="mb-6">
                    <div className="m-2 flex justify-center items-center space-x-20">
                        <h3 className="font-display text-brand text-2xl">
                            Where do you want to stay?
                        </h3>
                    <SearchBarActions location={params.location} dateFrom={params.dateFrom} dateTo={params.dateTo} guests={params.guests} />
                </div>
                </div>

                <SearchResults hotels={mockHotels} />
            </main>

            <footer id="footer" className="py-12 px-6 mt-20 bg-brand/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between md:flex-row flex-col items-center md:items-start space-y-6 md:space-y-0">
                        <div className="flex flex-col items-center md:items-start space-y-6">
                            <p className="text-accent" style={{ fontFamily: 'var(--font-body)' }}>
                                Find the true pleasure in life
                            </p>
                        </div>
                    </div>
                    <div className="border-t-2 border-[var(--color-primary)] mt-10 pt-4 text-center">
                        <p className="text-secondary" style={{ fontFamily: 'var(--font-body)' }}>
                            &copy; {new Date().getFullYear()} Zen Inn. Powered by <span className="text-accent">Group 15</span>.<br />All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            <ChatButton />
        </div>
    );
}

