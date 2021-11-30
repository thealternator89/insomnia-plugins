module.exports.templateTags = [{
    name: 'substring',
    displayName: 'Substring',
    description: 'Take a substring of an input value',
    args: [
        {
            displayName: 'Input Value',
            description: 'The value to take a substring of',
            type: 'string',
            defaultValue: ''
        }, 
        {
            displayName: 'Start',
            description: 'The position of the start character',
            type: 'number',
            defaultValue: 0
        },
        {
            displayName: 'End',
            description: 'The position of the end character',
            type: 'number',
            defaultValue: 0
        }
    ],
    run (context, input, start, end) {
        // If end is <= 0, take the rest of the string
        end = end <= 0 ? input.length : end;

        return input.substr(start, end);
    }
}];