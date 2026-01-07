export function HotelDetailPage({ params }: { params: { hotelId: string } }) {
    return (
        <div className="py-20 px-6">
            <h1 className="font-display text-secondary text-4xl text-center">Hotel Detail Page</h1>
            <p className="text-accent text-center mt-4">Hotel ID: {params.hotelId}</p>
            <p className="text-accent text-center mt-2">View and manage hotel details here.</p>
        </div>
    );
}