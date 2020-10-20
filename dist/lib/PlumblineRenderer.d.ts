import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import Rendering from './models/Rendering';
import { Tester } from './models/Tester';
export default class PlumblineRenderer {
    tester: Tester<any>;
    neverMock: (typeof CommonModule | typeof BrowserModule)[];
    constructor(testComponent: any, testModule: any);
    render(html: any, renderOptions: any): Promise<Rendering>;
}
