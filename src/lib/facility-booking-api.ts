// Facility Booking API - Smart booking system with real-time conflict prevention
export interface Facility {
  id: string;
  name: string;
  type: 'seminar_hall' | 'laboratory' | 'conference_room' | 'auditorium' | 'classroom';
  building: string;
  floor: string;
  capacity: number;
  equipment: string[];
  amenities: string[];
  hourlyRate?: number;
  isActive: boolean;
  image?: string;
  description?: string;
}

export interface Booking {
  id: string;
  facilityId: string;
  facilityName: string;
  bookedBy: string;
  bookedByName: string;
  department: string;
  purpose: string;
  eventTitle: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  attendees: number;
  specialRequirements?: string;
  createdAt: string;
  updatedAt: string;
  cost?: number;
}

export interface CreateBookingData {
  facilityId: string;
  purpose: string;
  eventTitle: string;
  startTime: string;
  endTime: string;
  attendees: number;
  specialRequirements?: string;
}

export interface BookingConflict {
  facilityId: string;
  conflictingBooking: Booking;
  timeOverlap: {
    start: string;
    end: string;
  };
}

// Sample data for development
const sampleFacilities: Facility[] = [
  {
    id: '1',
    name: 'Main Seminar Hall',
    type: 'seminar_hall',
    building: 'Academic Block A',
    floor: 'Ground Floor',
    capacity: 200,
    equipment: ['Projector', 'Sound System', 'Whiteboard', 'Air Conditioning'],
    amenities: ['WiFi', 'Parking', 'Cafeteria Access'],
    hourlyRate: 500,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    description: 'Large seminar hall with modern AV equipment, perfect for conferences and presentations.'
  },
  {
    id: '2',
    name: 'Computer Lab 1',
    type: 'laboratory',
    building: 'Tech Building',
    floor: '2nd Floor',
    capacity: 50,
    equipment: ['50 High-end PCs', 'Projector', 'Network Access', 'Printing Facility'],
    amenities: ['WiFi', '24/7 Access', 'Technical Support'],
    hourlyRate: 300,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    description: 'Modern computer laboratory with latest hardware and software for technical training.'
  },
  {
    id: '3',
    name: 'Conference Room Alpha',
    type: 'conference_room',
    building: 'Admin Building',
    floor: '3rd Floor',
    capacity: 25,
    equipment: ['Video Conferencing', 'Smart Board', 'Projector', 'Phone System'],
    amenities: ['WiFi', 'Catering Service', 'Parking'],
    hourlyRate: 400,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1556761175-4b0a8a1e0efb?w=400&h=300&fit=crop',
    description: 'Executive conference room with video conferencing capabilities.'
  },
  {
    id: '4',
    name: 'Chemistry Laboratory',
    type: 'laboratory',
    building: 'Science Building',
    floor: '1st Floor',
    capacity: 30,
    equipment: ['Lab Equipment', 'Safety Equipment', 'Fume Hoods', 'Microscopes'],
    amenities: ['Safety Training', 'Lab Assistant', 'Emergency Equipment'],
    hourlyRate: 350,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop',
    description: 'Fully equipped chemistry laboratory with safety protocols.'
  },
  {
    id: '5',
    name: 'Main Auditorium',
    type: 'auditorium',
    building: 'Cultural Center',
    floor: 'Ground Floor',
    capacity: 500,
    equipment: ['Stage', 'Lighting System', 'Sound System', 'Projection Screen'],
    amenities: ['WiFi', 'Parking', 'Catering', 'Green Room'],
    hourlyRate: 1000,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
    description: 'Large auditorium for major events, conferences, and cultural programs.'
  }
];

const sampleBookings: Booking[] = [
  {
    id: '1',
    facilityId: '1',
    facilityName: 'Main Seminar Hall',
    bookedBy: 'faculty_001',
    bookedByName: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    purpose: 'lecture',
    eventTitle: 'Advanced Algorithms Lecture',
    startTime: '2025-01-15T09:00:00Z',
    endTime: '2025-01-15T11:00:00Z',
    status: 'confirmed',
    attendees: 150,
    specialRequirements: 'Need microphone and presentation setup',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
    cost: 1000
  },
  {
    id: '2',
    facilityId: '2',
    facilityName: 'Computer Lab 1',
    bookedBy: 'faculty_002',
    bookedByName: 'Prof. Michael Chen',
    department: 'Information Technology',
    purpose: 'practical',
    eventTitle: 'Database Management Lab',
    startTime: '2025-01-15T14:00:00Z',
    endTime: '2025-01-15T16:00:00Z',
    status: 'confirmed',
    attendees: 45,
    createdAt: '2025-01-11T08:30:00Z',
    updatedAt: '2025-01-11T08:30:00Z',
    cost: 600
  }
];

// Local storage keys
const FACILITIES_KEY = 'campus_facilities';
const BOOKINGS_KEY = 'campus_bookings';

// Initialize data if not exists
const initializeData = () => {
  if (!localStorage.getItem(FACILITIES_KEY)) {
    localStorage.setItem(FACILITIES_KEY, JSON.stringify(sampleFacilities));
  }
  if (!localStorage.getItem(BOOKINGS_KEY)) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(sampleBookings));
  }
};

// Get all facilities
export const getFacilities = (): Facility[] => {
  initializeData();
  const facilities = localStorage.getItem(FACILITIES_KEY);
  return facilities ? JSON.parse(facilities) : [];
};

// Get facility by ID
export const getFacilityById = (id: string): Facility | null => {
  const facilities = getFacilities();
  return facilities.find(f => f.id === id) || null;
};

// Get all bookings
export const getBookings = (): Booking[] => {
  initializeData();
  const bookings = localStorage.getItem(BOOKINGS_KEY);
  return bookings ? JSON.parse(bookings) : [];
};

// Get bookings for a specific facility
export const getBookingsByFacility = (facilityId: string): Booking[] => {
  const bookings = getBookings();
  return bookings.filter(b => b.facilityId === facilityId);
};

// Get bookings for a specific user
export const getBookingsByUser = (userId: string): Booking[] => {
  const bookings = getBookings();
  return bookings.filter(b => b.bookedBy === userId);
};

// Check for booking conflicts
export const checkBookingConflicts = (
  facilityId: string,
  startTime: string,
  endTime: string,
  excludeBookingId?: string
): BookingConflict[] => {
  const bookings = getBookingsByFacility(facilityId);
  const conflicts: BookingConflict[] = [];
  
  const requestedStart = new Date(startTime);
  const requestedEnd = new Date(endTime);
  
  bookings.forEach(booking => {
    if (booking.id === excludeBookingId || booking.status === 'cancelled') {
      return;
    }
    
    const bookingStart = new Date(booking.startTime);
    const bookingEnd = new Date(booking.endTime);
    
    // Check for time overlap
    if (
      (requestedStart < bookingEnd && requestedEnd > bookingStart)
    ) {
      conflicts.push({
        facilityId,
        conflictingBooking: booking,
        timeOverlap: {
          start: new Date(Math.max(requestedStart.getTime(), bookingStart.getTime())).toISOString(),
          end: new Date(Math.min(requestedEnd.getTime(), bookingEnd.getTime())).toISOString()
        }
      });
    }
  });
  
  return conflicts;
};

// Create a new booking
export const createBooking = async (bookingData: CreateBookingData, userId: string, userName: string, department: string): Promise<Booking> => {
  // Check for conflicts
  const conflicts = checkBookingConflicts(bookingData.facilityId, bookingData.startTime, bookingData.endTime);
  
  if (conflicts.length > 0) {
    throw new Error(`Booking conflicts detected. Please choose a different time slot.`);
  }
  
  const facility = getFacilityById(bookingData.facilityId);
  if (!facility) {
    throw new Error('Facility not found');
  }
  
  // Calculate cost
  const startTime = new Date(bookingData.startTime);
  const endTime = new Date(bookingData.endTime);
  const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  const cost = facility.hourlyRate ? facility.hourlyRate * durationHours : 0;
  
  const newBooking: Booking = {
    id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    facilityId: bookingData.facilityId,
    facilityName: facility.name,
    bookedBy: userId,
    bookedByName: userName,
    department,
    purpose: bookingData.purpose,
    eventTitle: bookingData.eventTitle,
    startTime: bookingData.startTime,
    endTime: bookingData.endTime,
    status: 'confirmed',
    attendees: bookingData.attendees,
    specialRequirements: bookingData.specialRequirements,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    cost
  };
  
  const bookings = getBookings();
  bookings.push(newBooking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  
  return newBooking;
};

// Update booking
export const updateBooking = async (bookingId: string, updates: Partial<CreateBookingData>): Promise<Booking> => {
  const bookings = getBookings();
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  
  if (bookingIndex === -1) {
    throw new Error('Booking not found');
  }
  
  const booking = bookings[bookingIndex];
  
  // If updating time, check for conflicts
  if (updates.startTime || updates.endTime) {
    const startTime = updates.startTime || booking.startTime;
    const endTime = updates.endTime || booking.endTime;
    
    const conflicts = checkBookingConflicts(booking.facilityId, startTime, endTime, bookingId);
    if (conflicts.length > 0) {
      throw new Error('Updated time conflicts with existing bookings');
    }
  }
  
  // Update booking
  const updatedBooking = {
    ...booking,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  bookings[bookingIndex] = updatedBooking;
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  
  return updatedBooking;
};

// Cancel booking
export const cancelBooking = async (bookingId: string): Promise<void> => {
  const bookings = getBookings();
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  
  if (bookingIndex === -1) {
    throw new Error('Booking not found');
  }
  
  bookings[bookingIndex].status = 'cancelled';
  bookings[bookingIndex].updatedAt = new Date().toISOString();
  
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

// Get facility availability for a specific date
export const getFacilityAvailability = (facilityId: string, date: string): { time: string; available: boolean; booking?: Booking }[] => {
  const bookings = getBookingsByFacility(facilityId);
  const targetDate = new Date(date);
  const availability: { time: string; available: boolean; booking?: Booking }[] = [];
  
  // Generate hourly slots from 8 AM to 10 PM
  for (let hour = 8; hour <= 22; hour++) {
    const slotStart = new Date(targetDate);
    slotStart.setHours(hour, 0, 0, 0);
    const slotEnd = new Date(slotStart);
    slotEnd.setHours(hour + 1, 0, 0, 0);
    
    const conflictingBooking = bookings.find(booking => {
      if (booking.status === 'cancelled') return false;
      
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      
      return slotStart < bookingEnd && slotEnd > bookingStart;
    });
    
    availability.push({
      time: slotStart.toISOString(),
      available: !conflictingBooking,
      booking: conflictingBooking
    });
  }
  
  return availability;
};

// Get booking statistics
export const getBookingStats = () => {
  const bookings = getBookings();
  const facilities = getFacilities();
  
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
  
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + (b.cost || 0), 0);
  
  const facilityUtilization = facilities.map(facility => {
    const facilityBookings = bookings.filter(b => b.facilityId === facility.id && b.status === 'confirmed');
    return {
      facilityId: facility.id,
      facilityName: facility.name,
      totalBookings: facilityBookings.length,
      utilization: facilityBookings.length > 0 ? (facilityBookings.length / 30) * 100 : 0 // Assuming 30 days
    };
  });
  
  return {
    totalBookings,
    confirmedBookings,
    pendingBookings,
    cancelledBookings,
    totalRevenue,
    facilityUtilization
  };
};
