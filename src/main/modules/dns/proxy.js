import dns from 'native-dns';

// Google public DNS
const authority = { address: '8.8.8.8', port: 53, type: 'udp' };

export const dnsProxy = (question, response, cb) => {
  const request = dns.Request({
    question, // forwarding the question
    server: authority, // this is the DNS server we are asking
    timeout: 1000,
  });

  // when we get answers, append them to the response
  request.on('message', (err, msg) => {
    msg.answer.forEach(a => response.answer.push(a));
  });

  request.on('end', cb);
  request.send();
};
