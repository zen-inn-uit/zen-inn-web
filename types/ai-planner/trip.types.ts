export enum ActivityType {
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
  DINING = 'DINING',
  ACTIVITY = 'ACTIVITY',
  EXPERIENCE = 'EXPERIENCE',
  RELAXATION = 'RELAXATION',
  TRANSPORTATION = 'TRANSPORTATION',
}

export enum TripBudget {
  ECONOMY = 'ECONOMY',
  MODERATE = 'MODERATE',
  LUXURY = 'LUXURY',
}

export interface TripActivity {
  id: string;
  name: string;
  description?: string;
  time: string;
  type: ActivityType;
  location?: string;
  price?: string;
  imageUrl?: string;
}

export interface TripDay {
  id: string;
  dayNumber: number;
  date: string;
  activities: TripActivity[];
}

export interface Trip {
  id: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  budget?: TripBudget;
  preferences: string[];
  hotelId?: string;
  days: TripDay[];
  createdAt: string;
}

export interface GenerateTripParams {
  description: string;
  preferences?: string[];
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  budget?: TripBudget;
  hotelId?: string;
}
