import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const MAILERSEND_API_TOKEN = Deno.env.get('MAILERSEND_API_TOKEN');
const CONTACT_RECIPIENT_EMAIL = Deno.env.get('CONTACT_RECIPIENT_EMAIL') || 'info@javamate.net';
const CONTACT_RECIPIENT_NAME = Deno.env.get('CONTACT_RECIPIENT_NAME') || 'Javamate Coffee Team';
const MAILERSEND_API_URL = 'https://api.mailersend.com/v1/email';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsletterSubscription {
  email: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!MAILERSEND_API_TOKEN) {
      console.error('MAILERSEND_API_TOKEN is not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const subscriptionData: NewsletterSubscription = await req.json();

    // Validate required fields
    if (!subscriptionData.email) {
      return new Response(
        JSON.stringify({ error: 'Email address is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscriptionData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create email content for notification
    const emailSubject = `New Newsletter Subscription`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Newsletter Subscription</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #B78B5E; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #7D5935; }
            .value { margin-top: 5px; }
            .highlight { background-color: white; padding: 15px; border-left: 4px solid #B78B5E; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Newsletter Subscription</h1>
              <p>Javamate Coffee Roasters</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Email Address:</div>
                <div class="highlight">${subscriptionData.email}</div>
              </div>
              
              <div class="field">
                <div class="label">Subscription Date:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
              
              <div class="field">
                <div class="label">Source:</div>
                <div class="value">Website Newsletter Form</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
New Newsletter Subscription - Javamate Coffee Roasters

Email Address: ${subscriptionData.email}
Subscription Date: ${new Date().toLocaleString()}
Source: Website Newsletter Form

Please add this email address to your newsletter mailing list.
    `;

    // Prepare MailerSend payload
    const mailersendPayload = {
      from: {
        email: "noreply@javamate.net",
        name: "Javamate Newsletter System"
      },
      to: [
        {
          email: CONTACT_RECIPIENT_EMAIL,
          name: CONTACT_RECIPIENT_NAME
        }
      ],
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      tags: ["newsletter", "subscription", "website"]
    };

    // Send email via MailerSend
    const response = await fetch(MAILERSEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILERSEND_API_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(mailersendPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MailerSend API error:', response.status, errorText);
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send notification email',
          details: response.status === 422 ? 'Invalid email data' : 'Email service error'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Safely parse JSON response with error handling
    let result;
    try {
      const responseText = await response.text();
      console.log('MailerSend raw response:', responseText);
      
      if (responseText.trim() === '') {
        // Empty response is considered success for MailerSend
        result = { message_id: 'success' };
      } else {
        result = JSON.parse(responseText);
      }
    } catch (parseError) {
      console.error('Failed to parse MailerSend response as JSON:', parseError);
      // If we can't parse the response but the HTTP status was OK, 
      // we'll assume the email was sent successfully
      result = { message_id: 'success_no_json' };
    }

    console.log('Newsletter subscription notification sent successfully:', result);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Newsletter subscription successful',
        messageId: result.message_id || 'unknown'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in newsletter-subscribe function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: 'An unexpected error occurred while processing the subscription'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});