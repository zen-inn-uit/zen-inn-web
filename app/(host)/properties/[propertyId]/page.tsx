export default function PropertyDetailPage({ params }: { params: { propertyId: string } }) {
    return (
        <div className="py-20 px-6">
            <h1 className="font-display text-secondary text-4xl text-center">Property Detail Page</h1>
            <p className="text-accent text-center mt-4">Property ID: {params.propertyId}</p>
            <p className="text-accent text-center mt-2">View and manage property details here.</p>
        </div>
    );
}