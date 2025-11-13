'use client';

import Image from 'next/image';

export default function Dashboard() {
    return (
        <div className="py-6 flex justify-center items-center flex-row space-x-48">
            <div className="flex flex-col justify-center items-start max-w-sm">
                <h1 className="font-display text-secondary text-left w-[600px] m-0">Your Comfort, Our Promise</h1>
                <p className="!font-light text-secondary font-display text-left text-2xl max-w-full mt-4 mb-0">
                    From luxury escapes to cozy retreats, book your happiness today.
                </p>
                <button className="text-base dark mt-4" onClick={() => alert('Booking functionality coming soon!')}>Book now</button>
            </div>
            <Image src="/banner.png" alt="Dashboard Illustration" width={450} height={270} />
            
        </div>
    );
}