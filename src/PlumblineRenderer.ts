'use strict';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import Renderer from './models/Renderer';
import Rendering from './models/Rendering';
import {Tester} from './models/Tester';

export default class PlumblineRenderer {

    tester: Tester<any>;
    neverMock = [CommonModule, BrowserModule];

    constructor(testComponent: any, testModule: any) {
        this.tester = new Tester(testComponent, testModule);
        this.tester.dontMock.push(... this.neverMock);
    }

    render(html: any, renderOptions: any): Promise<Rendering> {
        let renderer = new Renderer(this.tester);
        return renderer.render(html, renderOptions);
    }

}
