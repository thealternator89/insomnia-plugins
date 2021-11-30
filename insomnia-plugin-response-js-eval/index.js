module.exports.templateTags = [{
    name: 'responseJsEval',
    displayName: 'JS Eval Response Body',
    description: 'Process a response body with JavaScript',
    args: [
        {
            displayName: 'Request',
            type: 'model',
            model: 'Request',
        },
        {
            displayName: 'JS to eval response body',
            help: 'Use "$" to access the root of the body',
            type: 'string',
            encoding: 'base64'
        }
    ],
    async run (context, requestId, evalStatement) {
        const environmentId = context.context.getEnvironmentId();
        let response = await context.util.models.response.getLatestForRequestId(requestId, environmentId);

        if (!response) {
            console.log('[response tag] No response found');
            throw new Error('No responses for request');
        }

        if (!response.statusCode) {
            console.log('[response tag] Invalid status code ' + response.statusCode);
            throw new Error('No successful responses for request');
        }

        const bodyBuffer = context.util.models.response.getBodyBuffer(response, '');
        const match = response.contentType && response.contentType.match(/charset=([\w-]+)/);
        const charset = match && match.length >= 2 ? match[1] : 'utf-8';

        let body;
        try {
            body = iconv.decode(bodyBuffer, charset);
        } catch (err) {
            body = bodyBuffer.toString();
            console.warn('[response] Failed to decode body', err);
        }

        try {
            body = JSON.parse(body);
        } catch (err) {
            console.warn('[response] Failed to JSON parse body. Processing as a string', err);
        }

        const $ = body;

        const random = (property) => eval(`${property}[Math.trunc(Math.random() * ${property}.length)]`);
        const last = (property) => eval(`${property}[${property}.length - 1]`);

        const evalResult = eval(evalStatement);

        return (typeof evalResult === 'string' ? evalResult : JSON.stringify(evalResult)) ?? '';
    }
}];