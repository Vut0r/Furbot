const { yeQuoteCommand } = require('../Commands/yeQuote/yeQuote');
const { redesCommand } = require('../Commands/redes/redes');
const { clipCommand } = require('../Commands/Clip/clip');

const commandList = {
    ye: yeQuoteCommand,
    redes: redesCommand,
    clip: clipCommand,
};

module.exports = {
    commandList: commandList,
};