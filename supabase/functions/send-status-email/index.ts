import "@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { studentEmail, studentName, document, status, remarks } = await req
    .json();

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": Deno.env.get("BREVO_API_KEY")!,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Villagers Montessori College",
        email: "eustaquio.galano@gmail.com", // Your verified sender
      },

      to: [
        {
          email: studentEmail,
          name: studentName,
        },
      ],

      subject: `Document Request Update — ${document}`,

      htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">Document Request Update</h2>

        <p>Hi <strong>${studentName}</strong>,</p>

        <p>Your request for <strong>${document}</strong> has been updated to:</p>

        <p style="font-size:18px;color:#2563eb;">
          <strong>${status}</strong>
        </p>

${
        status === "Ready for Pickup"
          ? `
  <hr>
  <div style="background:#fffbeb;border:1px solid #f59e0b;border-radius:6px;padding:12px 16px;margin-top:16px;">
    <p style="color:#92400e;font-size:14px;margin:0 0 8px 0;">
      <strong>📋 Pickup Information</strong>
    </p>
    <p style="color:#92400e;font-size:13px;margin:0;">
      Your document is now ready for pickup at the Registrar's Office. 
      If you wish to authorize someone to claim the document on your behalf, 
      please provide them with a signed <strong>Authorization Letter</strong> 
      along with a valid ID of both parties upon claiming.
    </p>
  </div>
  `
          : ""
      }

  ${
        remarks && remarks.length > 0
          ? `
    <hr>
    <h3 style="color:#1a1a1a;">Remarks:</h3>
    <ul>
      ${remarks.map((r: string) => `<li>${r}</li>`).join("")}
    </ul>
    `
          : ""
      } 

        <hr>

        <p>
          Click the button below to view your request details.
        </p>

        <a
          href="https://calendar-vmc.pages.dev/"
          style="
            display:inline-block;
            background:#2563eb;
            color:white;
            padding:10px 20px;
            border-radius:6px;
            text-decoration:none;
          "
        >
          View Request
        </a>

        <p
          style="
            color:#6b7280;
            font-size:12px;
            margin-top:24px;
          "
        >
          Villagers Montessori College
          <br>
          Document Request System
        </p>
      </div>
      `,
    }),
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
});
