import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../models/team';

@Pipe({
  name: 'orderByPoints',
  standalone: true
})
export class OrderByPointsPipe implements PipeTransform {

  transform(teams: Team[]): Team[] {
    return teams.slice().sort((a, b) => b.puntos - a.puntos);
  }
}
