import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <h1>{{ count() }}</h1>
    <button mat-raised-button color="accent" (click)="inc()">increment</button>
    <button mat-raised-button color="primary" (click)="dec()">decrement</button>
    <h3>{{index()}}</h3>
  `,
  styles: []
})
export class SignalsComponent {
  count = signal(0);
  index = computed(() => `Order: ${this.count()}`);

  constructor() {
    effect(() => {
      console.log(`count: `, this.count());
      console.log(`index: `, this.index());
    });
  }

  inc() {
    this.count.update((o) => o + 1);
  }

  dec() {
    this.count.update((o) => o - 1);
  }
}
