// ANIMACIONES EN JS
// https://github.com/aleixsuau/mjs
/*
INSTALACIÓN:
- PACKAGE.json
{
  "dependencies": {
    "@angular/animations": "latest",
    "@angular/platform-browser": "latest",
  }
}
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
      elem.animate({ transform: 'scale(0)', opacity: 0 }, 3000);

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
    // DEFAULT STATES
    trigger('enterLeave', [
      // TRANSICIÓN DE ENTRADA
      transition('void => *', [ // '* <=> void'
        // ORÍGEN: Aplica un style de inicio al elemento
        style({
          opacity: 0.2,
          transform: 'translateX(-100%)' // scale(0.1) rotate(90deg)
        }),
        animate('1500ms ease-in',
          // DESTINO: Aplica un style de destino, el elemento se muestra,
          // realiza la transición hacia el style de destino y vuelve a su style inicial
          /* style({
            opacity: 1,
            transform: 'scale(1.2)'
          }) */
        )
      ]),
      // Los styles aplicados en las transitions se eliminan
      // una vez finalizada la transición entre states

      // TRANSICIÓN DE SALIDA
      /* transition('* => void', [
        animate('1000ms ease-in-out',
          style({
            opacity: 0.2,
            transform: 'translateX(100%)'
          })
        )
      ]) */

      // GROUPED ANIMATIONS
      // Nos permite realizar animaciones en paralelo
      /* transition('* => void', [
        group([
          animate('1s ease',
            style({
              backgroundColor: '#ffc107'
            })
          ),
          animate('2s 1.5s ease',
            style({
              opacity: 0.2,
              transform: 'translateX(100%)'
            })
          ),
        ])
      ]) */

      /* // QUERY & STAGGER
      transition('* => *', [
        // this hides everything right away
        query(':enter', style({ opacity: 0 })),

        // starts to animate things with a stagger in between
        query(':enter', stagger('100ms', [
          animate('1s', style({ opacity: 1 }))
        ])
      ]) */
    ]),

    // CUSTOM STATES
    // FINAL: Aplica un style final al elemento, una vez que el elemento ya ha
    // realizado la transición al estado
    trigger('selected', [
      state('selected',
        style({
          backgroundColor: 'whitesmoke',
          transform: 'scale(1.2)',
        })
      ),
      state('notSelected',
        style({
          transform: 'scale(1)',
        })
      ),
      transition('selected <=> notSelected', [
        animate('300ms ease-in')
      ])
    ])
    // ANIMATION CALLBACKS
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

  logIt(event) {
    console.log('Animation done, $event: ', event);
  }

}

interface ICar {
  name: string;
  price: number;
  year: number;
  selected: string;
}

/*
AVANZADO (>=4.2)
animation(), query(), stagger(), AnimationBuilder, Router animations, inputs/params.
ANIMATION:



PARÁMETROS:
Podemos declarar parámetros a la animación en:
- En la CLASE:
  @Component({
    animations: [
      trigger('someCoolAnimation', [
        transition('* => *', [ animation desc ], { params: '', ...animation options })
      ])...

- En la PLANTILLA:
    <div [@animation]="{value: expVal, option1: value, option2: value... }">...</div>

Luego podemos usar los parámetros en la declaración de la animación:
  transition('* => *', [
    style({ opacity: 0 }),
    animate("{{ time }}",
      style({ opacity: "{{ opacity }}" }),
  ], {
    time: "1s",
    opacity: "1"
  })

*/


