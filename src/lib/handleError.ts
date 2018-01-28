export function errorResponse(status: number, message: string, context: Object): {} {
  let response = {
      statusCode: status,
      body: JSON.stringify({ 'message': message }),
      headers: {
          'Content-Type': 'application/json',
      }
  }
  return response;
}