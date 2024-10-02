export default async function fetcher(ENDPOINT, method = 'GET') {
  const response = await fetch(ENDPOINT, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!data.ok) throw data;
  return data.result;
}
