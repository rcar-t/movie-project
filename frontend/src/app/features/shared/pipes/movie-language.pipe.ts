import { Pipe, PipeTransform } from '@angular/core';
import { Language } from 'src/app/core/models/util';
// import languageCodes from 'src/app/assets/language-formats.json';
import { HttpClient } from '@angular/common/http';

@Pipe({ name: 'formatLanguage' })
export class FormatLanguagePipe implements PipeTransform {
    transform(value: string): string {
        return value==="en"?"English":"value";
    }
}