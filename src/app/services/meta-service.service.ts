import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {
  private metasCollection: AngularFirestoreCollection<Meta>;
  metas$: Observable<Meta[]>;

  constructor(private firestore: AngularFirestore) {
    this.metasCollection = this.firestore.collection<Meta>('metas');
    this.metas$ = this.metasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Meta;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Obtener todas las metas
  getMetas(): Observable<Meta[]> {
    return this.metas$;
  }

  // Agregar una nueva meta
  addMeta(meta: Meta): Promise<any> {
    return this.metasCollection.add({ meta: meta.meta });
  }

  // Eliminar una meta
  deleteMeta(id: string): Promise<void> {
    return this.metasCollection.doc(id).delete();
  }

  // Actualizar una meta (opcional)
  updateMeta(id: string, meta: Meta): Promise<void> {
    return this.metasCollection.doc(id).update({ meta: meta.meta });
  }
}
