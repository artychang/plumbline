'use strict';
import {By} from '@angular/platform-browser';
import {Tester} from './Tester';

export default class Rendering
{
    fixture: any;
    bindings: any;
    tester: any;
    element: any;
    instance: any;

    constructor(tester: Tester<any>, fixture: any, bindings: any) {
        this.tester = tester;
        this.fixture = fixture;

        // Find the element in the markup
        if (this.fixture.componentInstance instanceof this.tester.testComponent) {
            this.element = this.fixture.debugElement;
        } else {
            this.element = this.fixture.debugElement.query(By.directive(this.tester.testComponent));
        }

        // Throw an error if the element was not found
        if (!this.element) {
            throw new Error(this.tester.testComponent.name + ' not found in html/template/markup');
        }

        this.instance = this.element.injector.get(this.tester.testComponent);
        this.bindings = bindings;
    }

}
