import Image from "next/image";

export default function ExploreCard({ name, properties, imageUrl }: { name: string; properties: string; imageUrl: string }) {
    return (
        <div className="relative w-64 h-48 rounded-lg overflow-hidden cursor-pointer group">
            <Image 
                src={imageUrl} 
                alt={name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-display text-xl font-semibold">
                    {name}
                </h3>
                <p className="text-white/90 text-sm font-medium">
                    {properties}
                </p>
            </div>
        </div>
    );
}
