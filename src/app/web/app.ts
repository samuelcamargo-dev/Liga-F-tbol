import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderByPointsPipe } from '../Pipes/ordenacion-por-puntos-pipe'; 


// IMPORTACIÓN CORRECTA DEL SERVICIO
import { ServicioService } from '../services/servicio';

// IMPORTACIÓN CORRECTA DEL MODELO
import { Team } from '../models/team';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule,OrderByPointsPipe],
  templateUrl: '../app.html',
  styleUrl: '../app.css'
})
export class AppComponent {

  // Equipos obtenidos desde el servicio
  teams: Team[] = [];

  // Variables del formulario
  newTeamName: string = '';
  newPlayerName: string = '';
  tempPlayers: string[] = [];

  constructor(private servicio: ServicioService) {
    // Cargar equipos desde el servicio
    this.teams = this.servicio.getTeams();
  }

  // Añadir jugador temporal
  addPlayerToList() {
    if (this.newPlayerName.trim() !== '') {
      this.tempPlayers.push(this.newPlayerName);
      this.newPlayerName = '';
    }
  }

  // Guardar equipo
  saveTeam() {
    if (this.newTeamName.trim() !== '' && this.tempPlayers.length > 0) {

      const newTeam: Team = {
        id: Date.now(),
        name: this.newTeamName,
        players: [...this.tempPlayers],
        puntos: 0
      };

      this.servicio.addTeam(newTeam);

      this.newTeamName = '';
      this.tempPlayers = [];
    }
  }
  removePlayer(team: Team, player: string) {
  this.servicio.removePlayer(team, player);
}


  // Borrar equipo
  deleteTeam(id: number) {
    this.servicio.deleteTeam(id);
  }

  // Sumar punto
  sumarPunto(team: Team) {
    this.servicio.addPoint(team);
  }

  // Restar punto
  restarPunto(team: Team) {
    this.servicio.removePoint(team);
  }
}
