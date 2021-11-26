import { Component, OnInit, Input } from '@angular/core';
import { FilmService } from '../services/film/film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  @Input() index!: number;
  @Input() id!: number;
  @Input() filmName!: string;
  @Input() filmOnAir!: boolean;
  @Input() filmAffiche!: string;

  constructor(private Film: FilmService) { }

  ngOnInit(): void {
  }

  getOnAir(){
    return this.filmOnAir;
  }

  onWatchFilm() {
    console.log('Lecture du film démarré !');
  }

  changeColor() {
    return this.filmOnAir ? 'green' : 'red';
  }

  onSwitch() {
    this.Film.switchOnAir(this.index);
  }

}
