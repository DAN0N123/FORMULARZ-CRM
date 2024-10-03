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

    return data.result;
  } catch (err) {
    throw new Error(err);
  }
}
