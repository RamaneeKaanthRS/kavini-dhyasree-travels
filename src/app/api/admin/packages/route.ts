import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const packages = await db.package.findMany({
      orderBy: { lastUpdated: 'desc' },
      include: {
        images: true,
        itinerary: true,
        pricingTiers: true
      }
    });
    return NextResponse.json(packages);
  } catch (err) {
    console.error('Error fetching packages:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      slug,
      destination,
      duration,
      category,
      description,
      inclusions,
      exclusions,
      terms,
      refundPolicy,
      tripCode,
      minGroupSize,
      price,
      active,
      images, // Array of { url, altText, isHero }
      itinerary, // Array of { dayNumber, title, description }
      pricingTiers, // Array of { label, price }
    } = body;

    // Basic Validation
    if (!title || !slug || !destination || !duration || !category || !tripCode || price === undefined) {
      return NextResponse.json({ error: 'Missing required package fields' }, { status: 400 });
    }

    // Create Package
    const newPackage = await db.package.create({
      data: {
        title,
        slug,
        destination,
        duration,
        category,
        description: description || '',
        inclusions: inclusions || '',
        exclusions: exclusions || '',
        terms: terms || '',
        refundPolicy: refundPolicy || '',
        tripCode,
        minGroupSize: parseInt(minGroupSize) || 1,
        price: parseFloat(price),
        active: active !== undefined ? active : true,
        images: {
          create: images && images.length > 0 ? images.map((img: any) => ({
            url: img.url,
            altText: img.altText || '',
            isHero: img.isHero || false,
            type: img.type || 'image',
          })) : []
        },
        itinerary: {
          create: itinerary && itinerary.length > 0 ? itinerary.map((day: any) => ({
            dayNumber: parseInt(day.dayNumber),
            title: day.title,
            description: day.description,
          })) : []
        },
        pricingTiers: {
          create: pricingTiers && pricingTiers.length > 0 ? pricingTiers.map((tier: any) => ({
            label: tier.label,
            price: parseFloat(tier.price),
          })) : []
        }
      }
    });

    // Write audit log
    await db.auditLog.create({
      data: {
        action: 'create_package',
        details: `Created new package "${title}" (Slug: ${slug}, Code: ${tripCode})`,
        adminEmail: session.email,
      },
    });

    return NextResponse.json(newPackage);
  } catch (err: any) {
    console.error('Error creating package:', err);
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'Slug or Trip Code already exists.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
