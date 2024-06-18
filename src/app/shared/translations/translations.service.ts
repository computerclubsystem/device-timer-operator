import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

import { TranslationKey } from './declarations';

@Injectable({ providedIn: 'root' })
export class TranslationsService {
  constructor(
    private readonly translocoSvc: TranslocoService,
  ) {
  }

  translate(key: TranslationKey): string {
    if (!key) {
      return '';
    }
    return this.translocoSvc.translate(key);
  }
}
