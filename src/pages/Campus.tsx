import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Users, 
  Phone,
  Mail,
  Clock,
  Star,
  Search,
  Filter,
  Ticket,
  Wifi,
  Car,
  Utensils,
  BookOpen,
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

export default function Campus() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Campus Events
  const events = [
    { 
      id: 1,
      title: 'Tech Fest 2025', 
      type: 'Festival',
      date: '2025-10-25',
      time: '9:00 AM',
      location: 'Main Auditorium',
      description: 'Annual technology festival with coding competitions and tech talks',
      attendees: 500,
      registered: true,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop'
    },
    { 
      id: 2,
      title: 'Career Fair', 
      type: 'Career',
      date: '2025-10-28',
      time: '10:00 AM',
      location: 'Sports Complex',
      description: 'Meet with top companies and explore career opportunities',
      attendees: 300,
      registered: false,
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop'
    },
    { 
      id: 3,
      title: 'Cultural Night', 
      type: 'Cultural',
      date: '2025-11-02',
      time: '6:00 PM',
      location: 'Open Air Theatre',
      description: 'Celebrate diversity with performances from different cultures',
      attendees: 800,
      registered: true,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
    },
    { 
      id: 4,
      title: 'Sports Day', 
      type: 'Sports',
      date: '2025-11-05',
      time: '8:00 AM',
      location: 'Sports Ground',
      description: 'Inter-department sports competitions and games',
      attendees: 400,
      registered: false,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
  ];

  // Campus Services
  const services = [
    { 
      id: 1,
      name: 'Hostel Management', 
      category: 'Accommodation',
      description: 'Room allocation, maintenance requests, and hostel facilities',
      status: 'Available',
      contact: '+91-9876543210',
      location: 'Hostel Block A',
      rating: 4.2,
      icon: Building2
    },
    { 
      id: 2,
      name: 'Transportation', 
      category: 'Transport',
      description: 'Campus shuttle service and parking facilities',
      status: 'Available',
      contact: '+91-9876543211',
      location: 'Main Gate',
      rating: 4.5,
      icon: Car
    },
    { 
      id: 3,
      name: 'WiFi Services', 
      category: 'Technology',
      description: 'High-speed internet access across campus',
      status: 'Available',
      contact: 'wifi@campus.edu',
      location: 'IT Department',
      rating: 4.8,
      icon: Wifi
    },
    { 
      id: 4,
      name: 'Medical Center', 
      category: 'Health',
      description: '24/7 medical assistance and emergency care',
      status: 'Available',
      contact: '+91-9876543212',
      location: 'Health Center',
      rating: 4.7,
      icon: AlertCircle
    },
    { 
      id: 5,
      name: 'Cafeteria', 
      category: 'Food',
      description: 'Multiple dining options and meal plans',
      status: 'Available',
      contact: '+91-9876543213',
      location: 'Food Court',
      rating: 4.3,
      icon: Utensils
    },
    { 
      id: 6,
      name: 'Library Services', 
      category: 'Academic',
      description: 'Study spaces, research assistance, and digital resources',
      status: 'Available',
      contact: 'library@campus.edu',
      location: 'Central Library',
      rating: 4.9,
      icon: BookOpen
    },
  ];

  // Campus Facilities
  const facilities = [
    { 
      id: 1,
      name: 'Computer Lab', 
      building: 'Tech Building',
      floor: '2nd Floor',
      capacity: 50,
      available: true,
      equipment: 'High-end PCs, Projectors',
      hours: '8:00 AM - 10:00 PM'
    },
    { 
      id: 2,
      name: 'Conference Room A', 
      building: 'Admin Building',
      floor: '3rd Floor',
      capacity: 20,
      available: false,
      equipment: 'Projector, Whiteboard, Video Conferencing',
      hours: '9:00 AM - 6:00 PM'
    },
    { 
      id: 3,
      name: 'Gymnasium', 
      building: 'Sports Complex',
      floor: 'Ground Floor',
      capacity: 100,
      available: true,
      equipment: 'Cardio Machines, Weights, Locker Rooms',
      hours: '6:00 AM - 11:00 PM'
    },
    { 
      id: 4,
      name: 'Study Hall', 
      building: 'Library Building',
      floor: '1st Floor',
      capacity: 200,
      available: true,
      equipment: 'Individual Study Carrels, Group Study Rooms',
      hours: '24/7'
    },
  ];

  // Campus News & Announcements
  const announcements = [
    { 
      id: 1,
      title: 'New WiFi Network Launched', 
      category: 'Technology',
      date: '2025-10-15',
      priority: 'high',
      description: 'Campus-wide high-speed WiFi network is now available. Connect to "CampusConnect-5G" for faster internet access.',
      read: false
    },
    { 
      id: 2,
      title: 'Hostel Maintenance Schedule', 
      category: 'Maintenance',
      date: '2025-10-14',
      priority: 'medium',
      description: 'Scheduled maintenance for Hostel Block B from Oct 20-22. Alternative accommodation will be provided.',
      read: true
    },
    { 
      id: 3,
      title: 'Library Extended Hours', 
      category: 'Academic',
      date: '2025-10-13',
      priority: 'low',
      description: 'Library will remain open 24/7 during exam period (Oct 25 - Nov 15).',
      read: false
    },
    { 
      id: 4,
      title: 'Campus Shuttle Service Update', 
      category: 'Transport',
      date: '2025-10-12',
      priority: 'medium',
      description: 'New shuttle routes added. Check the updated schedule on the campus app.',
      read: true
    },
  ];

  const registerForEvent = (event: any) => {
    toast.success(`Registered for ${event.title}!`);
  };

  const contactService = (service: any) => {
    toast.success(`Contacting ${service.name}...`);
  };

  const bookFacility = (facility: any) => {
    toast.success(`Booking request sent for ${facility.name}`);
  };

  const markAsRead = (announcement: any) => {
    toast.success(`Marked "${announcement.title}" as read`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className={theme === 'cyber' ? 'gradient-cyber bg-clip-text text-transparent' : ''}>
            Campus Services
          </span>
        </h1>
        <p className="text-muted-foreground">Explore events, services, and facilities across campus</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="flex gap-3 max-w-2xl">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search events, services, or facilities..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <Calendar className="h-8 w-8 text-blue-500 mb-2" />
          <p className="font-bold text-2xl">{events.length}</p>
          <p className="text-sm text-muted-foreground">Upcoming Events</p>
        </Card>
        
        <Card className="p-6">
          <Building2 className="h-8 w-8 text-green-500 mb-2" />
          <p className="font-bold text-2xl">{services.length}</p>
          <p className="text-sm text-muted-foreground">Campus Services</p>
        </Card>
        
        <Card className="p-6">
          <MapPin className="h-8 w-8 text-purple-500 mb-2" />
          <p className="font-bold text-2xl">{facilities.length}</p>
          <p className="text-sm text-muted-foreground">Available Facilities</p>
        </Card>
        
        <Card className="p-6">
          <Info className="h-8 w-8 text-orange-500 mb-2" />
          <p className="font-bold text-2xl">{announcements.filter(a => !a.read).length}</p>
          <p className="text-sm text-muted-foreground">New Announcements</p>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="events" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        {/* Events Tab */}
        <TabsContent value="events">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Campus Events</h2>
              <Button className="gap-2">
                <Calendar className="h-4 w-4" />
                View Calendar
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="p-4 hover:shadow-card transition-smooth">
                  <div className="flex gap-4">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold">{event.title}</h3>
                          <Badge variant="outline" className="mt-1">{event.type}</Badge>
                        </div>
                        {event.registered && (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Registered
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        onClick={() => registerForEvent(event)}
                        disabled={event.registered}
                        className="w-full"
                      >
                        {event.registered ? 'Already Registered' : 'Register Now'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Campus Services</h2>
              <Button className="gap-2">
                <Phone className="h-4 w-4" />
                Emergency Contact
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Icon className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-bold">{service.name}</h3>
                          <Badge variant="outline" className="text-xs">{service.category}</Badge>
                        </div>
                      </div>
                      <Badge variant={service.status === 'Available' ? 'default' : 'destructive'}>
                        {service.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{service.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{service.contact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{service.rating}/5.0</span>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => contactService(service)}
                    >
                      Contact Service
                    </Button>
                  </Card>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Facilities Tab */}
        <TabsContent value="facilities">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Campus Facilities</h2>
              <Button className="gap-2">
                <MapPin className="h-4 w-4" />
                Campus Map
              </Button>
            </div>
            
            <div className="space-y-4">
              {facilities.map((facility) => (
                <Card key={facility.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold">{facility.name}</h3>
                        <Badge variant={facility.available ? 'default' : 'destructive'}>
                          {facility.available ? 'Available' : 'Occupied'}
                        </Badge>
                        <Badge variant="outline">Capacity: {facility.capacity}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <span className="font-medium">Building:</span> {facility.building}
                        </div>
                        <div>
                          <span className="font-medium">Floor:</span> {facility.floor}
                        </div>
                        <div>
                          <span className="font-medium">Hours:</span> {facility.hours}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Equipment:</span> {facility.equipment}
                      </p>
                    </div>
                    
                    <Button 
                      size="sm" 
                      onClick={() => bookFacility(facility)}
                      disabled={!facility.available}
                    >
                      {facility.available ? 'Book Now' : 'Unavailable'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Campus Announcements</h2>
              <Button className="gap-2">
                <Info className="h-4 w-4" />
                All Announcements
              </Button>
            </div>
            
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card 
                  key={announcement.id} 
                  className={`p-4 hover:shadow-card transition-smooth ${
                    !announcement.read ? 'border-primary/50 bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold">{announcement.title}</h3>
                        <Badge variant="outline">{announcement.category}</Badge>
                        <Badge variant={
                          announcement.priority === 'high' ? 'destructive' : 
                          announcement.priority === 'medium' ? 'secondary' : 'outline'
                        }>
                          {announcement.priority}
                        </Badge>
                        {!announcement.read && (
                          <Badge variant="default" className="gap-1">
                            <Info className="h-3 w-3" />
                            New
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{announcement.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(announcement.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {!announcement.read && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => markAsRead(announcement)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
