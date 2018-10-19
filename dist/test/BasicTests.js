"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let BasicComponent1 = class BasicComponent1 {
};
BasicComponent1 = __decorate([
    core_1.Component({
        selector: 'basic-component-1',
        template: '<h1>Basic Component 1</h1>'
    })
], BasicComponent1);
exports.BasicComponent1 = BasicComponent1;
let BasicComponent2 = class BasicComponent2 {
};
BasicComponent2 = __decorate([
    core_1.Component({
        selector: 'basic-component-2',
        template: '<h1>Basic Component 2</h1>'
    })
], BasicComponent2);
exports.BasicComponent2 = BasicComponent2;
let BasicComponent3 = class BasicComponent3 {
};
BasicComponent3 = __decorate([
    core_1.Component({
        selector: 'basic-component-3',
        template: '<h1>Basic Component 3</h1>'
    })
], BasicComponent3);
exports.BasicComponent3 = BasicComponent3;
let BasicModule1 = class BasicModule1 {
};
BasicModule1 = __decorate([
    core_1.NgModule({
        imports: [],
        declarations: [BasicComponent1, BasicComponent2],
        exports: [BasicComponent1, BasicComponent2],
        entryComponents: [],
        providers: []
    })
], BasicModule1);
exports.BasicModule1 = BasicModule1;
let BasicModule2 = class BasicModule2 {
};
BasicModule2 = __decorate([
    core_1.NgModule({
        imports: [],
        declarations: [BasicComponent2, BasicComponent3],
        exports: [BasicComponent2, BasicComponent3],
        entryComponents: [],
        providers: []
    })
], BasicModule2);
exports.BasicModule2 = BasicModule2;
