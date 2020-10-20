"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initComponent = void 0;
const core_1 = require("@angular/core");
function spyBindings(bindings) {
    Object.keys(bindings).forEach(function (key) {
        if (typeof bindings[key] === 'function') {
            spyOn(bindings, key).and.callThrough();
        }
    });
    return bindings;
}
function initComponent(template, bindings) {
    let RenderComponent = class RenderComponent {
    };
    RenderComponent = __decorate([
        core_1.Component({ template: template })
    ], RenderComponent);
    Object.assign(RenderComponent.prototype, spyBindings(bindings));
    // Enable two-way binding that overwrites & updates input
    Object.keys(bindings).forEach((key) => {
        Object.defineProperty(RenderComponent.prototype, key, {
            get: () => bindings[key],
            set: (v) => { bindings[key] = v; }
        });
    });
    return RenderComponent;
}
exports.initComponent = initComponent;
