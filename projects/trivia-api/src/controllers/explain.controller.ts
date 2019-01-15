import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Explanation } from 'ngx-trivia-api';

import { GoogleApiService, GoogleExplainQueryParams } from '../services/google-api.service';

@Controller()
export class ExplainController {
  constructor(private readonly googleApi: GoogleApiService) {}

  @Get('explain')
  getExplanations(@Query() queryParams: Partial<GoogleExplainQueryParams & { q: string }>): Observable<Explanation[]> {
    // map `q` to `query`, as expected by google api  in this case
    const { q, ...remainingQueryParams } = queryParams;
    return this.googleApi.getExplanations({ query: q, ...remainingQueryParams });
  }
}
