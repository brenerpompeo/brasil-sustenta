import net from 'net';
const server = net.createServer();
server.listen(5000, '127.0.0.1', () => {
  console.log('Listening on port', server.address().port);
  server.close();
});
server.on('error', (err) => {
  console.error('Error listening:', err);
});
