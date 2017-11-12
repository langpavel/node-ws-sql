
export function createWsClient(url) {
  if (!url) {
    const location = window.location;
    const proto = location.protocol.replace('http', 'ws');
    const host = location.host;
    url = `${proto}//${host}/ws`;
  }
  const ws = new WebSocket(url);
  return ws;
}
