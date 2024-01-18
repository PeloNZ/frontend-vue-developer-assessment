// http wrapper
// using a wrapper we can easily swap out the request library, eg axios
// I'd typically use axios but decided to use fetch for a change.
// This is also a good opportunity to use TypeScript which I haven't used a lot.

// todo move to env config along with security key
const apiUrl = 'http://localhost:7000/api/todoItems/'

export async function get<T>(uri: string, config?: RequestInit): Promise<T> {
  const init = {
    method: 'GET',
    ...config
  }

  return await dispatchRequest<T>(uri, init)
}

export async function post<T, U>(
  uri: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = {
    method: 'POST',
    body: JSON.stringify(body),
    ...config
  }

  return await dispatchRequest<U>(uri, init)
}

export async function put<T, U>(
  uri: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = {
    method: 'PUT',
    body: JSON.stringify(body),
    ...config
  }

  return await dispatchRequest<U>(uri, init)
}

export async function destroy<T>(uri: string, config?: RequestInit): Promise<T> {
  const init = {
    method: 'DELETE',
    ...config
  }

  return await dispatchRequest<T>(uri, init)
}

async function dispatchRequest<T>(uri: string, config: RequestInit): Promise<T> {
  // always send body as json
  config.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  const request = new Request(apiUrl + uri, config)
  const response = await fetch(request)
  const json = await response.json()

  return response.ok ? json : Promise.reject(json)
}
