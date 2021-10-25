const reqEvent = event => require(`../events/${event}`);//Spy Code
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));//Spy Code
  client.on('message', reqEvent('message'));//Spy Code
};
