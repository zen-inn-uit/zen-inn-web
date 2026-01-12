import SearchBarActions from "../helpers/search-bar-actions";

export default function SearchBar({location, dateFrom, dateTo, guests} : {location?: string, dateFrom?: string, dateTo?: string, guests?: string}) {
    return (
        <div className="m-10 flex justify-center items-center space-x-20">
            <h3 className="font-display text-accent text-2xl">
                Where do you want to stay?
            </h3>
            <SearchBarActions location={location} dateFrom={dateFrom} dateTo={dateTo} guests={guests} />
        </div>
    );
}