import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { generateSecret, generateURI } from 'otplib';
import fs from 'fs';
import path from 'path';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Provision Single Admin Account
  const email = 'admin@sathishannatravels.com';
  const rawPassword = 'adminpassword123';
  const passwordHash = await bcrypt.hash(rawPassword, 12);
  const twoFactorSecret = generateSecret();
  
  // Clean up any existing admin
  await prisma.admin.deleteMany({ where: { email } });

  const admin = await prisma.admin.create({
    data: {
      email,
      passwordHash,
      twoFactorSecret,
      twoFactorEnabled: true,
    },
  });

  const otpauthUrl = generateURI({ secret: twoFactorSecret, label: email, issuer: 'Sathish Anna Travels' });

  // Write admin credentials and 2FA details to a file for user visibility
  const infoDir = '/Users/ramaneekaanth/.gemini/antigravity-ide/brain/f71374bc-9c54-43c9-a4a2-cde2477fad96';
  const credentialsFile = path.join(infoDir, 'admin_credentials.txt');
  
  const credentialInfo = `
=============================================
ADMIN LOGIN CREDENTIALS (Manually Seeded)
=============================================
Email: ${email}
Password: ${rawPassword}

2FA Secret: ${twoFactorSecret}
2FA OTP Auth URL: ${otpauthUrl}

To setup your Google Authenticator/Authy app:
1. Enter the Secret key manually: ${twoFactorSecret}
2. Or use the OTP Auth URL: ${otpauthUrl}
=============================================
`;
  
  try {
    fs.mkdirSync(infoDir, { recursive: true });
    fs.writeFileSync(credentialsFile, credentialInfo.trim());
    console.log(`\nAdmin credentials and 2FA details written to:\n${credentialsFile}\n`);
  } catch (err) {
    console.error('Could not write admin credentials file', err);
  }

  // 2. Seed Tour Packages
  await prisma.package.deleteMany();

  const packagesData = [
    {
      title: 'Romantic Yercaud Getaway',
      slug: 'romantic-yercaud-getaway',
      destination: 'Yercaud, Tamil Nadu',
      duration: '3 Days / 2 Nights',
      category: 'Hill Station',
      description: 'Escape the heat of the plains and indulge in the serene and mist-covered hills of Yercaud. Perfect for couples and families looking for a peaceful weekend retreat.',
      inclusions: '2 Nights luxury accommodation;Daily buffet breakfast and dinner;Private AC sedan for local sightseeing;All parking, toll, and driver allowances;Welcome drink on arrival',
      exclusions: 'Train/Airfare to Salem/Yercaud;Lunch and personal expenses;Boating tickets and entrance fees to tourist spots;Any items not mentioned in inclusions',
      terms: 'Bookings must be confirmed 7 days in advance;50% advance payment required;Valid ID card is mandatory for check-in',
      refundPolicy: '100% refund for cancellations done 15 days before departure;50% refund for cancellations done 7-14 days before departure;No refund within 7 days',
      tripCode: 'SAT-YRC-03',
      minGroupSize: 2,
      price: 8499.00,
      active: true,
      itinerary: {
        create: [
          {
            dayNumber: 1,
            title: 'Arrival in Yercaud & Lake Cruise',
            description: 'Arrive at Yercaud. Check in to your premium hill resort. In the afternoon, enjoy a peaceful boating experience in the famous Yercaud Emerald Lake, followed by a walk through the beautiful Deer Park.',
          },
          {
            dayNumber: 2,
            title: 'Sightseeing & Panoramic Views',
            description: 'Visit the stunning Pagoda Point for breathtaking valley views, walk through the fragrant Rose Garden, and explore the ancient Shevaroy Temple. Experience the panoramic views from Lady\'s Seat and Kiliyur Waterfalls.',
          },
          {
            dayNumber: 3,
            title: 'Spice Plantation Tour & Departure',
            description: 'Take a guided walk through aromatic coffee and spice plantations. Purchase fresh local spices and oils. Depart in the afternoon with beautiful memories of the Emerald of the South.',
          },
        ],
      },
      pricingTiers: {
        create: [
          { label: 'Couple (2 Adults)', price: 16998.00 },
          { label: 'Group of 4+ (per person)', price: 7999.00 },
          { label: 'Solo Traveler Supplement', price: 11999.00 },
        ],
      },
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000',
            altText: 'Emerald Lake in Yercaud',
            isHero: true,
          },
          {
            url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1000',
            altText: 'Lush greenery and mountain mist',
            isHero: false,
          },
        ],
      },
    },
    {
      title: 'Majestic Kerala Houseboat & Hills Tour',
      slug: 'majestic-kerala-houseboat-hills',
      destination: 'Munnar & Alleppey, Kerala',
      duration: '5 Days / 4 Nights',
      category: 'South India',
      description: 'Experience the best of Kerala with a combination of misty tea gardens in Munnar and a tranquil luxury cruise on the backwaters of Alleppey.',
      inclusions: '3 Nights premium resort stay in Munnar;1 Night private luxury houseboat stay in Alleppey;All meals in Houseboat (Breakfast, Lunch, Dinner);AC private cab for entire tour;Spice plantation entry fee',
      exclusions: 'Entry tickets to Eravikulam National Park;Boating charges in Mattupetty Dam;Personal laundry and telephone calls;GST 5%',
      terms: 'AC in Houseboat operates from 9:00 PM to 6:00 AM unless premium plan booked;Driver hours from 8:00 AM to 7:00 PM',
      refundPolicy: 'Cancellations 30 days prior: Full refund;15-29 days prior: 70% refund;Less than 15 days: No refund',
      tripCode: 'SAT-KER-05',
      minGroupSize: 2,
      price: 14999.00,
      active: true,
      itinerary: {
        create: [
          {
            dayNumber: 1,
            title: 'Cochin Arrival & Transfer to Munnar',
            description: 'Arrive at Cochin. Direct transfer to Munnar. En route, enjoy the scenic Valara and Cheeyappara waterfalls. Check in to Munnar resort and enjoy a cool evening at leisure.',
          },
          {
            dayNumber: 2,
            title: 'Munnar Tea Gardens Exploration',
            description: 'Visit the Eravikulam National Park to witness the rare Nilgiri Tahr. Explore Mattupetty Dam, Echo Point, and take a stroll through the scenic Munnar town tea gardens.',
          },
          {
            dayNumber: 3,
            title: 'Munnar to Alleppey Houseboat Check-in',
            description: 'Drive to Alleppey. Board your traditional Kerala Kettuvallam (houseboat) at noon. Cruise along the palm-fringed backwaters, watching local village life. Overnight on the houseboat.',
          },
          {
            dayNumber: 4,
            title: 'Alleppey to Cochin Sightseeing',
            description: 'Disembark from the houseboat and transfer back to Cochin. Explore Fort Cochin, Chinese Fishing Nets, St. Francis Church, and Jewish Synagogue. Overnight in Cochin.',
          },
          {
            dayNumber: 5,
            title: 'Departure Day',
            description: 'Leisurely breakfast. Drop-off at Cochin Airport or Railway Station for your onward journey.',
          },
        ],
      },
      pricingTiers: {
        create: [
          { label: 'Double Sharing (per person)', price: 14999.00 },
          { label: 'Triple Sharing (per person)', price: 13499.00 },
        ],
      },
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1000',
            altText: 'Traditional Kerala Houseboat in Alleppey backwaters',
            isHero: true,
          },
          {
            url: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?q=80&w=1000',
            altText: 'Lush green tea gardens of Munnar',
            isHero: false,
          },
        ],
      },
    },
    {
      title: 'Golden Triangle Explorer',
      slug: 'golden-triangle-explorer',
      destination: 'Delhi, Agra & Jaipur',
      duration: '6 Days / 5 Nights',
      category: 'North India',
      description: 'Embark on a historical journey through India\'s royal capital cities. Witness the eternal beauty of the Taj Mahal, explore grand forts in Jaipur, and experience bustling Delhi.',
      inclusions: '5 Nights 4-star hotel accommodation;Daily breakfast;Private English-speaking tour guides;Sightseeing in AC private SUV;Elephant ride or Jeep ride at Amber Fort',
      exclusions: 'Monument entrance fees;Camera fees;Airfare/Trainfare;Any lunches and dinners;Tips and gratitude to guides/drivers',
      terms: 'Taj Mahal remains closed on Fridays;Monument tickets can be booked online in advance;Dress code applies to certain religious sites',
      refundPolicy: 'Cancellation before 30 days: 90% refund;15-30 days: 50% refund;Under 15 days: No refund',
      tripCode: 'SAT-GTE-06',
      minGroupSize: 1,
      price: 24999.00,
      active: true,
      itinerary: {
        create: [
          {
            dayNumber: 1,
            title: 'Welcome to Delhi',
            description: 'Arrive at Delhi. Meet our representative and transfer to your hotel. Afternoon tour of Old Delhi (Raj Ghat, Jama Masjid, drive past Red Fort).',
          },
          {
            dayNumber: 2,
            title: 'New Delhi Highlights & Drive to Agra',
            description: 'Explore Qutub Minar, Humayun\'s Tomb, India Gate, and President\'s House. In the afternoon, take the Yamuna Expressway to Agra, the city of Taj Mahal.',
          },
          {
            dayNumber: 3,
            title: 'The Taj Mahal & Agra Fort',
            description: 'Catch a glorious sunrise over the Taj Mahal. Return to hotel for breakfast. Later, explore Agra Fort and the exquisite Baby Taj (Itmad-ud-Daulah). Drive to Jaipur via Fatehpur Sikri.',
          },
          {
            dayNumber: 4,
            title: 'Jaipur Pink City Tour',
            description: 'Ascend to Amber Fort on elephant back/jeep. Visit the City Palace, Jantar Mantar Observatory, and snap photos of the unique Hawa Mahal (Palace of Winds).',
          },
          {
            dayNumber: 5,
            title: 'Jaipur Local Culture & Markets',
            description: 'Day at leisure to shop for local block prints, blue pottery, and jewelry. Optional tour to Chokhi Dhani for traditional Rajasthani dinner and dance performance.',
          },
          {
            dayNumber: 6,
            title: 'Return to Delhi & Departure',
            description: 'After breakfast, drive back to Delhi (approx. 5 hours) and transfer to Delhi International Airport for your departure flight.',
          },
        ],
      },
      pricingTiers: {
        create: [
          { label: 'Solo Explorer', price: 34999.00 },
          { label: 'Twin Sharing (per person)', price: 24999.00 },
          { label: 'Family of 4+ (per person)', price: 21999.00 },
        ],
      },
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000',
            altText: 'Taj Mahal in Agra',
            isHero: true,
          },
        ],
      },
    },
  ];

  for (const pkg of packagesData) {
    await prisma.package.create({
      data: pkg,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
