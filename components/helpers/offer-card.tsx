import Image from "next/image";

export default function OfferCard({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) {
    return (
        <div className="relative w-[calc((100vw-5rem-3rem)/3)] h-[330px] rounded-lg overflow-hidden flex-shrink-0">
            <Image 
                src={imageUrl} 
                alt="Offer image"
                fill 
                className="object-cover"
            />
            
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="relative z-10 p-6 ml-3 flex flex-col justify-center text-white h-full">
                <h3 className="text-3xl font-bold font-display">{title}</h3>
                <p className="text-white/90 font-medium">{description}</p>
                <div className="mt-4">
                    <button className="text-base mt-4 border-2 transparent px-6 py-2 rounded-md w-fit hover:bg-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors">
                        Find deals
                    </button>
                </div>
            </div>
        </div>
    );
}