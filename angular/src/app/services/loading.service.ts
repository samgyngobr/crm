import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService
{

  onLoading : BehaviorSubject<any>;


  constructor()
  {
    this.onLoading = new BehaviorSubject(null);
  }


  show()
  {
    this.onLoading.next(true);
  }


  hide()
  {
    this.onLoading.next(false);
  }


}