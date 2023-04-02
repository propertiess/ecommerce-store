export function logger(request, response, next) {
    const _write = response.write;
    const _end = response.end;
  
    const chunks = [];
  
    response.write = (...args) => {
        chunks.push(Buffer.from(args[0]));
        _write.apply(response, args);
    };
  
    response.end = (...args) => {
        if (args[0]) {
            chunks.push(Buffer.from(args[0]));
        }
        const body = Buffer.concat(chunks).toString('utf8');
  
        console.log({
            time: new Date().toLocaleString(),
            fromIP: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
            method: request.method,
            originalUri: request.originalUrl,
            uri: request.url,
            requestData: request.body,
            responseStatus: response.statusCode,
            responseData: body,
            referer: request.headers.referer || '',
            ua: request.headers['user-agent']
        });
  
        _end.apply(response, args);
    };
  
    next();
}