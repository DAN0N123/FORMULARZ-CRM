export default async function fetcher(ENDPOINT, method = 'GET', body = null) {
  const response = await fetch(ENDPOINT, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });
  const data = await response.json();

  if (!data.ok) throw data.message;

  if (data.result) {
    return data.result;
  } else {
    return data.message;
  }
}
