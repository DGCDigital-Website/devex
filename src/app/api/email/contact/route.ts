import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email-service';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  if (!rateLimit(getClientIp(request))) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email to user
    const result = await emailService.sendContactFormEmail({
      name,
      email,
      service,
      message
    });

    // Send admin notification
    try {
      await emailService.sendAdminNotification({
        type: 'contact',
        userData: { name, email, service, message }
      });
    } catch (adminError) {
      console.error('Failed to send admin notification:', adminError);
      // Don't fail the main request if admin notification fails
    }

    // Add / update contact in Brevo (list 3 = website enquiries)
    await emailService.addBrevoContact({
      email,
      firstName: name,
      source: 'website-contact-form',
      listIds: [3],
    });

    // Persist to Supabase contacts table (fire-and-forget, non-blocking)
    try {
      const supabase = await createClient();
      await supabase.from('contacts').insert({
        full_name: name,
        email,
        company: '',
        username: email,
        contact: '',
        country: '',
        role: service ?? 'enquiry',
        status: 'pending',
      });
    } catch (dbError) {
      console.error('Failed to persist contact to Supabase:', dbError);
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error in contact form API:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
