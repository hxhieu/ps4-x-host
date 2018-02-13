import dns from 'native-dns';
import EventEmitter from 'events';
import { RequestHandler } from './request';

export default class DnsServer extends EventEmitter {
  constructor(entries) {
    super();
    this.server = dns.createServer();
    this.entries = entries;
  }

  getAddress() {
    return this.server.address().address;
  }

  start() {
    this.server.on(
      'listening',
      this.emit('start', {
        address: this.getAddress(),
      }),
    );

    this.server.on(
      'close',
      this.emit('stop', {
        address: this.getAddress(),
      }),
    );

    this.server.on(
      'error',
      this.emit('error', (err, buff, req, res) => {
        this.emit('error', {
          err,
          buff,
          req,
          res,
        });
      }),
    );

    this.server.on('socketError', (err, socket) => {
      this.emit('socketError', { err, socket });
    });

    const handler = new RequestHandler(this.entries, this.getAddress());
    handler.on('redirect', (question, target) => {
      this.emit('redirect', { question, target });
    });
    handler.on('forward', (question) => {
      this.emit('forward', { question });
    });
    handler.on('done', (req, res) => {
      this.emit('done', { req, res });
    });
    this.server.on('request', (req, res) => {
      handler.handle(req, res);
      this.emit('request', { req, res });
    });
    this.server.serve(8088);
  }
}
