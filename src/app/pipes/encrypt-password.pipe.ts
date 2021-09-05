import { Pipe, PipeTransform } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Pipe({
  name: 'encryptPassword'
})
export class EncryptPasswordPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return CryptoJS.AES.encrypt(JSON.stringify(value), 'secret key 123').toString();
  }

}
