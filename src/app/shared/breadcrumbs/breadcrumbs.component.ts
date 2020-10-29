import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import {filter, map} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public titutoSubs$: Subscription;

  constructor( private router: Router) {

    this.titutoSubs$ = this.getArgumentosRuta()
                          .subscribe( data => this.titulo = data.titulo );
                          // asigno el titulo que fui filtrando a la variable.
   }

  ngOnDestroy(): void {
    this.titutoSubs$.unsubscribe();
  }

  getArgumentosRuta() {

    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd), // filtro activationEnd porque ahi es donde está la info del titulo
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data) // me quedo con el 1er hijo.
    );
  }

}
