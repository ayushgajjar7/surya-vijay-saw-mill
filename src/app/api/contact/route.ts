import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Basic validation
    if (!data.name || !data.phone || (!data.message && !data.woodType)) {
      return NextResponse.json(
        { success: false, errors: { general: "Missing required fields." } },
        { status: 400 }
      );
    }

    const {
      name, phone, email, message, 
      woodType, length, width, thickness, unit, quantity, purpose, deliveryLocation
    } = data;

    // We don't necessarily have to send an email if env vars are missing, 
    // but we can mock success or return error if required.
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL;

    if (!user || !pass || !receiver) {
      console.warn("Email configuration missing. Simulating success.");
      return NextResponse.json({ success: true, message: "Simulated success (no email config)" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const isQuote = !!woodType;
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #8B5E34; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">New ${isQuote ? 'Quote' : 'Contact'} Request</h2>
        </div>
        <div style="padding: 20px; background-color: #fcfcfc;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          
          ${isQuote ? `
            <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 20px;">Requirements</h3>
            <p><strong>Wood Type:</strong> ${woodType}</p>
            <p><strong>Dimensions:</strong> ${length || '-'} x ${width || '-'} x ${thickness || '-'} ${unit || ''}</p>
            <p><strong>Quantity:</strong> ${quantity || '-'}</p>
            <p><strong>Purpose:</strong> ${purpose || '-'}</p>
            <p><strong>Delivery Location:</strong> ${deliveryLocation || '-'}</p>
          ` : ''}

          <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 20px;">Message</h3>
          <p style="white-space: pre-wrap;">${message || 'No additional message provided.'}</p>
        </div>
        <div style="background-color: #f1f1f1; color: #666; text-align: center; padding: 10px; font-size: 12px;">
          Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Surya Vijay Saw Mill Website" <${user}>`,
      to: receiver,
      subject: `New ${isQuote ? 'Quote' : 'Contact'} Request from ${name}`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully." });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, errors: { general: "Internal server error." } },
      { status: 500 }
    );
  }
}
