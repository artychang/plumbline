import {JitReflector} from './compilerReflector';
import {DirectiveResolver, PipeResolver, NgModuleResolver} from '@angular/compiler';

let jitReflector = new JitReflector();
let pipeResolver = new PipeResolver(jitReflector);
let directiveResolver = new DirectiveResolver(jitReflector);
let ngModuleResolver = new NgModuleResolver(jitReflector);

export {jitReflector, pipeResolver, directiveResolver};

export function isValueProvider(provider: any): boolean {
    return 'useValue' in provider;
}

export function isClassProvider(provider: any): boolean {
    return 'useClass' in provider;
}

export function isModuleWithProviders(thing: any): boolean {
    return 'ngModule' in thing;
}

export function isNgModule(thing: any): boolean {
    return ngModuleResolver.isNgModule(thing);
}

export function resolveNgModule(thing: any): any {
    return ngModuleResolver.resolve(thing);
}
