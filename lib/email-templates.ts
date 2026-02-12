import { getConfig, type Program } from "@/lib/config";

function baseTemplate(content: string): string {
  const config = getConfig();
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:${config.theme.primaryColor};padding:24px;border-radius:8px 8px 0 0;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:24px;">${config.business.name}</h1>
    </div>
    <div style="background:#fff;padding:32px;border-radius:0 0 8px 8px;">
      ${content}
    </div>
    <div style="text-align:center;padding:16px;color:#6b7280;font-size:12px;">
      <p>${config.business.name} | ${config.business.location.address}, ${config.business.location.city}, ${config.business.location.state} ${config.business.location.zip}</p>
      <p>${config.business.phone} | ${config.business.email}</p>
    </div>
  </div>
</body>
</html>`;
}

// Sent to PARENT after they register their child
export function registrationConfirmationEmail(data: {
  parentName: string;
  childName: string;
  program: Program;
}): { subject: string; html: string } {
  const config = getConfig();
  return {
    subject: `Registration Confirmed — ${data.program.name} at ${config.business.name}`,
    html: baseTemplate(`
      <h2 style="color:${config.theme.primaryColor};margin-top:0;">Registration Received!</h2>
      <p>Hi ${data.parentName},</p>
      <p>Thank you for registering <strong>${data.childName}</strong> for <strong>${data.program.name}</strong>.</p>
      <div style="background:#f9fafb;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="margin:4px 0;"><strong>Program:</strong> ${data.program.name}</p>
        <p style="margin:4px 0;"><strong>Ages:</strong> ${data.program.ageRange}</p>
        <p style="margin:4px 0;"><strong>Schedule:</strong> ${data.program.schedule}</p>
        <p style="margin:4px 0;"><strong>Price:</strong> $${data.program.price} / ${data.program.priceUnit}</p>
      </div>
      <p>We'll be in touch shortly with more details. If you have any questions, contact us at <a href="mailto:${config.business.email}" style="color:${config.theme.primaryColor};">${config.business.email}</a> or call ${config.business.phone}.</p>
      <p>Best regards,<br>${config.business.owner}</p>
    `),
  };
}

// Sent to ADMIN when a new registration comes in
export function newRegistrationNotifyEmail(data: {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childDob: string;
  programName: string;
}): { subject: string; html: string } {
  return {
    subject: `New Registration: ${data.childName} for ${data.programName}`,
    html: baseTemplate(`
      <h2 style="color:#1B5E20;margin-top:0;">New Registration</h2>
      <div style="background:#f9fafb;border-radius:8px;padding:16px;">
        <p style="margin:4px 0;"><strong>Child:</strong> ${data.childName} (DOB: ${data.childDob})</p>
        <p style="margin:4px 0;"><strong>Parent:</strong> ${data.parentName}</p>
        <p style="margin:4px 0;"><strong>Email:</strong> ${data.parentEmail}</p>
        <p style="margin:4px 0;"><strong>Phone:</strong> ${data.parentPhone}</p>
        <p style="margin:4px 0;"><strong>Program:</strong> ${data.programName}</p>
      </div>
      <p style="margin-top:16px;"><a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/registrations" style="display:inline-block;background:#1B5E20;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">View in Admin</a></p>
    `),
  };
}

// Sent to VISITOR after they submit the contact form
export function contactConfirmationEmail(data: {
  name: string;
}): { subject: string; html: string } {
  const config = getConfig();
  return {
    subject: `We received your message — ${config.business.name}`,
    html: baseTemplate(`
      <h2 style="color:${config.theme.primaryColor};margin-top:0;">Thanks for reaching out!</h2>
      <p>Hi ${data.name},</p>
      <p>We've received your message and will get back to you as soon as possible, usually within 1-2 business days.</p>
      <p>In the meantime, feel free to give us a call at <strong>${config.business.phone}</strong> if you need immediate assistance.</p>
      <p>Best regards,<br>${config.business.owner}</p>
    `),
  };
}

// Sent to ADMIN when a new contact message comes in
export function newContactNotifyEmail(data: {
  name: string;
  email: string;
  phone: string | null;
  message: string;
}): { subject: string; html: string } {
  return {
    subject: `New Contact Message from ${data.name}`,
    html: baseTemplate(`
      <h2 style="color:#1B5E20;margin-top:0;">New Contact Message</h2>
      <div style="background:#f9fafb;border-radius:8px;padding:16px;">
        <p style="margin:4px 0;"><strong>From:</strong> ${data.name}</p>
        <p style="margin:4px 0;"><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p style="margin:4px 0;"><strong>Phone:</strong> ${data.phone}</p>` : ""}
        <p style="margin:8px 0 4px;"><strong>Message:</strong></p>
        <p style="margin:4px 0;white-space:pre-wrap;">${data.message}</p>
      </div>
      <p style="margin-top:16px;"><a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/messages" style="display:inline-block;background:#1B5E20;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">View in Admin</a></p>
    `),
  };
}
