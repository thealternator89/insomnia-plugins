module.exports.templateTags = [{
    name: 'randomItem',
    displayName: 'Random Item',
    description: 'Pick a random value from a list',
    args: [
        {
            displayName: 'Options',
            description: 'The set of values to pick from',
            type: 'string',
            defaultValue: ''
        }, 
        {
            displayName: 'Separator Character',
            description: 'The character to use as a separator in Options above',
            type: 'string',
            defaultValue: ',',
            placeholder: ','
        }
    ],
    run (_context, options, separator) {
        if (separator?.length === 0) {
            separator = ',';
        } else if (separator.length > 1) {
            throw new Error('Separator must be a single character');
        }

        const optionsList = options.split(separator);

        return optionsList[Math.trunc(Math.random() * optionsList.length)];
    }
}];