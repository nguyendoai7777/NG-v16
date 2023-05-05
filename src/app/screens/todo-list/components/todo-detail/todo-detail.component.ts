import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      todo-detail {{ar.snapshot.params?.['todo']}} works!
    </p>
  `,
  styles: [
  ]
})
export class TodoDetailComponent {
  ar = inject(ActivatedRoute);
  todo = '';


  ngOnInit(): void {
    this.todo = this.ar.snapshot.params?.['todo'];
  }
}
