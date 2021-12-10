import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subject, Observable } from 'rxjs';
import { Films } from 'src/app/models/films.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private films: any;
  private dbPath = '/films';
  filmSubject = new Subject<any[]>();
  filmsRef: AngularFirestoreCollection<Films>;

  constructor(
    private db: AngularFirestore
  ) {
    this.filmsRef = db.collection(this.dbPath);
  }

  getAllFilms(): any {
    return this.filmsRef.snapshotChanges().pipe(
      map((changes:any) => {
        return changes.map((doc:any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()})
        })
      })
    );
  }

  /* private films = [
    {
      id: 1,
      title: 'American History X',
      onAir: false,
      filmAffiche: 'https://fr.shopping.rakuten.com/photo/1065757691.jpg'
    },
    {
      id: 2,
      title: 'Gran Torino',
      onAir: false,
      filmAffiche: 'https://images.affiches-et-posters.com//albums/3/2651/affiche-film-gran-torino-182.jpg'
    },
    {
      id: 3,
      title: 'La Haine',
      onAir: true,
      filmAffiche: 'https://fr.web.img6.acsta.net/pictures/20/07/07/11/03/4375808.jpg'
    },
    {
      id: 4,
      title: 'Le Parrain',
      onAir: false,
      filmAffiche: 'https://media.senscritique.com/media/000010565357/source_big/Le_Parrain.jpg'
    },
    {
      id: 5,
      title: 'Le Seigneur des anneaux : Le Retour du roi',
      onAir: true,
      filmAffiche: 'https://fr.web.img3.acsta.net/medias/nmedia/18/35/14/33/18366630.jpg'
    }
  ]; */

  setOnAir() {
    for (const film of this.films) {
      film.onAir = true;
    }
    this.emitFilmSubject();
  }

  setNoOnAir() {
    for (const film of this.films) {
      film.onAir = false;
    }
    this.emitFilmSubject();
  }

  switchOnAir(index: number) {
    this.films[index].onAir = !this.films[index].onAir;
    this.emitFilmSubject();
  }

  getFilmById(id: number) {
    let tmp;
    for (const film of this.films) {
      if (film.id == id) {
        tmp = film;
      }
    }
    return tmp;
  }

  emitFilmSubject() {
    this.filmSubject.next(this.films.slice());
  }
}