import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';

@Injectable()
export class ElasticService {

  private client: Client;

  queryalldocs = {
    'query': {
      'match_all': {}
    }
  };
  
  constructor() {
    if (!this.client) {
      this.connect();
    }
  }
 
  private connect() {
    this.client = new Client({
      log: 'trace'
    });
  }

  getAllDocuments(_index, _type): any {
    return this.client.search({
      index: _index,
      type: _type,
      body: this.queryalldocs,
      filterPath: ['hits.hits._source']
    });
  }

}
