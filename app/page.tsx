'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Car, MapPin, CalendarIcon, Clock, Users, Fuel, Settings, Shield, Star, ChevronRight, Search, Filter, Heart, Share2 } from 'lucide-react'
import { format } from 'date-fns'
import Image from 'next/image'

interface CarType {
  id: string
  name: string
  category: string
  image: string
  pricePerDay: number
  features: string[]
  rating: number
  reviews: number
  transmission: string
  fuel: string
  seats: number
  available: boolean
}

const cars: CarType[] = [
  {
    id: '1',
    name: 'Tesla Model 3',
    category: 'Electric',
  image: '/Tesla_Model_3.jpg',
    pricePerDay: 9999,
    features: ['Autopilot', 'Premium Audio', 'Supercharging'],
    rating: 4.9,
    reviews: 234,
    transmission: 'Automatic',
    fuel: 'Electric',
    seats: 5,
    available: true
  },
  {
    id: '2',
    name: 'BMW X5',
    category: 'SUV',
    image: '/bmw.jpg',
    pricePerDay: 22500,
    features: ['All-Wheel Drive', 'Leather Seats', 'Navigation'],
    rating: 4.8,
    reviews: 189,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    seats: 7,
    available: true
  },
  {
    id: '3',
    name: 'Mercedes C-Class',
    category: 'Luxury',
    image: '/Mercedes.jpg',
    pricePerDay: 19500,
    features: ['Premium Interior', 'Advanced Safety', 'Bluetooth'],
    rating: 4.7,
    reviews: 156,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    seats: 5,
    available: true
  },
  {
    id: '4',
    name: 'Toyota Camry',
    category: 'Economy',
    image: '/Toyota_Camry.jpg',
    pricePerDay: 19900,
    features: ['Fuel Efficient', 'Reliable', 'Spacious'],
    rating: 4.6,
    reviews: 298,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    seats: 5,
    available: true
  },
  {
    id: '5',
    name: 'Audi A4',
    category: 'Luxury',
    image: '/Audi_A4.jpg',
    pricePerDay: 9500,
    features: ['Quattro AWD', 'Virtual Cockpit', 'Premium Sound'],
    rating: 4.8,
    reviews: 167,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    seats: 5,
    available: false
  },
  {
    id: '6',
    name: 'Ford Mustang',
    category: 'Sports',
    image: '/ford-mustang-shelby.jpg',
    pricePerDay: 12000,
    features: ['V8 Engine', 'Sport Mode', 'Premium Audio'],
    rating: 4.9,
    reviews: 203,
    transmission: 'Manual',
    fuel: 'Gasoline',
    seats: 4,
    available: true
  }
]

export default function CarBookingSite() {
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null)
  const [pickupDate, setPickupDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [pickupLocation, setPickupLocation] = useState('')
  const [returnLocation, setReturnLocation] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [bookingStep, setBookingStep] = useState(1)

  const filteredCars = cars.filter(car => {
    const matchesCategory = filterCategory === 'all' || car.category.toLowerCase() === filterCategory.toLowerCase()
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         car.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleBooking = (car: CarType) => {
    setSelectedCar(car)
    setBookingStep(2)
  }

  const calculateTotal = () => {
    if (!selectedCar || !pickupDate || !returnDate) return 0
    const days = Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))
    return days * selectedCar.pricePerDay
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DriveEasy</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Cars</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      {bookingStep === 1 && (
        <>
          {/* Hero Section */}
          <section className="relative py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Find Your Perfect
                  <span className="text-blue-600"> Ride</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Book premium cars for your next adventure. Easy booking, competitive prices, and exceptional service.
                </p>
              </div>

              {/* Search Form */}
              <Card className="max-w-4xl mx-auto shadow-xl">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup-location">Pickup Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="pickup-location"
                          placeholder="Enter city or airport"
                          className="pl-10"
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="return-location">Return Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="return-location"
                          placeholder="Enter city or airport"
                          className="pl-10"
                          value={returnLocation}
                          onChange={(e) => setReturnLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Pickup Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {pickupDate ? format(pickupDate, 'PPP') : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={pickupDate}
                            onSelect={setPickupDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Return Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {returnDate ? format(returnDate, 'PPP') : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={returnDate}
                            onSelect={setReturnDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Filters and Search */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search cars..."
                    className="pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-gray-600">
                {filteredCars.length} cars available
              </div>
            </div>
          </section>

          {/* Car Grid */}
          {/*increase width size*/}
<section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <Card key={car.id} className={`overflow-hidden hover:shadow-lg transition-shadow ${!car.available ? 'opacity-60' : ''}`}>
                  <div className="relative">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant={car.available ? "default" : "secondary"}>
                        {car.available ? 'Available' : 'Unavailable'}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
                        <p className="text-sm text-gray-600">{car.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">Rs.{car.pricePerDay}</div>
                        <div className="text-sm text-gray-600">per day</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 mb-4">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{car.rating}</span>
                      <span className="text-sm text-gray-600">({car.reviews} reviews)</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {car.seats} seats
                      </div>
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-1" />
                        {car.transmission}
                      </div>
                      <div className="flex items-center">
                        <Fuel className="h-4 w-4 mr-1" />
                        {car.fuel}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {car.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {car.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{car.features.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={() => handleBooking(car)}
                      disabled={!car.available}
                    >
                      {car.available ? 'Book Now' : 'Unavailable'}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}

      {bookingStep === 2 && selectedCar && (
<section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => setBookingStep(1)} className="mb-4">
              ← Back to Cars
            </Button>
            <h2 className="text-3xl font-bold text-gray-900">Complete Your Booking</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license">Driver's License Number</Label>
                    <Input id="license" placeholder="DL123456789" />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Additional Options</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>GPS Navigation (Rs.5/day)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Child Safety Seat (Rs.8/day)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Additional Driver (Rs.10/day)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Full Insurance Coverage (Rs.15/day)</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={selectedCar.image || "/placeholder.svg"}
                      alt={selectedCar.name}
                      width={80}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{selectedCar.name}</h4>
                      <p className="text-sm text-gray-600">{selectedCar.category}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Pickup:</span>
                      <span>{pickupDate ? format(pickupDate, 'MMM dd, yyyy') : 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return:</span>
                      <span>{returnDate ? format(returnDate, 'MMM dd, yyyy') : 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>
                        {pickupDate && returnDate 
                          ? `${Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))} days`
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Car rental:</span>
                      <span>Rs.{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees:</span>
                      <span>Rs.{Math.round(calculateTotal() * 0.12)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>Rs.{calculateTotal() + Math.round(calculateTotal() * 0.12)}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={() => setBookingStep(3)}>
                    <Shield className="mr-2 h-4 w-4" />
                    Secure Checkout
                  </Button>

                  <div className="text-xs text-gray-600 text-center">
                    <Shield className="inline h-3 w-3 mr-1" />
                    Your payment information is secure and encrypted
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {bookingStep === 3 && selectedCar && (
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your reservation for the {selectedCar.name} has been successfully confirmed.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4">Booking Reference: #DR{Math.random().toString(36).substr(2, 9).toUpperCase()}</h3>
              <div className="text-sm text-left space-y-2">
                <div className="flex justify-between">
                  <span>Vehicle:</span>
                  <span>{selectedCar.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup Date:</span>
                  <span>{pickupDate ? format(pickupDate, 'MMM dd, yyyy') : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Return Date:</span>
                  <span>{returnDate ? format(returnDate, 'MMM dd, yyyy') : 'N/A'}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span>Rs.{calculateTotal() + Math.round(calculateTotal() * 0.12)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setBookingStep(1)}>
                Book Another Car
              </Button>
              <Button variant="outline">
                View Booking Details
              </Button>
            </div>
            
            <p className="text-sm text-gray-600 mt-6">
              A confirmation email has been sent to your email address with all the details.
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">DriveEasy</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for premium car rentals worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Car Rental</a></li>
                <li><a href="#" className="hover:text-white">Long-term Lease</a></li>
                <li><a href="#" className="hover:text-white">Corporate Fleet</a></li>
                <li><a href="#" className="hover:text-white">Airport Pickup</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ support@driveeasy.com</p>
                <p>📍 123 Main Street, Cuddalore, Tamil Nadu 607003</p>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 DriveEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}