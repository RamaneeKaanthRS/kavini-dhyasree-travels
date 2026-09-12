export interface VehicleService {
  id: string;
  name: string;
  tagline: string;
  startingPrice: number;
  priceNote: string;
  image: string;
  category: 'Hatchback' | 'Sedan' | 'MUV / SUV' | 'Off-Road 4x4' | 'Combo Package';
  capacity: string;
  transmission: string;
  fuelType: string;
  features: string[];
  description: string;
  availableDurations: string[];
  serviceOptions: string[];
  popular?: boolean;
}

export const VEHICLES_DATA: VehicleService[] = [
  {
    id: 'swift',
    name: 'Swift',
    tagline: 'Reliable, compact & economical hill climb specialist',
    startingPrice: 1800,
    priceNote: 'Starting from ₹1,800 for pickup',
    image: '/images/yercaud/swift.jpg',
    category: 'Hatchback',
    capacity: '4 Passengers',
    transmission: 'Manual',
    fuelType: 'Petrol / Diesel',
    features: [
      'Chilled Air Conditioning',
      'Comfortable 4-Passenger Seating',
      'Compact & Agile for 20 Hairpin Bends',
      'Verified Local Hill Driver',
      'Clean & Sanitized Interiors',
      'Audio Music System'
    ],
    description: 'Perfect for couples, solo travelers, or small families looking for swift, punctual pickups and drops between Salem Junction, Bus Stand, and Yercaud hill top.',
    availableDurations: ['Pickup Only', '1 Day', '2 Days', '3 Days', 'Custom Trip'],
    serviceOptions: ['Pickup only', 'Drop only', 'Round Trip', 'Local Sightseeing'],
    popular: true
  },
  {
    id: 'ertiga',
    name: 'Ertiga',
    tagline: 'Spacious family cruiser with smooth ghat-road comfort',
    startingPrice: 2400,
    priceNote: 'Starting from ₹2,400',
    image: '/images/yercaud/ertiga.jpg',
    category: 'MUV / SUV',
    capacity: '6 - 7 Passengers',
    transmission: 'Manual',
    fuelType: 'Diesel / Smart Hybrid',
    features: [
      'Flexible 3-Row Seating (6-7 Pax)',
      'Dual AC with Rear Blower Vents',
      'Spacious Boot for Hill Luggage',
      'Comfortable Suspension for Ghat Roads',
      'Experienced Mountain Chauffeur',
      'Mobile Charging Ports'
    ],
    description: 'The preferred choice for families and groups traveling together. Balances generous legroom, luggage space, and budget for scenic Salem to Yercaud climbs.',
    availableDurations: ['Pickup Only', '1 Day', '2 Days', '3 Days', 'Full Weekend'],
    serviceOptions: ['Pickup only', 'Pickup and Drop', 'Round Trip', 'Ghat Tour & Sightseeing'],
    popular: true
  },
  {
    id: 'innova',
    name: 'Innova',
    tagline: 'The ultimate benchmark in premium mountain luxury & ride quality',
    startingPrice: 3000,
    priceNote: 'Starting from ₹3,000',
    image: '/images/yercaud/innova.jpg',
    category: 'MUV / SUV',
    capacity: '7 - 8 Passengers',
    transmission: 'Manual / Automatic',
    fuelType: 'Diesel Power',
    features: [
      'Supreme Captain Seat Comfort',
      'Superior Shock Absorption on Mountain Curves',
      'Massive Luggage Capacity',
      'Tri-Zone Climate Control',
      'Senior Hill-Specialist Chauffeur',
      'Quiet & Plush Cabin Experience'
    ],
    description: 'The undisputed gold standard for luxury outstation travel. Enjoy a plush, vibration-free ride up the 20 Yercaud hairpin bends with maximum comfort.',
    availableDurations: ['Pickup Only', '1 Day', '2 Days', '3 Days', 'Extended Tour'],
    serviceOptions: ['Pickup only', 'Pickup and Drop', '2 Days with pickup and drop', 'Round Trip & Full Sightseeing'],
    popular: true
  },
  {
    id: 'off-road-package',
    name: 'Off-Road Vehicle Package',
    tagline: 'High-clearance 4x4 thrill for untouched trails & viewpoints',
    startingPrice: 4500,
    priceNote: 'Starting from ₹4,500',
    image: '/images/yercaud/offroad_4x4.jpg',
    category: 'Off-Road 4x4',
    capacity: '4 - 6 Adventurers',
    transmission: '4x4 High/Low Gear',
    fuelType: 'High-Torque Turbo',
    features: [
      'Heavy-Duty 4WD Suspension',
      'All-Terrain Off-Road Tyres',
      'Skilled Off-Road Expedition Captain',
      'Access to Unpaved Estate Trails',
      'Cliff-Edge Sunset Viewpoint Routes',
      'Private Waterfalls Track Access'
    ],
    description: 'Go where ordinary cabs cannot. Conquer rocky terrains, misty coffee plantation trails, secluded hillocks, and hidden forest waterfalls with an experienced off-road pilot.',
    availableDurations: ['Half Day Trail', 'Full Day Adventure', '2 Days Safari', 'Sunset Special'],
    serviceOptions: ['Standard Trail', 'Private Estate Route', 'Waterfalls Track', 'Extreme Ridge Route'],
    popular: true
  },
  {
    id: 'pickup-drop-room-combo',
    name: 'Pickup + Drop + Room Package',
    tagline: 'All-inclusive seamless weekend getaway: Salem transfer + Hill stay',
    startingPrice: 6000,
    priceNote: 'Around ₹6,000',
    image: '/stayphotos/stay_photo00003.jpeg',
    category: 'Combo Package',
    capacity: 'Couples / Families (2 - 5 Pax)',
    transmission: 'Includes Dedicated Vehicle',
    fuelType: 'All Tolls & Fuel Included',
    features: [
      'Station / Home Pickup in Salem',
      'Scenic Hill Climb & Valley Stopovers',
      'Comfortable Hillside Room / Cottage Stay',
      'Return Drop to Salem Junction / Bus Stand',
      'Free Parking & Hot Water Amenities',
      'Sightseeing Add-on Available'
    ],
    description: 'The zero-hassle holiday combo. We pick you up at Salem, chauffeur you to your scenic Yercaud room/cottage, provide local stay support, and safely drop you back.',
    availableDurations: ['1 Night / 2 Days', '2 Nights / 3 Days', 'Weekend Special', 'Custom Itinerary'],
    serviceOptions: ['Standard Room + Swift', 'Deluxe Room + Ertiga', 'Cottage + Innova', 'Complete Sightseeing Combo']
  }
];
