export function someHandler(event, context, callback) {
    try {
        let eventText = JSON.stringify(event, null, 2);
        console.log("Received event:", eventText);

        callback(null, {
          statusCode: 200,
          body: eventText
      });
    } catch(e) {
        console.log.apply(console, e);
    }
    
}