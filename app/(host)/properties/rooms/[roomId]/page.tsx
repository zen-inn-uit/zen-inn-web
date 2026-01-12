export default function RoomDetailPage({ params }: { params: { roomId: string } }) {
    return (
        <div className="py-20 px-6">
            <h1 className="font-display text-secondary text-4xl text-center">Room Detail Page</h1>
            <p className="text-accent text-center mt-4">Room ID: {params.roomId}</p>
            <p className="text-accent text-center mt-2">View and manage room details here.</p>
        </div>
    );
}