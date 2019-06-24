import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hckernews';
  public news: []
  public loaded: Boolean = false
  constructor(apollo: Apollo) {
    apollo
      .query({
        query: gql`
          {
            hn {
              topStories(limit: 30, offset: 0) {
                id,
                by {
                  id
                },
                timeISO, 
                url,
                title,
                score,
                descendants
              }
            }
          }
        `,
      })
      .subscribe(
        res => {
        this.loaded = true
        this.news = res.data.hn.topStories
      }, 
        err => {
        console.log({...err})
      }
    )
  }

  trim(url) {
    let s = url.split('//')
    let t = s[1].split('/')
    return t[0].includes('www') ? t[0].split('.')[1]+'.'+t[0].split('.')[2] : t[0]
  }
}
