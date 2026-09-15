export interface RoomAccommodation {
  id: string;
  name: string;
  category: 'Single Bed' | 'Double Bed' | 'Large Family Room' | 'Cottage' | 'Private House / Homestay';
  capacity: string;
  maxGuests: number;
  startingPrice?: number;
  priceNote: string;
  isEnquiryOnly: boolean;
  primaryImage: string;
  galleryImages: string[];
  tagline: string;
  description: string;
  facilities: string[];
  bestFor: string;
  popular?: boolean;
}

export const ROOMS_DATA: RoomAccommodation[] = [
  {
    id: 'single-bed-cozy-room',
    name: 'Cozy Hill View Room',
    category: 'Single Bed',
    capacity: '1 - 2 Guests (Flexible Bedding)',
    maxGuests: 2,
    startingPrice: 1999,
    priceNote: 'Starting from ₹1,999/day',
    isEnquiryOnly: false,
    primaryImage: '/stayphotos/stay_photo00006.jpeg',
    galleryImages: [
      '/stayphotos/stay_photo00006.jpeg',
      '/stayphotos/stay_photo00002.jpeg',
      '/stayphotos/stay_photo00004.jpeg',
      '/stayphotos/stay_photo00012.jpeg',
      '/stayphotos/stay_photo00001.jpeg'
    ],
    tagline: 'Peaceful, budget-friendly mountain retreat with fresh Yercaud valley air',
    description: 'A spotless, well-appointed room tailored for solo travelers, business visits, or couples. Features a comfy bed, modern attached western bathroom with geyser, and peaceful hill greenery right outside.',
    facilities: [
      '24/7 Hot Water Geyser',
      'Attached Modern Bath & Western Toilet',
      'Free Safe Car / Bike Parking',
      'LED Flat Screen TV',
      'Power Backup',
      'Fresh Linen & Room Service'
    ],
    bestFor: 'Solo explorers, backpackers & couples seeking quiet comfort'
  },
  {
    id: 'double-bed-balcony-room',
    name: 'Deluxe Double Bed Room with Balcony',
    category: 'Double Bed',
    capacity: '2 - 3 Guests',
    maxGuests: 3,
    startingPrice: 1999,
    priceNote: 'Starting from ₹1,999/day',
    isEnquiryOnly: false,
    primaryImage: '/stayphotos/stay_photo00014.jpeg',
    galleryImages: [
      '/stayphotos/stay_photo00014.jpeg',
      '/stayphotos/stay_photo00005.jpeg',
      '/stayphotos/stay_photo00009.jpeg',
      '/stayphotos/stay_photo00010.jpeg',
      '/stayphotos/stay_photo00013.jpeg',
      '/stayphotos/stay_photo00004.jpeg',
      '/stayphotos/stay_photo00001.jpeg'
    ],
    tagline: 'Private sit-out balcony overlooking lush green mountain canopy',
    description: 'Spacious deluxe room featuring a comfortable double bed, sliding glass balcony doors, and private terrace seating where you can sip hot Yercaud coffee amidst the morning mist.',
    facilities: [
      'Private Sit-out Balcony with Forest Canopy View',
      'King-Size Comfortable Double Bed',
      'Attached Bathroom with 24/7 Hot Water Geyser',
      'High-Speed Wi-Fi Connectivity',
      'Flat Screen LED TV',
      'Dedicated On-Site Parking'
    ],
    bestFor: 'Couples, honeymoons & small families wanting balcony views',
    popular: true
  },
  {
    id: 'large-family-multi-bed-room',
    name: 'Spacious Family Suite Room',
    category: 'Large Family Room',
    capacity: 'Accommodates up to 5 People',
    maxGuests: 5,
    startingPrice: 1999,
    priceNote: 'Starting from ₹1,999/day',
    isEnquiryOnly: false,
    primaryImage: '/stayphotos/stay_photo00015.jpeg',
    galleryImages: [
      '/stayphotos/stay_photo00015.jpeg',
      '/stayphotos/stay_photo00007.jpeg',
      '/stayphotos/stay_photo00011.jpeg',
      '/stayphotos/stay_photo00017.jpeg',
      '/stayphotos/stay_photo00019.jpeg',
      '/stayphotos/stay_photo00008.jpeg',
      '/stayphotos/stay_photo00001.jpeg'
    ],
    tagline: 'Ample space for everyone with multi-bedding setups for up to 5 guests',
    description: 'Designed specifically for families and friend circles who prefer staying together in one large room. Easily accommodates up to 5 people comfortably with dual beds, generous luggage room, wardrobe, and attached modern bathroom.',
    facilities: [
      'Accommodates Up to 5 Guests Comfortably',
      'Dual Bed Setup (Double Bed + Single / Extra Beds)',
      'Spacious Attached Bathroom with Constant Hot Water',
      'Seating Area, TV & Wardrobe',
      'Complimentary Secure Car Parking',
      'Care-taker & Meal Assistance on Request'
    ],
    bestFor: 'Families with kids or groups of 3 to 5 friends traveling together',
    popular: true
  },
  {
    id: 'cottage-style-stay',
    name: 'Scenic Hillside Cottage',
    category: 'Cottage',
    capacity: 'Accommodates Up to 25 People',
    maxGuests: 25,
    priceNote: 'Enquiry Alone',
    isEnquiryOnly: true,
    primaryImage: '/stayphotos/stay_photo00003.jpeg',
    galleryImages: [
      '/stayphotos/stay_photo00003.jpeg',
      '/stayphotos/stay_photo00018.jpeg',
      '/stayphotos/stay_photo00001.jpeg',
      '/stayphotos/stay_photo00014.jpeg',
      '/stayphotos/stay_photo00015.jpeg',
      '/stayphotos/stay_photo00007.jpeg',
      '/stayphotos/stay_photo00004.jpeg'
    ],
    tagline: 'Private mountain cottage with expansive terrace and campfire space for big groups',
    description: 'A charming cottage-style retreat nestled directly in Yercaud hills. Ideal for large family reunions, college reunions, or corporate teams looking for private group bonding, campfires, and total privacy. No fixed price — rates provided on enquiry alone based on headcount and dates.',
    facilities: [
      'Huge Group Capacity: Accommodates Up to 25 Guests',
      'Multiple Bedrooms with Attached Modern Bathrooms',
      'Private Terrace with 180° Valley Panoramas',
      'Outdoor Campfire / Bonfire Gathering Space',
      'Private Gated Compound & Ample Vehicle Parking',
      'Custom Home-Cooked Food Catering Available'
    ],
    bestFor: 'Large family functions, corporate teams & group reunions (Up to 25 pax)',
    popular: true
  },
  {
    id: 'house-style-villa-stay',
    name: 'Grand Private House / Homestay Villa',
    category: 'Private House / Homestay',
    capacity: 'Accommodates Up to 25 People',
    maxGuests: 25,
    priceNote: 'Enquiry Alone',
    isEnquiryOnly: true,
    primaryImage: '/stayphotos/stay_photo00018.jpeg',
    galleryImages: [
      '/stayphotos/stay_photo00018.jpeg',
      '/stayphotos/stay_photo00003.jpeg',
      '/stayphotos/stay_photo00001.jpeg',
      '/stayphotos/stay_photo00019.jpeg',
      '/stayphotos/stay_photo00015.jpeg',
      '/stayphotos/stay_photo00017.jpeg',
      '/stayphotos/stay_photo00008.jpeg'
    ],
    tagline: 'Independent private homestay villa with living hall, multiple rooms & valley views',
    description: 'An entire independent residential house with contemporary architecture, multiple air-cooled bedrooms, grand living hall, dining area, and dedicated caretaker. Experience Yercaud like your very own private luxury vacation home. Rates provided on enquiry alone.',
    facilities: [
      'Entire Private House: Fits Up to 25 People',
      'Grand Living Hall & Dining Room',
      'Multiple Modern Bathrooms with Hot Water',
      'Dedicated Caretaker On-Premises',
      'Secured Parking for Multiple Cars & Travellers',
      'Valley-Facing Open Roof Terrace'
    ],
    bestFor: 'Grand family celebrations, destination get-togethers & group road trips'
  }
];
