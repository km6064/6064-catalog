export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  
  const body = await req.json();
  const email = body.email;
  const tags = body.tags || [];
  
  const res = await fetch('https://api.buttondown.com/v1/subscribers', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${process.env.BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email_address: email, tags: tags })
  });

  if (res.ok || res.status === 409) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
  
  const data = await res.json();
  return new Response(JSON.stringify({ success: false, error: data }), { status: 400 });
};