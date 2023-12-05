import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinalSuffix'
})
export class OrdinalSuffixPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) {
      return value.toString();
    }

    const suffixes: Record<number, string> = {
      1: 'st',
      2: 'nd',
      3: 'rd'
    };

    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;

    const suffix = suffixes[lastDigit] || 'th';

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      // For numbers like 11, 12, 13 - they use 'th'
      return value + 'th';
    }

    return value + suffix;
  }
}
