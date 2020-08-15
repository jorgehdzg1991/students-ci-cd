// eslint-disable-next-line import/prefer-default-export
export function sendResponse(res, status, data, contentType) {
  res.writeHead(status, {
    'Content-Type': contentType || 'application/json'
  });
  res.end(JSON.stringify(data));
}
