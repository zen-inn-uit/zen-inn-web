import Image from "next/image";

export default function CategoryCard({ name, imageUrl, bgColor }: { name: string; imageUrl: string; bgColor: string }) {
    return (
        <div 
            className="flex flex-col items-center cursor-pointer group w-60 h-80 rounded-2xl p-6 transition-transform duration-300 group-hover:scale-105"
            style={{ 
                background: `linear-gradient(135deg, ${bgColor}40, ${bgColor}60)`,
                backdropFilter: 'blur(10px)'
            }}
        >
            <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-md">
                <div className="relative w-full h-full">
                    <Image 
                        src={imageUrl} 
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <h3 className="mt-6 font-display text-xl text-accent font-medium">
                {name}
            </h3>
        </div>
    );
}
