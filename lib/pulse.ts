// Sends a website enquiry to BT Pulse (the lead CRM) as a lead. Never throws: returns false, and logs why, if it
// did not work, so the form's email notification still goes out.
export async function sendToPulse(
  form: 'strategy-call' | 'contact',
  fields: Record<string, string | undefined>,
): Promise<boolean> {
  const url = process.env.PULSE_INTAKE_URL;
  const token = process.env.PULSE_INTAKE_TOKEN;
  if (!url || !token) {
    console.warn(`BT Pulse intake is not configured (PULSE_INTAKE_URL / PULSE_INTAKE_TOKEN); ${form} not recorded there`);
    return false;
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ form, ...fields }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error('BT Pulse intake error:', res.status, await res.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (err) {
    console.error('BT Pulse intake failed:', err);
    return false;
  }
}
