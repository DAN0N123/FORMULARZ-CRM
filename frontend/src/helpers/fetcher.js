export default async function fetcher(ENDPOINT, method = 'GET', body = null) {
  try {
    const response = await fetch(ENDPOINT, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });
    const data = await response.json();

    if (!data.ok) throw data;

    if (data.result) {
      return data.result;
    } else {
      if (data.message) return data.message;
    }
  } catch (err) {
    throw new Error(err);
  }
}
