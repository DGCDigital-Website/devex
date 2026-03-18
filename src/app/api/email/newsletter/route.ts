import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email-service';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  if (!rateLimit(getClientIp(request))) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Send welcome email to subscriber
    const result = await emailService.sendNewsletterSubscriptionEmail({
      email,
      name: name || undefined
    });

    // Add / update contact in Brevo (list 2 = newsletter subscribers)
    await emailService.addBrevoContact({
      email,
      firstName: name || undefined,
      source: 'website-newsletter',
      listIds: [2],
    });

    // Send admin notification
    try {
      await emailService.sendAdminNotification({
        type: 'newsletter',
        userData: { email, name: name || 'Not provided' }
      });
    } catch (adminError) {
      console.error('Failed to send admin notification:', adminError);
    }

    return NextResponse.json({
      success: true,
      message: 'Newsletter subscription email sent successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error in newsletter subscription API:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
