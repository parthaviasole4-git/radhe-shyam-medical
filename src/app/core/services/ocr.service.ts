import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface OcrResultItem {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class OcrService {

  private readonly base = `${environment.ocrSerice}/ocr`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Uploads PDF or Image file for OCR extraction
   * @param file PDF or image file
   */
  uploadPrescription(file: File): Observable<OcrResultItem[]> {
    const form = new FormData();
    form.append('file', file); // API must expect 'file'

    return this.http.post<OcrResultItem[]>(
      `${this.base}/prescription`,
      form
    );
  }
}
