import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ElasticService } from '../services/elastic.service';
// import { ELastic } from '../interfaces/elastic.interface'

@Component({
  selector: 'app-elastic',
  templateUrl: './elastic.component.html',
  styleUrls: ['./elastic.component.css']
})
export class ElasticComponent implements OnInit {

  private static readonly INDEX = 'clutch_provider';
  private static readonly TYPE = 'clutch_provider';

  elasticQueries: Object;
  queryalldocs = {
    'query': {
      'match_all': {}
    }
  };

  constructor(private elastic: ElasticService) { }

  ngOnInit() {
    this.elastic.getAllDocuments(ElasticComponent.INDEX, ElasticComponent.TYPE)
    .then(response => {
      this.elasticQueries = response.hits.hits;
    }, error => {
      console.error(error);
    }).then(() => {
      console.log('Show Customer Completed!');
    });
  }

  generateKeyValuePair(obj) {
    return Object.keys(obj).map((key)=>{ 
      if(!obj[key])
        return
      return `${key} : ${obj[key]]}`
    );
  }

}
