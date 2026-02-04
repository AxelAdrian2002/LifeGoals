import { Component, OnInit } from '@angular/core';
import { MetaServiceService } from '../services/meta-service.service';
import { Meta } from '../models/meta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  metas: Meta[] = [];
  nuevaMeta: string = '';
  loading: boolean = false;

  constructor(private metaService: MetaServiceService) { }

  ngOnInit(): void {
    this.cargarMetas();
  }

  cargarMetas(): void {
    this.loading = true;
    this.metaService.getMetas().subscribe(
      (data) => {
        this.metas = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar metas:', error);
        this.loading = false;
      }
    );
  }

  agregarMeta(): void {
    if (this.nuevaMeta.trim() !== '') {
      const meta = new Meta(this.nuevaMeta);
      this.metaService.addMeta(meta).then(
        () => {
          console.log('Meta agregada exitosamente');
          this.nuevaMeta = '';
        },
        (error) => {
          console.error('Error al agregar meta:', error);
        }
      );
    }
  }

  eliminarMeta(id: string | undefined): void {
    if (id && confirm('¿Estás seguro de que deseas eliminar esta meta?')) {
      this.metaService.deleteMeta(id).then(
        () => {
          console.log('Meta eliminada exitosamente');
        },
        (error) => {
          console.error('Error al eliminar meta:', error);
        }
      );
    }
  }
}

