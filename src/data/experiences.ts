export interface YercaudExperience {
  id: string;
  title: string;
  category: 'Off-Road' | 'Private Estate' | 'Waterfalls' | 'Scenic Attraction';
  highlight: string;
  image: string;
  routeType: string;
  duration: string;
  startingPriceNote: string;
  estateChargeNote?: string;
  terrain: string;
  description: string;
  keyFeatures: string[];
  tips: string[];
}

export const EXPERIENCES_DATA: YercaudExperience[] = [
  {
    id: 'offroad-ridge-trail',
    title: 'Kavini Ridge Off-Road Expedition',
    category: 'Off-Road',
    highlight: 'Dedicated off-road track through rugged mountain terrain & cliffs',
    image: '/images/yercaud/offroad_4x4.jpg',
    routeType: 'Dedicated High-Elevation Trail (Separate Route)',
    duration: '2.5 to 3.5 Hours',
    startingPriceNote: 'Starting from ₹4,500 / vehicle',
    estateChargeNote: 'Each off-road adventure follows a dedicated private route for safety and uncompromised wilderness access.',
    terrain: 'Rocky incline, muddy patches, cliff ridges & dense pine cover',
    description: 'Experience pure adrenaline with our purpose-built 4x4 off-road trail. Navigated by seasoned mountain pilots, this separate route takes you through steep ascents, hairpin rocks, and remote cliff viewpoints far away from tourist congestion.',
    keyFeatures: [
      'Separate, dedicated off-road route with zero public traffic',
      'Accompanied by skilled off-road captain & recovery gear',
      'Panoramic 360-degree hill station valley views',
      'Photo & video stops at sheer cliff points',
      'Suitable for adventure seekers, couples & group outings'
    ],
    tips: [
      'Wear sturdy sneakers or trekking shoes',
      'Carry light warm jackets as ridge winds can be chilly',
      'Advance enquiry recommended for morning/sunset slots'
    ]
  },
  {
    id: 'private-estate-safari',
    title: 'Private Estate Plantation Trail',
    category: 'Private Estate',
    highlight: 'Misty drive through century-old private coffee & spice estates',
    image: '/images/yercaud/coffee_estate.jpg',
    routeType: 'Exclusive Private Estate Route (Separate Route)',
    duration: '2 to 3 Hours',
    startingPriceNote: 'Starting from ₹2,500 / trip',
    estateChargeNote: 'Attraction located on exclusive private estate. Certain private estate attractions may have approx. ₹1,000 additional estate permit fee.',
    terrain: 'Canopied gravel tracks, lush coffee plantations & spice gardens',
    description: 'Drive deep inside heritage private coffee and pepper plantations where regular tourists are not permitted. Immerse yourself in the scent of fresh cardamom and blooming coffee shrubs while soaking in misty highland views.',
    keyFeatures: [
      'Gated private estate access with tranquil ambience',
      'Scenic canopy paths shaded by silver oak and orange trees',
      'Authentic fresh estate coffee & spice aroma',
      'Spotting of local bird species and hill wildlife',
      'Special sunset viewing points on private grounds'
    ],
    tips: [
      'Estate permits are arranged directly by us upon booking',
      'Strictly eco-friendly route — no littering or disturbing flora',
      'Bring cameras for stunning nature photography'
    ]
  },
  {
    id: 'hidden-private-waterfalls',
    title: 'Secret Forest & Private Waterfalls Trail',
    category: 'Waterfalls',
    highlight: 'Pristine mountain stream & secluded waterfall inside private territory',
    image: '/images/yercaud/waterfalls.jpg',
    routeType: 'Forest Waterfall Trek & Drive (Separate Route)',
    duration: '3 to 4 Hours',
    startingPriceNote: 'Starting from ₹3,000 / trip',
    estateChargeNote: 'Located within private territory. Additional private estate entry of approx. ₹1,000 may apply per vehicle/group.',
    terrain: 'Mountain road + short forest walking path beside stream',
    description: 'A magical hidden gem tucked inside deep wooded hills. Leave behind the crowded public falls to enjoy pure, crystal-clear spring water cascading into natural rock pools in complete privacy and serenity.',
    keyFeatures: [
      'Crystal clean mountain water cascades away from crowds',
      'Relaxing stream-side sitting and shallow wading areas',
      'Serene forest acoustic — only songbirds and rushing water',
      'Guided trail walk with local route expert',
      'Ideal for family relaxation and peaceful rejuvenation'
    ],
    tips: [
      'Bring a towel and change of clothes if you wish to dip your feet',
      'Slip-resistant footwear is highly recommended',
      'Water levels vary by season — confirm current flow on WhatsApp'
    ]
  },
  {
    id: 'yercaud-scenic-explorer',
    title: 'Yercaud Classic Panoramic Tour',
    category: 'Scenic Attraction',
    highlight: 'Lady\'s Seat, Pagoda Point, Killiyur Falls & Emerald Lake',
    image: '/images/yercaud/emerald_lake.jpg',
    routeType: 'Complete Sightseeing Circuit',
    duration: 'Half Day or Full Day',
    startingPriceNote: 'Starting from ₹2,000 / day',
    estateChargeNote: 'Standard viewpoint access. Any optional boat ride or garden entry paid directly at ticket counters.',
    terrain: 'Smooth hill tarmac & paved viewpoint decks',
    description: 'The definitive sightseeing journey covering all iconic crown jewels of the "Jewel of the South". Enjoy telescope views over Salem city lights, misty lake strolls, and historic colonial vantage points.',
    keyFeatures: [
      'Lady’s Seat & Gent’s Seat evening city light viewpoint',
      'Pagoda Point for sunrise & rolling cloud vistas',
      'Emerald Yercaud Lake & landscaped Anna Park',
      'Botanical Gardens & National Orchidarium',
      'Flexible stops for local fruit markets & homemade chocolates'
    ],
    tips: [
      'Best visited from early morning till golden hour sunset',
      'Drivers know the least crowded visiting hours for each point',
      'Custom stops can easily be accommodated during the ride'
    ]
  }
];
