"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputModule9 = exports.InputModule8 = exports.InputModule7 = exports.InputModule6 = exports.InputModule5 = exports.InputModule4 = exports.InputModule3 = exports.InputModule2 = exports.InputModule1 = exports.InputComponent3 = exports.InputComponent2 = exports.InputComponent1 = void 0;
const core_1 = require("@angular/core");
let InputComponent1 = class InputComponent1 {
};
InputComponent1 = __decorate([
    core_1.Component({
        selector: 'input-component-1',
        template: '<h1>This is Simple</h1>'
    })
], InputComponent1);
exports.InputComponent1 = InputComponent1;
let InputComponent2 = class InputComponent2 {
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
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputComponent2.prototype, "titleIn", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputComponent2.prototype, "subtitleIn", void 0);
InputComponent2 = __decorate([
    core_1.Component({
        selector: 'input-component-2',
        template: `
            <h1>{{titleOut}}</h1>
            <p>{{subtitleOut}}</p>
        `
    }),
    __metadata("design:paramtypes", [])
], InputComponent2);
exports.InputComponent2 = InputComponent2;
let InputComponent3 = class InputComponent3 {
    helloMethod() { }
};
InputComponent3 = __decorate([
    core_1.Component({
        selector: `input-component-3`,
        template: `
            <h3>This is Complex</h3>
            <input-component-1></input-component-1>
            <input-component-2 [titleIn]="'Title 1'" [subtitleIn]="'Text 2'"></input-component-2>
        `
    })
], InputComponent3);
exports.InputComponent3 = InputComponent3;
let InputModule1 = class InputModule1 {
};
InputModule1 = __decorate([
    core_1.NgModule({
        declarations: [InputComponent1, InputComponent2],
        exports: [InputComponent1, InputComponent2]
    })
], InputModule1);
exports.InputModule1 = InputModule1;
let InputModule2 = class InputModule2 {
};
InputModule2 = __decorate([
    core_1.NgModule({
        declarations: [InputComponent1]
    })
], InputModule2);
exports.InputModule2 = InputModule2;
let InputModule3 = class InputModule3 {
};
InputModule3 = __decorate([
    core_1.NgModule({
        declarations: [InputComponent2]
    })
], InputModule3);
exports.InputModule3 = InputModule3;
let InputModule4 = class InputModule4 {
};
InputModule4 = __decorate([
    core_1.NgModule({
        declarations: [InputComponent1],
        exports: [InputComponent1]
    })
], InputModule4);
exports.InputModule4 = InputModule4;
let InputModule5 = class InputModule5 {
};
InputModule5 = __decorate([
    core_1.NgModule({
        declarations: [InputComponent2],
        exports: [InputComponent2]
    })
], InputModule5);
exports.InputModule5 = InputModule5;
let InputModule6 = class InputModule6 {
};
InputModule6 = __decorate([
    core_1.NgModule({
        declarations: [InputComponent3],
        exports: [InputComponent3]
    })
], InputModule6);
exports.InputModule6 = InputModule6;
let InputModule7 = class InputModule7 {
};
InputModule7 = __decorate([
    core_1.NgModule({
        imports: [InputModule1],
        declarations: [InputComponent3],
        exports: [InputComponent3]
    })
], InputModule7);
exports.InputModule7 = InputModule7;
let InputModule8 = class InputModule8 {
};
InputModule8 = __decorate([
    core_1.NgModule({
        imports: [InputModule1, InputModule6]
    })
], InputModule8);
exports.InputModule8 = InputModule8;
let InputModule9 = class InputModule9 {
};
InputModule9 = __decorate([
    core_1.NgModule({
        imports: [InputModule4, InputModule1],
        exports: [InputModule4]
    })
], InputModule9);
exports.InputModule9 = InputModule9;
