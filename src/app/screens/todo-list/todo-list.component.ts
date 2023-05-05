import { Component, effect, inject, signal } from '@angular/core';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { checkExisted } from '../../common/validations/custom.validation';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, MatInputModule, FormsModule, NgIf, NgFor, RouterOutlet, ReactiveFormsModule],
  template: `
    <div class="d-flex">
      <div class="col-4">
        <div class="list">
          <form>
            <mat-form-field appearance="outline" class="input" (keyup.enter)="add()">
              <mat-label>Add an action</mat-label>
              <input name="todoText" [formControl]="todoInput" (input)="onInputChange($event)" [value]="todoText()" matInput placeholder="add an action">
              <mat-icon matSuffix>add</mat-icon>
              <mat-error *ngIf="todoInput.hasError('existed')"><b>this action has been existed</b></mat-error>
            </mat-form-field>
          </form>

          <ng-container *ngFor="let item of list(); last as l">
            <div class="item d-flex justify-content-between align-items-center" (click)="showDetail(item)">
              <span>{{item}}</span>
              <button mat-mini-fab color="primary" aria-label="Example icon button with a delete icon" (click)="remove(item); $event.stopPropagation()">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
            <mat-divider  *ngIf="!l"/>
          </ng-container>

          <div class="empty-box" *ngIf="!list().length">
            <mat-icon style="width: 100px; height: 100px; font-size: 100px;">library_add</mat-icon>
          </div>


        </div>
      </div>
      <div class="divider"></div>
      <div class="col-8">
        <router-outlet />
      </div>
    </div>
  `,
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  router = inject(Router);
  todoText = signal('');
  list = signal<string[]>(JSON.parse(localStorage.getItem('list') || '[]') || []);
  todoInput = new FormControl('', [checkExisted(this.list())]);
  constructor() {
    effect(() => {});
  }

  onInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.todoText.set(target.value);
  }

  showDetail(item: string): void {
    void this.router.navigateByUrl(`todo-list/${item}`, {});
  }

  saveList() {
    localStorage.setItem('list', JSON.stringify(this.list()));
  }

  remove(item: string) {
    this.list.update(e => e.filter(x => x !== item));
    this.saveList();
  }

  add() {
    if(!this.todoInput.valid || !this.todoText().length) {
      return;
    }
    this.list.mutate((l) => l.push(this.todoText()));
    this.saveList();
    this.todoText.set('');
  }
}
