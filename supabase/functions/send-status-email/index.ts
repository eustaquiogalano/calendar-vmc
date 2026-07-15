import "@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // handle preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { studentEmail, studentName, document, status } = await req.json();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "VMC School <onboarding@resend.dev>",
      to: studentEmail,
      subject: `Document Request Update — ${document}`,
      html: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #1a1a1a;">Document Request Update</h2>
    <p>Hi <strong>${studentName}</strong>,</p>
    <p>Your request for <strong>${document}</strong> has been updated to:</p>
    <p style="font-size: 18px; color: #2563eb;"><strong>${status}</strong></p>
    <hr />
    <p>Click the button below to view your request details:</p>
    <a 
      href="https://calendar-vmc.pages.dev/"
      style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;"
    >
      View Request
    </a>
    <p style="color: #6b7280; font-size: 12px; margin-top: 24px;">VMC School — Document Request System</p>
  </div>
      `,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
