import { Pipe, PipeTransform } from "@angular/core";



// ({{ endDate | dateDiff:startDate}}) days
@Pipe({ name: 'dateDiff'})
export class DateDiffPipe implements PipeTransform {
  transform(value: string,  startDate: string) {
    const startDateAsDate = new Date(startDate);
    const endDateAsDate = new Date(value);

    const diffInTime = endDateAsDate.getTime() - startDateAsDate.getTime();
    return (diffInTime / (1000 * 3600 * 24) ).toString()
  }

}


// function daysBetween(start: string, end: string): number {
//   const startDate = new Date(start);
//   const endDate = new Date(end);

//   const diffInTime = endDate.getTime() - startDate.getTime();
//   const differenceInDays = diffInTime / (1000 * 3600 * 24);
//   return differenceInDays;
// }
