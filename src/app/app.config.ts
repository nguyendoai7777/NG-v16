import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: 'signals',
    loadComponent: () => import('./screens/signals/signals.component').then(c => c.SignalsComponent),
  },
  {
    path: 'todo-list',
    loadComponent: () => import('./screens/todo-list/todo-list.component').then(c => c.TodoListComponent),
    children: [
      {
        path: ':todo',
        loadComponent: () => import('./screens/todo-list/components/todo-detail/todo-detail.component').then(c => c.TodoDetailComponent)
      }
    ]
  }
];

const modules = [
  BrowserAnimationsModule
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    importProvidersFrom(modules),
    provideRouter(routes),
    provideZoneChangeDetection({eventCoalescing: true})
  ]
};
