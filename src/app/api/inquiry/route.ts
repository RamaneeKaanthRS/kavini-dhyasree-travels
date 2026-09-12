import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

import nodemailer from 'nodemailer';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required (min 2 characters)'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  message: z.string().min(10, 'Message is required (min 10 characters)'),
  packageId: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ error: 'Validation failed', fields: errors }, { status: 400 });
    }

    const { name, email, phone, message, packageId } = parsed.data;

    if (packageId) {
      const pkg = await db.package.findUnique({ where: { id: packageId } });
      if (!pkg) {
        return NextResponse.json({ error: 'Package not found' }, { status: 400 });
      }
    }

    const inquiry = await db.inquiry.create({
      data: {
        name,
        email,
        phone,
        message,
        packageId,
      },
    });

    console.log(`\n[NEW INQUIRY RECEIVED]\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\nPackage ID: ${packageId || 'None'}\n`);

    // Send Email to Owner
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: 'dhya6925@gmail.com', // Owner's email
        subject: `New Inquiry from ${name} - Kavini Dhyasree`,
        text: `You have received a new inquiry.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPackage ID: ${packageId || 'None'}\n\nMessage:\n${message}`,
        html: `<p><strong>You have received a new inquiry.</strong></p>
               <ul>
                 <li><strong>Name:</strong> ${name}</li>
                 <li><strong>Email:</strong> ${email}</li>
                 <li><strong>Phone:</strong> ${phone}</li>
                 <li><strong>Package ID:</strong> ${packageId || 'None'}</li>
               </ul>
               <p><strong>Message:</strong></p>
               <p>${message}</p>`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('Inquiry email sent successfully to dhya6925@gmail.com');
      } catch (emailError) {
        console.error('Failed to send inquiry email:', emailError);
      }
    } else {
      console.warn('SMTP_USER and/or SMTP_PASS are not set in .env. Email notification was skipped.');
    }

    return NextResponse.json({ success: true, inquiryId: inquiry.id });
  } catch (err) {
    console.error('Inquiry submission error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
