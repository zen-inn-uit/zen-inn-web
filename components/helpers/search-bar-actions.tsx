'use client';

import Form from 'next/form';
import Image from 'next/image';
import { useState } from 'react';
import { CalendarDatePicker } from './calendar-date-picker';
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

export default function SearchBarActions({location, dateFrom, dateTo, guests} : {location?: string, dateFrom?: string, dateTo?: string, guests?: string}) {
    const [selectedDateRange, setSelectedDateRange] = useState({
        from: dateFrom ? new Date(dateFrom) : new Date(new Date().getFullYear(), 0, 1), // Default to start of year
        to: dateTo ? new Date(dateTo) : new Date(), // Default to today
    });
    
    const [selectedLocation, setSelectedLocation] = useState(location || '');
    const [openLocationDropdown, setOpenLocationDropdown] = useState(false);
    const [guestsValue, setGuestsValue] = useState(guests || '');

    const isFormValid = selectedLocation && selectedDateRange.from && selectedDateRange.to && guestsValue;
    
    // dummy location data - replace with DB fetch later
    const locations = [
        "Paris, France",
        "London, UK",
        "New York, USA",
        "Tokyo, Japan",
        "Barcelona, Spain",
        "Rome, Italy",
        "Dubai, UAE",
        "Bali, Indonesia",
        "Bangkok, Thailand",
        "Sydney, Australia"
    ];
    
    return (
        <div>
            <Form action="/search" scroll={false} className="flex space-x-4">
                <div className="flex items-center space-x-2 rounded-3xl focus-within:ring-accent">
                    <Image src="/location.svg" alt="Location Icon" width={24} height={24} />
                    <Popover open={openLocationDropdown} onOpenChange={setOpenLocationDropdown}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openLocationDropdown}
                                className="border border-gray-300 rounded-3xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white w-[200px] justify-between"
                            >
                                {selectedLocation || "Enter destination"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 bg-white">
                            <Command>
                                <CommandInput placeholder="Search destination..." className="h-9" />
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
                    <input type="hidden" name="location" value={selectedLocation} />
                </div>
                <div className="flex items-center space-x-2 rounded-3xl focus-within:ring-accent">
                    <Image src="/calendar.svg" alt="Calendar Icon" width={24} height={24} />
                    <CalendarDatePicker date={selectedDateRange} onDateSelect={setSelectedDateRange} />
                    <input type="hidden" name="dateFrom" value={selectedDateRange.from.toISOString()} />
                    <input type="hidden" name="dateTo" value={selectedDateRange.to.toISOString()} />
                </div>
                <div className="flex items-center space-x-2 rounded-3xl focus-within:ring-accent">
                    <Image src="/users.svg" alt="Users Icon" width={24} height={24} />
                    <input
                        type="number"
                        name="guests"
                        value={guestsValue}
                        onChange={(e) => setGuestsValue(e.target.value) }
                        placeholder="Enter number of guests"
                        className="border border-gray-300 rounded-3xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={cn(
                        "bg-transparent border-2 border-accent text-accent rounded-full p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-accent group",
                        isFormValid 
                            ? "hover:bg-accent hover:text-white cursor-pointer" 
                            : "opacity-50 cursor-not-allowed"
                    )}
                    aria-label="Search"
                >
                    <Image src="/search.svg" alt="Search" width={24} height={24} className="group-hover:brightness-0 group-hover:invert transition-all" />
                </button>
            </Form>
        </div>
    );
}