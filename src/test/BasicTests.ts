import {Component, NgModule} from '@angular/core';

@Component({
    selector: 'basic-component-1',
    template: '<h1>Basic Component 1</h1>'
})
export class BasicComponent1 {}

@Component({
    selector: 'basic-component-2',
    template: '<h1>Basic Component 2</h1>'
})
export class BasicComponent2 {}

@Component({
    selector: 'basic-component-3',
    template: '<h1>Basic Component 3</h1>'
})
export class BasicComponent3 {}

@NgModule({
    imports: [],
    declarations: [BasicComponent1, BasicComponent2],
    exports: [BasicComponent1, BasicComponent2],
    entryComponents: [],
    providers: []
})
export class BasicModule1 {}

@NgModule({
    imports: [],
    declarations: [BasicComponent2, BasicComponent3],
    exports: [BasicComponent2, BasicComponent3],
    entryComponents: [],
    providers: []
})
export class BasicModule2 {}
