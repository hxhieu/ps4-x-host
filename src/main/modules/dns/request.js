import async from 'async';
import dns from 'native-dns';
import { EventEmitter } from 'events';

import { dnsProxy } from './proxy';

export default class RequestHandler extends EventEmitter {
  constructor(entries, host) {
    super();
    this.entries = entries || [
      {
        domain: 'playstation.net',
        records: [{ type: 'A', address: host, ttl: 1800 }],
      },
    ];
  }

  handle(req, res) {
    const f = []; // array of functions

    // proxy all questions
    // since proxying is asynchronous, store all callbacks
    req.question.forEach((question) => {
      const entry = this.entries.filter(r => new RegExp(r.domain, 'i').exec(question.name));
      if (entry.length) {
        entry[0].records.forEach((record) => {
          const altRecord = record;
          altRecord.name = question.name;
          altRecord.ttl = record.ttl || 1800;

          this.emit('redirect', { question, altRecord });

          res.answer.push(dns[altRecord.type](altRecord));
        });
      } else {
        f.push(cb => dnsProxy(question, res, cb));
        this.emit('forward', { question });
      }
    });

    // do the proxying in parallel
    // when done, respond to the request by sending the response
    async.parallel(f, () => {
      this.emit('done', { req, res });
      res.send();
    });
  }
}
