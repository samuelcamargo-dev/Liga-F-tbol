import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { OrderByPointsPipe } from '../Pipes/ordenacion-por-puntos-pipe'; 

import { ServicioService } from '../services/servicio';
import { Team } from '../models/team';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, OrderByPointsPipe],
  templateUrl: '../app.html',
  styleUrl: '../app.css'
})
export class AppComponent {

  // LOGIN
  isLogged: boolean = false;
  loginForm: any;

  // Equipos
  teams: Team[] = [];

  // Formulario de equipos
  newTeamName: string = '';
  newPlayerName: string = '';
  tempPlayers: string[] = [];

  // Buscador
  searchPlayer: string = '';

  constructor(private servicio: ServicioService, private fb: FormBuilder) {

    // Cargar equipos
    this.teams = this.servicio.getTeams();

    // Crear formulario de login
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // LOGIN
  login() {
    if (this.loginForm.valid) {
      this.isLogged = true;
    }
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

  // Eliminar jugador
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

  // Ordenar equipos
  get teamsOrdered() {
    return this.teams.slice().sort((a, b) => b.puntos - a.puntos);
  }

  // Buscador de jugadores
  get filteredPlayers() {
    if (!this.searchPlayer.trim()) return [];

    const term = this.searchPlayer.toLowerCase();
    const results: { player: string; team: string }[] = [];

    for (const team of this.teams) {
      for (const player of team.players) {
        if (player.toLowerCase().includes(term)) {
          results.push({ player, team: team.name });
        }
      }
    }

    return results;
  }
}
