import { Component, effect, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, MatInputModule, NgFor, FormsModule],
  template: `

    <div class="d-flex">
      <div class="col-4">
        <div class="list">
          <form #f="ngForm">
            <mat-form-field appearance="outline" class="input">
              <mat-label>Add an action</mat-label>
              <input name="todoText" [(ngModel)]="todoText" [ngModelOptions]="{standalone: true}" matInput placeholder="add an action">
              <mat-icon matSuffix>add</mat-icon>
            </mat-form-field>
          </form>

          <ng-container *ngFor="let item of list()">
            <div class="item d-flex justify-content-between align-items-center">
              <span>{{item?.name}}</span>
              <button mat-mini-fab color="primary" aria-label="Example icon button with a delete icon">
                <mat-icon>delete</mat-icon>
              </button>
            </div>

            <mat-divider />
          </ng-container>


        </div>
      </div>
      <div class="divider"></div>
      <div class="col-8"></div>
    </div>
  `,
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todoText = '';
  list = signal(JSON.parse(localStorage.getItem('list')) || []);
  constructor() {
    effect(() => {
      console.log(`list changed: `, this.list());
    })
  }

  remove() {}

  add() {}
}
