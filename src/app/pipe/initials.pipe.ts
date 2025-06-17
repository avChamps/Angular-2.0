import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(fullName: string | null | undefined): string {
    if (!fullName) return '';

    const names = fullName.trim().split(' ').filter(n => n);
    const initials = names.slice(0, 2).map(name => name.charAt(0).toUpperCase());

    return initials.join('');
  }
}
