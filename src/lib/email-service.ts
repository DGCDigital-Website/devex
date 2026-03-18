function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Email templates
const emailTemplates = {
  contactForm: {
    subject: 'Thank you for contacting Devex Global Consult',
    html: (data: any) => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Thank you for contacting Devex Global Consult</title>
        <style>
          .header__container {
            background: linear-gradient(135deg, #0B2D59 0%, #0C2C65 100%);
            border-radius: 24px 24px 0 0;
            box-shadow: 0 12px 40px rgba(11, 45, 89, 0.2);
            overflow: hidden;
          }
          .header__inner-container { padding: 48px 32px; }
          .header__title {
            color: white;
            font-size: 32px;
            font-weight: 800;
            padding: 20px 0 12px;
            text-align: center;
            letter-spacing: -0.5px;
            margin: 0;
          }
          .header__subtitle {
            color: rgba(255,255,255,0.95);
            font-size: 18px;
            line-height: 28px;
            text-align: center;
            font-weight: 400;
            margin: 0;
          }
          .body__details { padding: 40px; }
          .body__background {
            background-color: white;
            border-radius: 0 0 24px 24px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.05);
          }
          .highlight { color: #3D9DD9; font-weight: 700; }
          .company-info { color: #6B7280; }
          .cta-button {
            background: linear-gradient(135deg, #3D9DD9 0%, #177DA6 100%);
            color: white;
            padding: 18px 36px;
            text-decoration: none;
            border-radius: 32px;
            font-weight: 700;
            display: inline-block;
            box-shadow: 0 8px 24px rgba(61, 157, 217, 0.4);
            font-size: 16px;
            letter-spacing: 0.5px;
          }
          .info-card {
            background: linear-gradient(135deg, #f8f9fa 0%, #f1f5f9 100%);
            padding: 32px;
            border-radius: 20px;
            border-left: 6px solid #3D9DD9;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            margin: 32px 0;
          }
          .logo-container {
            background: rgba(255,255,255,0.15);
            padding: 24px;
            border-radius: 16px;
            margin-bottom: 24px;
            border: 1px solid rgba(255,255,255,0.25);
            display: inline-block;
          }
          .footer-dark {
            background: linear-gradient(135deg, #1C1C1C 0%, #2D2D2D 100%);
            border-radius: 24px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
          }
          .main-heading {
            color: #0B2D59;
            font-size: 28px;
            font-weight: 800;
            margin: 0 0 24px 0;
            letter-spacing: -0.5px;
            line-height: 1.2;
          }
          .section-heading {
            color: #0B2D59;
            font-size: 20px;
            font-weight: 700;
            margin: 0 0 16px 0;
          }
          .body-text {
            color: #374151;
            font-size: 16px;
            line-height: 1.7;
            margin: 0 0 20px 0;
          }
          .detail-row {
            padding: 12px 0;
            border-bottom: 1px solid rgba(61, 157, 217, 0.1);
          }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { color: #3D9DD9; font-weight: 600; margin-right: 12px; font-size: 14px; }
          .detail-value { color: #374151; font-weight: 500; font-size: 14px; }
          .greeting { color: #0B2D59; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: Arial, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8f9fa;">
          <thead>
            <tr><td align="center" style="padding: 48px 16px;">
              <table style="max-width: 600px" class="header__container" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td align="center" class="header__container">
                  <table style="max-width: 600px" class="header__inner-container" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="text-align: center;">
                        <div class="logo-container">
                          <img src="https://www.devexglobal.com/logo.svg" alt="DGC Logo" style="height: 44px; width: auto; margin: 0;">
                        </div>
                        <p style="color: white; margin: 12px 0 0 0; font-size: 16px; opacity: 0.9; font-weight: 500;">Powerful Insights | Proven Delivery</p>
                      </td>
                    </tr>
                    <tr><td class="header__title">✓ Message Received!</td></tr>
                    <tr><td class="header__subtitle">We'll get back to you within 24 hours</td></tr>
                  </table>
                </td></tr>
              </table>
            </td></tr>
          </thead>
          <tbody>
            <tr><td align="center" class="body">
              <table style="max-width:600px" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td class="body__details body__background">
                  <h2 class="main-heading">Thank you for reaching out!</h2>
                  <p class="greeting">Hi ${escapeHtml(data.name)},</p>
                  <p class="body-text">
                    Thank you for contacting Devex Global Consult! We're excited to assist you. Our team will review your message and provide expert guidance tailored to your organisation's needs.
                  </p>
                  <div class="info-card">
                    <h3 class="section-heading">📧 Message Details</h3>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr><td class="detail-row">
                        <span class="detail-label">👤 Name:</span>
                        <span class="detail-value">${escapeHtml(data.name)}</span>
                      </td></tr>
                      <tr><td class="detail-row">
                        <span class="detail-label">📧 Email:</span>
                        <span class="detail-value">${escapeHtml(data.email)}</span>
                      </td></tr>
                      <tr><td class="detail-row">
                        <span class="detail-label">🎯 Service:</span>
                        <span class="detail-value">${escapeHtml(data.service || 'General Enquiry')}</span>
                      </td></tr>
                      <tr><td class="detail-row">
                        <span class="detail-label">💬 Message:</span>
                        <span class="detail-value">${escapeHtml(data.message)}</span>
                      </td></tr>
                    </table>
                  </div>
                  <p class="body-text">
                    We'll review your requirements and get back to you within 24 hours. In the meantime, feel free to explore our services and expertise.
                  </p>
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="https://www.devexglobal.com/#services" class="cta-button">🌍 Explore Our Services</a>
                  </div>
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 32px; margin-top: 40px;">
                    <p style="color: #6B7280; font-size: 14px; line-height: 1.6; margin: 0; font-weight: 500;">
                      <strong>Best regards,</strong><br>
                      The DGC Team<br>
                      <a href="https://www.devexglobal.com" style="color: #3D9DD9; text-decoration: none; font-weight: 600;">🌐 www.devexglobal.com</a>
                    </p>
                  </div>
                </td></tr>
              </table>
            </td></tr>
          </tbody>
          <tfoot>
            <tr><td align="center" style="padding-top:48px;">
              <table style="max-width: 1200px;" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td align="center" class="footer-dark">
                  <table style="max-width: 600px; text-align:center; color:white" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr><td style="padding: 48px 16px 12px;font-size:20px; font-weight: 600;">❓ Got questions?</td></tr>
                    <tr><td style="padding: 0 32px 48px; line-height: 28px; font-size: 16px;">Please contact us at info@devexglobal.com or visit our website.</td></tr>
                  </table>
                </td></tr>
              </table>
            </td></tr>
            <tr><td class="company-info" style="padding: 16px 0;font-size:12px; text-align: center; font-weight: 500;">Devex Global Consult - Powerful Insights | Proven Delivery<br>The Mint Hub, Westlands, Nairobi, Kenya | info@devexglobal.com</td></tr>
          </tfoot>
        </table>
      </body>
      </html>
    `
  },

  coCreateForm: {
    subject: 'Thank you for your engagement request - Devex Global Consult',
    html: (data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: #0B2D59; padding: 30px; border-radius: 15px; margin-bottom: 20px;">
          <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 10px; margin-bottom: 15px; display: inline-block;">
            <img src="https://www.devexglobal.com/logo.svg" alt="DGC Logo" style="height: 40px; width: auto; margin: 0;">
          </div>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Powerful Insights | Proven Delivery</p>
        </div>

        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #0B2D59; margin: 0 0 20px 0; font-size: 24px;">Excited to work with you!</h2>

          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hi ${escapeHtml(data.name)},
          </p>

          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for your engagement request! We're looking forward to working with your organisation. Our team will review your requirements and get back to you within 24 hours with next steps.
          </p>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #3D9DD9;">
            <h3 style="color: #0B2D59; margin: 0 0 15px 0; font-size: 18px;">Your Engagement Details:</h3>
            <p style="color: #6B7280; margin: 5px 0; font-size: 14px;"><strong>Services Requested:</strong> ${data.selectedServices.map(escapeHtml).join(', ')}</p>
            <p style="color: #6B7280; margin: 5px 0; font-size: 14px;"><strong>Assignment Details:</strong> ${escapeHtml(data.message)}</p>
          </div>

          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            One of our senior consultants will be in touch to discuss the scope, methodology, and timeline for your assignment in detail.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://www.devexglobal.com/#services" style="background: linear-gradient(135deg, #3D9DD9 0%, #177DA6 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Our Services</a>
          </div>

          <p style="color: #6B7280; font-size: 14px; line-height: 1.6; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            Best regards,<br>
            The DGC Team<br>
            <a href="https://www.devexglobal.com" style="color: #3D9DD9;">www.devexglobal.com</a>
          </p>
        </div>
      </div>
    `
  },

  newsletterSubscription: {
    subject: 'Welcome to the Devex Global Consult Newsletter',
    html: (data: any) => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welcome to the DGC Newsletter</title>
        <style>
          .header__container {
            background: linear-gradient(135deg, #0B2D59 0%, #0C2C65 100%);
            border-radius: 24px 24px 0 0;
            box-shadow: 0 12px 40px rgba(11, 45, 89, 0.2);
            overflow: hidden;
          }
          .header__inner-container { padding: 48px 32px; }
          .header__title {
            color: white; font-size: 32px; font-weight: 800;
            padding: 20px 0 12px; text-align: center;
            letter-spacing: -0.5px; margin: 0;
          }
          .header__subtitle {
            color: rgba(255,255,255,0.95); font-size: 18px; line-height: 28px;
            text-align: center; font-weight: 400; margin: 0;
          }
          .body__details { padding: 40px; }
          .body__background {
            background-color: white; border-radius: 0 0 24px 24px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.05);
          }
          .cta-button {
            background: linear-gradient(135deg, #3D9DD9 0%, #177DA6 100%);
            color: white; padding: 18px 36px; text-decoration: none;
            border-radius: 32px; font-weight: 700; display: inline-block;
            box-shadow: 0 8px 24px rgba(61, 157, 217, 0.4);
            font-size: 16px; letter-spacing: 0.5px;
          }
          .info-card {
            background: linear-gradient(135deg, #f8f9fa 0%, #f1f5f9 100%);
            padding: 32px; border-radius: 20px;
            border-left: 6px solid #3D9DD9;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); margin: 32px 0;
          }
          .logo-container {
            background: rgba(255,255,255,0.15); padding: 24px; border-radius: 16px;
            margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.25); display: inline-block;
          }
          .footer-dark {
            background: linear-gradient(135deg, #1C1C1C 0%, #2D2D2D 100%);
            border-radius: 24px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
          }
          .feature-list { list-style: none; padding: 0; margin: 0; }
          .feature-list li {
            padding: 12px 0; color: #6B7280; font-size: 15px; line-height: 1.6;
            font-weight: 500; border-bottom: 1px solid rgba(61, 157, 217, 0.1);
          }
          .feature-list li:last-child { border-bottom: none; }
          .feature-list li:before { content: "🌍 "; color: #3D9DD9; margin-right: 12px; }
          .main-heading { color: #0B2D59; font-size: 28px; font-weight: 800; margin: 0 0 24px 0; }
          .body-text { color: #374151; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0; }
          .greeting { color: #0B2D59; font-size: 20px; font-weight: 700; margin: 0 0 20px 0; }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: Arial, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8f9fa;">
          <thead>
            <tr><td align="center" style="padding: 48px 16px;">
              <table style="max-width: 600px" class="header__container" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td align="center" class="header__container">
                  <table style="max-width: 600px" class="header__inner-container" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="text-align: center;">
                        <div class="logo-container">
                          <img src="https://www.devexglobal.com/logo.svg" alt="DGC Logo" style="height: 44px; width: auto; margin: 0;">
                        </div>
                        <p style="color: white; margin: 12px 0 0 0; font-size: 16px; opacity: 0.9; font-weight: 500;">Powerful Insights | Proven Delivery</p>
                      </td>
                    </tr>
                    <tr><td class="header__title">🎉 Welcome to DGC!</td></tr>
                    <tr><td class="header__subtitle">You're now part of our development community</td></tr>
                  </table>
                </td></tr>
              </table>
            </td></tr>
          </thead>
          <tbody>
            <tr><td align="center" class="body">
              <table style="max-width:600px" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td class="body__details body__background">
                  <h2 class="greeting">Hello ${escapeHtml(data.name || 'there')}! 👋</h2>
                  <p class="body-text">
                    Thank you for subscribing to the Devex Global Consult newsletter! You'll now receive our latest development sector insights, consultancy resources, and updates on our work across Africa.
                  </p>
                  <div class="info-card">
                    <h3 style="color: #0B2D59; font-size: 20px; font-weight: 700; margin: 0 0 20px 0;">📬 What you'll receive:</h3>
                    <ul class="feature-list">
                      <li>Development sector trends and analysis</li>
                      <li>Consultancy insights and case studies</li>
                      <li>MEL and capacity strengthening resources</li>
                      <li>Updates on DGC engagements and impact</li>
                      <li>Invitations to DGC events and webinars</li>
                    </ul>
                  </div>
                  <p class="body-text">
                    Stay tuned for our next newsletter with valuable resources to support your organisation's work. We're excited to share our expertise with you!
                  </p>
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="https://www.devexglobal.com/#services" class="cta-button">🌍 Explore Our Services</a>
                  </div>
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 32px; margin-top: 40px;">
                    <p style="color: #6B7280; font-size: 14px; line-height: 1.6; margin: 0; font-weight: 500;">
                      <strong>Best regards,</strong><br>
                      The DGC Team<br>
                      <a href="https://www.devexglobal.com" style="color: #3D9DD9; text-decoration: none; font-weight: 600;">🌐 www.devexglobal.com</a>
                    </p>
                  </div>
                </td></tr>
              </table>
            </td></tr>
          </tbody>
          <tfoot>
            <tr><td align="center" style="padding-top:48px;">
              <table style="max-width: 1200px;" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td align="center" class="footer-dark">
                  <table style="max-width: 600px; text-align:center; color:white" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr><td style="padding: 48px 16px 12px;font-size:20px; font-weight: 600;">❓ Got questions?</td></tr>
                    <tr><td style="padding: 0 32px 48px; line-height: 28px; font-size: 16px;">Contact us at info@devexglobal.com or visit our website.</td></tr>
                  </table>
                </td></tr>
              </table>
            </td></tr>
            <tr><td class="company-info" style="padding: 16px 0;font-size:12px; text-align: center; font-weight: 500; color: #6B7280;">Devex Global Consult - Powerful Insights | Proven Delivery<br>The Mint Hub, Westlands, Nairobi, Kenya | info@devexglobal.com</td></tr>
          </tfoot>
        </table>
      </body>
      </html>
    `
  }
};

// Email service using Brevo REST API
export class EmailService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api.brevo.com/v3';
  }

  private getApiKey(): string {
    const key = process.env.BREVO_API_KEY;
    if (!key) {
      throw new Error('BREVO_API_KEY environment variable is not set');
    }
    return key;
  }

  private async sendEmail(data: {
    to: Array<{ email: string; name?: string }>;
    subject: string;
    htmlContent: string;
    sender: { email: string; name: string };
  }) {
    try {
      const response = await fetch(`${this.baseUrl}/smtp/email`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': this.getApiKey()
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Brevo API error: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending email via Brevo API:', error);
      throw error;
    }
  }

  async sendContactFormEmail(data: {
    name: string;
    email: string;
    service?: string;
    message: string;
  }) {
    try {
      const result = await this.sendEmail({
        to: [{ email: data.email, name: data.name }],
        subject: emailTemplates.contactForm.subject,
        htmlContent: emailTemplates.contactForm.html(data),
        sender: { email: 'info@devexglobal.com', name: 'Devex Global Consult' }
      });

      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending contact form email:', error);
      throw error;
    }
  }

  async sendCoCreateEmail(data: {
    name: string;
    email: string;
    selectedServices: string[];
    message: string;
  }) {
    try {
      const result = await this.sendEmail({
        to: [{ email: data.email, name: data.name }],
        subject: emailTemplates.coCreateForm.subject,
        htmlContent: emailTemplates.coCreateForm.html(data),
        sender: { email: 'info@devexglobal.com', name: 'Devex Global Consult' }
      });

      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending engagement email:', error);
      throw error;
    }
  }

  async sendNewsletterSubscriptionEmail(data: {
    email: string;
    name?: string;
  }) {
    try {
      const result = await this.sendEmail({
        to: [{ email: data.email, name: data.name }],
        subject: emailTemplates.newsletterSubscription.subject,
        htmlContent: emailTemplates.newsletterSubscription.html(data),
        sender: { email: 'info@devexglobal.com', name: 'Devex Global Consult' }
      });

      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending newsletter subscription email:', error);
      throw error;
    }
  }

  async sendAdminNotification(data: {
    type: 'contact' | 'newsletter' | 'co-create';
    userData: any;
  }) {
    try {
      const adminEmail = 'info@devexglobal.com';
      const subject = `New ${data.type} submission - Devex Global Consult`;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: #0B2D59; padding: 30px; border-radius: 15px; margin-bottom: 20px;">
            <p style="color: white; margin: 0; font-size: 18px; font-weight: 600;">New ${data.type} submission received</p>
          </div>

          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #0B2D59; margin: 0 0 20px 0; font-size: 24px;">
              New ${data.type.charAt(0).toUpperCase() + data.type.slice(1)} Submission
            </h2>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #3D9DD9;">
              <h3 style="color: #0B2D59; margin: 0 0 15px 0; font-size: 18px;">Submission Details:</h3>
              <pre style="color: #6B7280; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(JSON.stringify(data.userData, null, 2))}</pre>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 20px;">
              Please review and respond to this submission within 24 hours.
            </p>

            <p style="color: #6B7280; font-size: 14px; line-height: 1.6; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
              Best regards,<br>
              The DGC System<br>
              <a href="https://www.devexglobal.com" style="color: #3D9DD9;">www.devexglobal.com</a>
            </p>
          </div>
        </div>
      `;

      const result = await this.sendEmail({
        to: [{ email: adminEmail, name: 'DGC Admin' }],
        subject,
        htmlContent,
        sender: { email: 'info@devexglobal.com', name: 'DGC System' }
      });

      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending admin notification:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
