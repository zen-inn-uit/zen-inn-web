import SearchBar from "@/components/ui/search-bar";

export default async function SearchPage({searchParams}: {searchParams: Promise<{location?: string, dateFrom?: string, dateTo?: string, guests?: string}>}) {
    const params = await searchParams;

    return (
        <>
            <SearchBar location={params.location} dateFrom={params.dateFrom} dateTo={params.dateTo} guests={params.guests} />
        </>
        
    );
}