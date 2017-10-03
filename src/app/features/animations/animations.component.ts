// ANIMACIONES EN JS
/*
INSTALACIÓN:
- En el MÓDULO (app.module.ts):
  import { BrowserModule } from '@angular/platform-browser';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

  @NgModule({
    imports: [ BrowserModule, BrowserAnimationsModule ],
    // ... more stuff ...
  })
  export class AppModule { }

- En el COMPONENTE:
  // Importamos las clases de animación que necesitemos
  import { trigger, state, style, animate, transition } from '@angular/animations';
*/


/*
Las animaciones de Angular se basan en:

WEB ANIMATIONS API:
- Unifica una interfaz para CSS Transitions, CSS Animations, SVG animations
- Nos permite controlar las animaciones (start, pause, stop) y reaccionar a sus diferentes
estados (finished...), testear y debuggar con JS. Las animaciones pasan del CSS al JS.

      // Creating animations from script
      let elem = document.getElementsByClassName('circle')[0];
      elem.animate({ transform: 'scale(0)', opacity: 0 }, 300);

      // Inspecting running animations
      const isAnimating = elem.getAnimations().some(
        animation => animation.playState === 'running'
      );

      // Controlling running animations
      document.getAnimations().forEach(
        animation => animation.pause()
      );
*/

/*
En el contexto de Angular, tenemos nuevos triggers:
TRIGGERS:
  - Web Animations API nos permite disparar animaciones desde JS.
  - Angular nos permite disparar las animaciones en base a 'states'.
*/

/*
STATES
Angular nos permite disparar animaciones en base al cambio de estado de un elemento.

2 TIPOS de estados (states):
- DEFAULT states:
        - void (cuando el elemento no existe en la vista)
        - * (wildcard = cualquier state)

- CUSTOM states:
Definidos por nosotros.
*/

/*
DECLARACIÓN DE ANIMACIONES
En 2 lugares del componente:
- Clase: En el array de animaciones definimos la animación.
- Vista: En el elemento que deseamos animar, declaramos el [@trigger] (disparador)
*/

import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
  // Array de animaciones
  animations: [
    trigger('enterLeave', [
      // EJERCICIO:
      // Implementa laS trasiciones declarando los states de transición (origen => destino)
      // y haciendo uso de style() y animate()
      // TRANSICIÓN DE ENTRADA
      transition('', [

      ]),
      // TRANSICIÓN DE SALIDA
      transition('', [

      ])
    ]),

    // CUSTOM STATES
    // FINAL: Aplica un style final al elemento, una vez que el elemento ya ha
    // realizado la transición al estado
  ]
})
export class AnimationsComponent implements OnInit {
  cars: ICar[];
  show = true;

  constructor() { }

  ngOnInit() {
    this.cars = [
      { name: 'Seiscientos', price: 400, year: 1978, selected: 'notSelected' },
      { name: 'BMW', price: 15000, year: 2008, selected: 'notSelected' },
      { name: 'Ferrari', price: 50000, year: 2012, selected: 'notSelected' },
      { name: 'Fiesta', price: 4000, year: 2007, selected: 'notSelected' },
    ];
  }

}

interface ICar {
  name: string;
  price: number;
  year: number;
  selected: string;
}

