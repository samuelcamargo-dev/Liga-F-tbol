import { Injectable } from '@angular/core';
import { Team } from '../models/team';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private teams: Team[] = [];

  constructor() {}

  // Obtener todos los equipos
  getTeams() {
    return this.teams;
  }

  // Añadir un equipo nuevo
  addTeam(team: Team) {
    this.teams.push(team);
  }

  // Borrar un equipo por ID
  deleteTeam(id: number) {
    this.teams = this.teams.filter(t => t.id !== id);
  }

  // Sumar puntos
  addPoint(team: Team) {
    team.puntos++;
  }

  // Restar puntos
  removePoint(team: Team) {
    if (team.puntos > 0) {
      team.puntos--;
    }
  }
}
