import {Component, Input, NgModule, OnInit} from '@angular/core';

@Component({
    selector: 'input-component-1',
    template: '<h1>This is Simple</h1>'
})
export class InputComponent1 {}

@Component({
    selector: 'input-component-2',
    template: `
            <h1>{{titleOut}}</h1>
            <p>{{subtitleOut}}</p>
        `
})
export class InputComponent2 implements OnInit {
    @Input() titleIn: string;
    @Input() subtitleIn: string;
    titleOut: string;
    subtitleOut: string;

    constructor() {
        this.titleIn = '';
        this.titleOut = '';
        this.subtitleIn = '';
        this.subtitleOut = '';
    }

    ngOnInit() {
        this.titleIn = this.titleIn ? this.titleIn : '';
        this.titleOut = this.titleIn;
        this.subtitleIn = this.subtitleIn ? this.subtitleIn : '';
        this.subtitleOut = this.subtitleIn;
    }
}

@Component({
    selector: `input-component-3`,
    template: `
            <h3>This is Complex</h3>
            <input-component-1></input-component-1>
            <input-component-2 [titleIn]="'Title 1'" [subtitleIn]="'Text 2'"></input-component-2>
        `
})
export class InputComponent3 {
    helloMethod() {}
}

@NgModule({
    declarations: [InputComponent1, InputComponent2],
    exports: [InputComponent1, InputComponent2]
})
export class InputModule1 {}

@NgModule({
    declarations: [InputComponent1]
})
export class InputModule2 {}

@NgModule({
    declarations: [InputComponent2]
})
export class InputModule3 {}

@NgModule({
    declarations: [InputComponent1],
    exports: [InputComponent1]
})
export class InputModule4 {}

@NgModule({
    declarations: [InputComponent2],
    exports: [InputComponent2]
})
export class InputModule5 {}

@NgModule({
    declarations: [InputComponent3],
    exports: [InputComponent3]
})
export class InputModule6 {}

@NgModule({
    imports: [InputModule1],
    declarations: [InputComponent3],
    exports: [InputComponent3]
})
export class InputModule7 {}

@NgModule({
    imports: [InputModule1, InputModule6]
})
export class InputModule8 {}

@NgModule({
    imports: [InputModule4, InputModule1],
    exports: [InputModule4]
})
export class InputModule9 {}
