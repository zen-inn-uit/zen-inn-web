'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CalendarDatePicker } from '../helpers/calendar-date-picker';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from 'next/navigation';

export default function AirbnbSearch() {
    const router = useRouter();
    const [selectedDateRange, setSelectedDateRange] = useState({
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 7)),
    });
    
    const [selectedLocation, setSelectedLocation] = useState('');
    const [openLocationDropdown, setOpenLocationDropdown] = useState(false);
    const [guestsValue, setGuestsValue] = useState('');
    const [openGuestsDropdown, setOpenGuestsDropdown] = useState(false);

    const locations = [
        "Hanoi, Vietnam",
        "Ho Chi Minh City, Vietnam",
        "Da Nang, Vietnam",
        "Hoi An, Vietnam",
        "Nha Trang, Vietnam",
        "Phu Quoc, Vietnam",
        "Sapa, Vietnam",
        "Hue, Vietnam",
        "Dalat, Vietnam",
        "Vung Tau, Vietnam"
    ];

    const handleSearch = () => {
        const params = new URLSearchParams({
            location: selectedLocation,
            dateFrom: selectedDateRange.from.toISOString(),
            dateTo: selectedDateRange.to.toISOString(),
            guests: guestsValue,
        });
        router.push(`/search?${params.toString()}`);
    };

    return (
        <div className="flex items-center bg-white rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            {/* Where */}
            <div className="flex-1 px-6 py-3 border-r border-gray-200">
                <Popover open={openLocationDropdown} onOpenChange={setOpenLocationDropdown}>
                    <PopoverTrigger asChild>
                        <button className="w-full text-left">
                            <div className="text-xs font-semibold text-gray-800">Where</div>
                            <div className="text-sm text-gray-500 truncate">
                                {selectedLocation || "Search destinations"}
                            </div>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Search destinations..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No destination found.</CommandEmpty>
                                <CommandGroup>
                                    {locations.map((loc) => (
                                        <CommandItem
                                            key={loc}
                                            value={loc}
                                            onSelect={(currentValue) => {
                                                setSelectedLocation(currentValue === selectedLocation ? "" : currentValue);
                                                setOpenLocationDropdown(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedLocation === loc ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {loc}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Check in */}
            <div className="flex-1 px-6 py-3 border-r border-gray-200">
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="w-full text-left">
                            <div className="text-xs font-semibold text-gray-800">Check in</div>
                            <div className="text-sm text-gray-500">
                                {selectedDateRange.from ? selectedDateRange.from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "Add dates"}
                            </div>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                        <CalendarDatePicker date={selectedDateRange} onDateSelect={setSelectedDateRange} />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Check out */}
            <div className="flex-1 px-6 py-3 border-r border-gray-200">
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="w-full text-left">
                            <div className="text-xs font-semibold text-gray-800">Check out</div>
                            <div className="text-sm text-gray-500">
                                {selectedDateRange.to ? selectedDateRange.to.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "Add dates"}
                            </div>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                        <CalendarDatePicker date={selectedDateRange} onDateSelect={setSelectedDateRange} />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Who */}
            <div className="flex-1 px-6 py-3">
                <Popover open={openGuestsDropdown} onOpenChange={setOpenGuestsDropdown}>
                    <PopoverTrigger asChild>
                        <button className="w-full text-left">
                            <div className="text-xs font-semibold text-gray-800">Who</div>
                            <div className="text-sm text-gray-500">
                                {guestsValue ? `${guestsValue} guests` : "Add guests"}
                            </div>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-4 bg-white" align="start">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Number of guests</label>
                            <input
                                type="number"
                                min="1"
                                value={guestsValue}
                                onChange={(e) => setGuestsValue(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="0"
                            />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Search button */}
            <button
                onClick={handleSearch}
                className="mr-2 bg-primary hover:opacity-85 text-white rounded-full p-4 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
                aria-label="Search"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </div>
    );
}
