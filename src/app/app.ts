import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Team } from './models/team';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule es para capturar lo que escribes
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // 1. Nuestra "Base de Datos" local
  teams: Team[] = [];

  // 2. Variables para el formulario (lo que escribe el usuario)
  newTeamName: string = '';
  newPlayerName: string = '';
  tempPlayers: string[] = []; // Jugadores que vas añadiendo antes de guardar el equipo

  // 3. Función: Añadir jugador a la lista temporal
  addPlayerToList() {
    if (this.newPlayerName.trim() !== '') {
      this.tempPlayers.push(this.newPlayerName);
      this.newPlayerName = ''; // Limpiar el cuadrito después de añadir
    }
  }

  // 4. Función: Guardar el equipo definitivo
  saveTeam() {
    if (this.newTeamName.trim() !== '' && this.tempPlayers.length > 0) {
      const newTeam: Team = {
        id: Date.now(), // Un truco para tener un ID único basado en el tiempo
        name: this.newTeamName,
        players: [...this.tempPlayers]
      };
      
      this.teams.push(newTeam);

      // Limpiamos todo para el siguiente equipo
      this.newTeamName = '';
      this.tempPlayers = [];
    }
  }

  // 5. Función: Borrar equipo (La "D" del CRUD)
  deleteTeam(id: number) {
    this.teams = this.teams.filter(t => t.id !== id);
  }
}