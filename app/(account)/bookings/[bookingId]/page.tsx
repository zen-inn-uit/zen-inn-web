export default function BookingDetailPage({ params }: { params: { bookingId: string } }) {
    return (
        <div className="py-20 px-6">
            <h1 className="font-display text-secondary text-4xl text-center">Booking Detail Page</h1>
            <p className="text-accent text-center mt-4">Booking ID: {params.bookingId}</p>
            <p className="text-accent text-center mt-2">View and manage your booking details here.</p>
        </div>
    );
}