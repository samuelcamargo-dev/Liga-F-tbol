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
  const index = this.teams.findIndex(t => t.id === id);
  if (index !== -1) {
    this.teams.splice(index, 1); // 👈 modifica el mismo array
  }
}
removePlayer(team: Team, player: string) {
  const index = team.players.indexOf(player);
  if (index !== -1) {
    team.players.splice(index, 1); // 👈 elimina SIN cambiar la referencia
  }
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
