import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html',
    styleUrls: ['./footer.component.scss'],
    encapsulation : ViewEncapsulation.None
})

export class FooterComponent{
    test : Date = new Date();
}
