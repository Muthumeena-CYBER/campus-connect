import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { FacilityBooking } from '@/types/facility';
import { toast } from 'sonner';

interface FacilityBookingManagementProps {
  bookings: FacilityBooking[];
  onUpdateBooking: (bookingId: string, status: FacilityBooking['status']) => void;
  onDeleteBooking: (bookingId: string) => void;
}

export function FacilityBookingManagement({ 
  bookings, 
  onUpdateBooking, 
  onDeleteBooking 
}: FacilityBookingManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<FacilityBooking | null>(null);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookedByName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: FacilityBooking['status']) => {
    const variants = {
      confirmed: 'default',
      pending: 'secondary',
      cancelled: 'destructive',
      completed: 'outline'
    } as const;

    const icons = {
      confirmed: CheckCircle2,
      pending: AlertCircle,
      cancelled: XCircle,
      completed: CheckCircle2
    } as const;

    const Icon = icons[status];

    return (
      <Badge variant={variants[status]} className="gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleStatusUpdate = (bookingId: string, newStatus: FacilityBooking['status']) => {
    onUpdateBooking(bookingId, newStatus);
    toast.success(`Booking status updated to ${newStatus}`);
  };

  const handleDelete = (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      onDeleteBooking(bookingId);
      toast.success('Booking deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Facility Booking Management</h2>
          <p className="text-muted-foreground">Manage and monitor facility bookings</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Calendar className="h-3 w-3" />
            {bookings.length} Total Bookings
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Facility</TableHead>
                <TableHead>Booked By</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {booking.facilityName}
                    </div>
                  </TableCell>
                  <TableCell>{booking.bookedByName}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{booking.purpose}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {booking.eventType}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm">{new Date(booking.date).toLocaleDateString()}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {booking.startTime} - {booking.endTime}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {booking.attendees}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Booking Details</DialogTitle>
                          </DialogHeader>
                          {selectedBooking && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Facility</label>
                                  <p className="text-sm text-muted-foreground">{selectedBooking.facilityName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Booked By</label>
                                  <p className="text-sm text-muted-foreground">{selectedBooking.bookedByName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Purpose</label>
                                  <p className="text-sm text-muted-foreground">{selectedBooking.purpose}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Event Type</label>
                                  <p className="text-sm text-muted-foreground capitalize">{selectedBooking.eventType}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Date</label>
                                  <p className="text-sm text-muted-foreground">{new Date(selectedBooking.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Time</label>
                                  <p className="text-sm text-muted-foreground">{selectedBooking.startTime} - {selectedBooking.endTime}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Attendees</label>
                                  <p className="text-sm text-muted-foreground">{selectedBooking.attendees}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                                </div>
                              </div>
                              {selectedBooking.notes && (
                                <div>
                                  <label className="text-sm font-medium">Notes</label>
                                  <p className="text-sm text-muted-foreground">{selectedBooking.notes}</p>
                                </div>
                              )}
                              {selectedBooking.equipmentRequested && selectedBooking.equipmentRequested.length > 0 && (
                                <div>
                                  <label className="text-sm font-medium">Equipment Requested</label>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {selectedBooking.equipmentRequested.map((equipment) => (
                                      <Badge key={equipment} variant="outline">{equipment}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(booking.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No bookings found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

