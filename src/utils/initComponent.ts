import {Component} from '@angular/core';

function spyBindings(bindings: any) {
    Object.keys(bindings).forEach(function (key) {
        if (typeof bindings[key] === 'function') {
            spyOn(bindings, key).and.callThrough();
        }
    });
    return bindings;
}

export function initComponent(template: any, bindings: any): any {
    @Component({ template: template })
    class RenderComponent {}
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
