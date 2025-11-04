import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css'
})
export class EditarProducto implements OnInit {
  productoForm!: FormGroup;
  productoId: string | null = null;



  ngOnInit(): void {

  }
}
