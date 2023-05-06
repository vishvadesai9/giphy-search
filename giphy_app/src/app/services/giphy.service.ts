import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GiphyService {
  // Private properties to store the API key and base URL for the Giphy API
  private readonly API_KEY = 'hs511QidY1GRLVXHzUwFQsgBCOdfPufH';
  private readonly BASE_URL = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  // Method to search for gifs using the Giphy API
  searchGifs(query: string, offset: number) {
    // Construct the URL for the API request using the query and offset parameters
    const url = `${this.BASE_URL}/search?api_key=${this.API_KEY}&q=${query}&limit=10&offset=${offset}`;

    // Make a GET request to the Giphy API and return an Observable of the response data
    return this.http.get(url).pipe(
      map((response: any) => response.data)
    );
  }
}
