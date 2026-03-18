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
    const { name, email, selectedServices, message } = body;

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

    // Validate selected services
    if (!selectedServices || !Array.isArray(selectedServices) || selectedServices.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one service' },
        { status: 400 }
      );
    }

    // Send email to user
    const result = await emailService.sendCoCreateEmail({
      name,
      email,
      selectedServices,
      message
    });

    // Send admin notification
    try {
      await emailService.sendAdminNotification({
        type: 'co-create',
        userData: { name, email, selectedServices, message }
      });
    } catch (adminError) {
      console.error('Failed to send admin notification:', adminError);
      // Don't fail the main request if admin notification fails
    }

    return NextResponse.json({
      success: true,
      message: 'Engagement request sent successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error in engagement request API:', error);
    return NextResponse.json(
      { error: 'Failed to send request. Please try again later.' },
      { status: 500 }
    );
  }
}
