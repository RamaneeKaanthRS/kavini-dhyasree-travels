import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/adminAuth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, props: RouteParams) {
  const session = getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const params = await props.params;
  const { id } = params;

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
      images,
      itinerary,
      pricingTiers,
    } = body;

    // Basic Validation
    if (!title || !slug || !destination || !duration || !category || !tripCode || price === undefined) {
      return NextResponse.json({ error: 'Missing required package fields' }, { status: 400 });
    }

    // Run in a transaction to update package and replace related items
    const updatedPackage = await db.$transaction(async (tx) => {
      // 1. Delete existing relations
      await tx.media.deleteMany({ where: { packageId: id } });
      await tx.itineraryDay.deleteMany({ where: { packageId: id } });
      await tx.pricingTier.deleteMany({ where: { packageId: id } });

      // 2. Update package and recreate relations
      return await tx.package.update({
        where: { id },
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
        },
        include: {
          images: true,
          itinerary: true,
          pricingTiers: true
        }
      });
    });

    // Write audit log
    await db.auditLog.create({
      data: {
        action: 'update_package',
        details: `Updated package "${title}" (Slug: ${slug}, ID: ${id})`,
        adminEmail: session.email,
      },
    });

    return NextResponse.json(updatedPackage);
  } catch (err: any) {
    console.error('Error updating package:', err);
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'Slug or Trip Code already exists.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, props: RouteParams) {
  const session = getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const params = await props.params;
  const { id } = params;

  try {
    const deletedPkg = await db.package.delete({
      where: { id }
    });

    // Write audit log
    await db.auditLog.create({
      data: {
        action: 'delete_package',
        details: `Deleted package "${deletedPkg.title}" (Slug: ${deletedPkg.slug}, ID: ${id})`,
        adminEmail: session.email,
      },
    });

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error('Error deleting package:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
