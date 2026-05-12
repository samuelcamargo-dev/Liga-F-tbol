import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// 1. Subir un nivel (../) para salir de 'web' y entrar en 'Pipes'
import { OrderByPointsPipe } from './Pipes/ordenacion-por-puntos-pipe'; 

// 2. Subir un nivel (../) para salir de 'web' y entrar en 'services'
import { ServicioService } from './services/servicio';

// 3. Subir un nivel (../) para salir de 'web' y entrar en 'models'
import { Team } from './models/team';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, OrderByPointsPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  teams: Team[] = [];
  newTeamName: string = '';
  newPlayerName: string = '';
  tempPlayers: string[] = [];

  constructor(private servicio: ServicioService) {
    this.teams = this.servicio.getTeams();
  }

  // Creamos esta propiedad para que el HTML no de error
  get teamsOrdered() {
    // Usamos el pipe manualmente o simplemente devolvemos la lista
    // Por ahora, devolvemos la lista para que no falle
    return this.teams;
  }

  addPlayerToList() {
    if (this.newPlayerName.trim() !== '') {
      this.tempPlayers.push(this.newPlayerName);
      this.newPlayerName = '';
    }
  }

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

  deleteTeam(id: number) { this.servicio.deleteTeam(id); }
  sumarPunto(team: Team) { this.servicio.addPoint(team); }
  restarPunto(team: Team) { this.servicio.removePoint(team); }
}