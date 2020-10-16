import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    Input,
    NgModule,
    OnChanges,
    OnInit,
    ViewEncapsulation,
    ComponentFactoryResolver,
    Injector,
    ModuleWithProviders
} from '@angular/core';
import {mount} from './mount';
import {RouterTestingModule} from '@angular/router/testing';
import {NgModel} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {EditorModule, SharedModule, ToolbarModule} from 'primeng/primeng';
import {resolveModule, Tester} from './models/Tester';
import {DirectiveComponent, DirectiveModule1, EmbeddedItemDirective} from './test/DirectiveTests';
import Renderer from './models/Renderer';

describe('Mount', () => {

    @Component({
        selector: 'test-component-1',
        template: '<h1>Test Component 1</h1>'
    })
    class TestComponent1 {}

    @Component({
        selector: 'simple-component',
        template: '<h1>This is Simple</h1>'
    })
    class SimpleComponent {}

    @Component({
        selector: 'title-component',
        template: `
            <h1>{{titleOut}}</h1>
            <p>{{subtitleOut}}</p>
        `
    })
    class TitleComponent implements OnInit {
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

        ngOnChanges() {
            this.titleIn = this.titleIn ? this.titleIn : '';
            this.titleOut = this.titleIn;
            this.subtitleIn = this.subtitleIn ? this.subtitleIn : '';
            this.subtitleOut = this.subtitleIn;
        }
    }

    @Component({
        selector: `complex-component`,
        template: `
            <simple-component></simple-component>
            <title-component [titleIn]="'Title 1'" [subtitleIn]="'Counter: ' + counter">
            </title-component>
            <span>{{counter}}</span>
        `
    })
    class ComplexComponent implements OnInit, OnChanges {
        counter = 1;

        ngOnInit() {}
        ngOnChanges() {}

        setCounter(count: number) {
            this.counter = count;
        }
        getCounter() {
            return this.counter;
        }
    }

    @NgModule({
        declarations: [SimpleComponent, TitleComponent],
        exports: [SimpleComponent, TitleComponent]
    })
    class ShallowModule1 {}

    @NgModule({
        declarations: [ComplexComponent, TitleComponent]
    })
    class ShallowModule2 {}

    @NgModule({
        imports: [ShallowModule1, ShallowModule2]
    })
    class ShallowModule3 {}

    @Component({
        selector: 'tif-component-1',
        template: `
            <h4>Test If 1</h4>
            <ng-template *ngIf="enabled; else description2"
                         [ngTemplateOutlet]="description1">
            </ng-template>
            <ng-template #description1><p>enabled</p></ng-template>
            <ng-template #description2><p>disabled</p></ng-template>
        `
    })
    class TifComponent1 implements OnChanges {
        enabled = false;
        enable() { this.enabled = true; }
        disable() { this.enabled = false; }
        ngOnChanges() {}
    }

    @Component({
        selector: 'tif-component-2',
        template: `
            <h4>Test If 2</h4>
            <tif-component-1></tif-component-1>
        `
    })
    class TifComponent2 {}

    @NgModule({
        imports: [CommonModule],
        declarations: [TifComponent1],
        exports: [TifComponent1]
    })
    class TifModule {}

    @Component({
        selector: 'provider-component-1',
        template: '<h1>Provider Component 1</h1>'
    })
    class ProviderComponent1 {
        constructor(currencyPipe: CurrencyPipe) {}
    }

    @Component({
        selector: 'entry-component-1',
        template: '<p>Entry Component 1</p>',
        encapsulation: ViewEncapsulation.None
    })
    class EntryComponent1 {}

    @Component({
        selector: 'entry-use-component-1',
        template: '<p>Entry Use Component 1</p>'
    })
    class EntryUseComponent1 {
        private entryComp: EntryComponent1;

        constructor (public factoryResolver: ComponentFactoryResolver,
            public injector: Injector) {}
        ngOnInit () {
            this.entryComp = this.factoryResolver.resolveComponentFactory(EntryComponent1)
            .create(this.injector).instance;
        }
    }

    @NgModule({
        declarations: [EntryComponent1],
        entryComponents: [EntryComponent1],
    })
    class EntryModule1 {}

    @NgModule({
        declarations: [SimpleComponent, TitleComponent],
        exports: [SimpleComponent, TitleComponent],
        entryComponents: [SimpleComponent, TitleComponent]
    })
    class EntryModule2 {}

    @NgModule({
        imports: [EntryModule2],
        exports: [EntryModule2]
    })
    class EntryModule3 {}

    describe('Simple Component', () => {

        it('Simple Render', async () => {
            let simpleComp = await mount<SimpleComponent>(
                `<simple-component></simple-component>`,
                SimpleComponent, {}, {}
            );
            expect(simpleComp.element()).not.toEqual(null);
            expect(simpleComp.element().innerHTML).toEqual('<h1>This is Simple</h1>');
            expect(simpleComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
        });

        it('Single Binding', async () => {

            let titleComp = await mount<TitleComponent>(
                `<title-component [titleIn]="currentTitle"></title-component>`,
                TitleComponent, {}, {
                    bind: {
                        currentTitle: 'Title 1'
                    }
                }
            );
            expect(titleComp.element()).not.toEqual(null);
            expect(titleComp.find('h1')[0].element().innerHTML).toEqual('Title 1');
        });

        it('Single Binding Direct', async () => {

            let titleComp = await mount<TitleComponent>(
                `<title-component [titleIn]="'Title 1'"></title-component>`,
                TitleComponent
            );
            expect(titleComp.element()).not.toEqual(null);
            expect(titleComp.find('h1')[0].element().innerHTML).toEqual('Title 1');
        });


        it('Double Binding', async () => {

            let titleComp = await mount<TitleComponent>(
                `<title-component
                    [titleIn]="text1"
                    [subtitleIn]="text2"
                    ></title-component>`,
                TitleComponent, {}, {
                    bind: {
                        text1: 'Title 1',
                        text2: 'Text 2'
                    }
                }
            );
            expect(titleComp.element()).not.toEqual(null);
            expect(titleComp.find('h1')[0].element().innerHTML).toEqual('Title 1');
            expect(titleComp.find('p')[0].element().innerHTML).toEqual('Text 2');
        });
    });

    describe('Complex Component - Load Declarations', () => {

        it('Simple Mock Render - Not Real Mounting', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mockModule: {
                        declarations: [SimpleComponent, TitleComponent]
                    }
                });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).not.toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).not.toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).not.toContain('<p>Text 2</p>');
            expect(complexComp.find('h1').length).toEqual(0);
        });

        it('Simple Mount Render - Real Mounting', async () => {
            let complexComp = await mount(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mountModule: {
                        declarations: [SimpleComponent, TitleComponent]
                    }
                });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Counter: 1</p>');
            expect(complexComp.find('h1').length).toEqual(2);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
            expect(complexComp.find('h1')[1].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Counter: 1');
        });

        it('Simple Mount Render - Mixed Mounting', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mockModule: {
                        declarations: [SimpleComponent]
                    },
                    mountModule: {
                        declarations: [TitleComponent]
                    }
                });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).not.toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Counter: 1</p>');
            expect(complexComp.find('h1').length).toEqual(1);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Counter: 1');
        });
    });

    describe('Complex Component - Load Providers', () => {

        it('Simple Mock Render - Real Mounting', async () => {
            let complexComp = await mount<ProviderComponent1>(
                `<provider-component-1></provider-component-1>`,
                ProviderComponent1, {
                    mountModule: {
                        providers: [CurrencyPipe]
                    }
                });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>Provider Component 1</h1>');
        });

        class ProviderService {}

        @Component({
            selector: 'provider-component-test-1',
            template: `<h1>Provider Component Test 1</h1>`
        })
        class ProviderComponentTest1 {
            constructor (service: ProviderService) {}
        }

        it('Module with Providers - Base Mock', async () => {
            let providerComp = await mount<ProviderComponentTest1>(
                `<provider-component-test-1></provider-component-test-1>`,
                ProviderComponentTest1, {
                    mockModule: {
                        providers: [ProviderService]
                    }
                });
            expect(providerComp.element()).not.toEqual(null);
            expect(providerComp.element().innerHTML)
                .toContain('<h1>Provider Component Test 1</h1>');
        });

        it('Module with Providers - Base Mount', async () => {
            let providerComp = await mount<ProviderComponentTest1>(
                `<provider-component-test-1></provider-component-test-1>`,
                ProviderComponentTest1, {
                    mountModule: {
                        providers: [ProviderService]
                    }
                });
            expect(providerComp.element()).not.toEqual(null);
            expect(providerComp.element().innerHTML)
                .toContain('<h1>Provider Component Test 1</h1>');
        });

        it('Module with Providers - Standalone Mock', async () => {
            @NgModule()
            class ProviderModule {}

            let providerComp = await mount<ProviderComponentTest1>(
                `<provider-component-test-1></provider-component-test-1>`,
                ProviderComponentTest1, {
                    mockModule: {
                        imports: [{
                            ngModule: ProviderModule,
                            providers: [ProviderService]
                        }]
                    },
                    mountModule: {
                        imports: [{
                            ngModule: ProviderModule,
                            providers: [ProviderService]
                        }]
                    }
                });
            expect(providerComp.element()).not.toEqual(null);
            expect(providerComp.element().innerHTML)
                .toContain('<h1>Provider Component Test 1</h1>');
        });

        it('Module with Providers - Standalone Mount', async () => {
            @NgModule()
            class ProviderModule {}

            let providerComp = await mount<ProviderComponentTest1>(
                `<provider-component-test-1></provider-component-test-1>`,
                ProviderComponentTest1, {
                    mountModule: {
                        imports: [{
                            ngModule: ProviderModule,
                            providers: [ProviderService]
                        }]
                    }
                });
            expect(providerComp.element()).not.toEqual(null);
            expect(providerComp.element().innerHTML)
                .toContain('<h1>Provider Component Test 1</h1>');
        });

        it('Module with Providers - Full Class Mock', async () => {
            @NgModule()
            class ProviderModule {
                static forRoot(): ModuleWithProviders<ProviderModule> {
                    return {
                        ngModule: ProviderModule,
                        providers: [ProviderService]
                    };
                }
            }

            let providerComp = await mount<ProviderComponentTest1>(
                `<provider-component-test-1></provider-component-test-1>`,
                ProviderComponentTest1, {
                    mockModule: {
                        imports: [ProviderModule.forRoot()]
                    },
                    mountModule: {
                        imports: [ProviderModule.forRoot()]
                    }
                });
            expect(providerComp.element()).not.toEqual(null);
            expect(providerComp.element().innerHTML)
                .toContain('<h1>Provider Component Test 1</h1>');
        });

        it('Module with Providers - Full Class Mount', async () => {
            @NgModule()
            class ProviderModule {
                static forRoot(): ModuleWithProviders<ProviderModule> {
                    return {
                        ngModule: ProviderModule,
                        providers: [ProviderService]
                    };
                }
            }

            let providerComp = await mount<ProviderComponentTest1>(
                `<provider-component-test-1></provider-component-test-1>`,
                ProviderComponentTest1, {
                    mountModule: {
                        imports: [ProviderModule.forRoot()]
                    }
                });
            expect(providerComp.element()).not.toEqual(null);
            expect(providerComp.element().innerHTML)
                .toContain('<h1>Provider Component Test 1</h1>');
        });
    });

    describe('Complex Component - Load Entry Components', () => {

        it('Simple Mock Render - Real Mounting', async () => {
            let complexComp = await mount<EntryUseComponent1>(
                `<entry-use-component-1></entry-use-component-1>`,
                EntryUseComponent1, {
                    mountModule: {
                        imports: [EntryModule1]
                    }
                });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<p>Entry Use Component 1</p>');
        });

        it('Import Module Mock', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mockModule: {
                        imports: [EntryModule3],
                        schemas: [CUSTOM_ELEMENTS_SCHEMA]
                    }
                });

            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).not.toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).not.toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).not.toContain('<p>Text 2</p>');
            expect(complexComp.find('h1').length).toEqual(0);
        });

        it('Import Module Mount', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mountModule: {
                        imports: [EntryModule3],
                        schemas: [CUSTOM_ELEMENTS_SCHEMA]
                    }
                });

            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Counter: 1</p>');
            expect(complexComp.find('h1').length).toEqual(2);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
            expect(complexComp.find('h1')[1].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Counter: 1');

            expect(complexComp.module().schemas[0]).toEqual(CUSTOM_ELEMENTS_SCHEMA);
            expect(resolveModule(complexComp.module().imports[0]).schemas[0])
                .toEqual(CUSTOM_ELEMENTS_SCHEMA);
        });
    });

    describe('Complex Component - Load Imports', () => {

        it('Import Module - Mock', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mockModule: {
                        imports: [ShallowModule1]
                    }
                });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).not.toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).not.toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).not.toContain('<p>Text 2</p>');
            expect(complexComp.find('h1').length).toEqual(0);
        });

        it('Import Module - Mount', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mountModule: {
                        imports: [ShallowModule1]
                    }
                });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Counter: 1</p>');
            expect(complexComp.find('h1').length).toEqual(2);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
            expect(complexComp.find('h1')[1].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Counter: 1');
        });

        it('Import Module - Full #1', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mountModule: {
                        imports: [ShallowModule3]
                    }
                });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Counter: 1</p>');
            expect(complexComp.find('h1').length).toEqual(2);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
            expect(complexComp.find('h1')[1].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Counter: 1');
        });

        it('Import Module - Full #2', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mountModule: {
                        imports: [ShallowModule1, ShallowModule2, ShallowModule3]
                    }
                });

            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Counter: 1</p>');
            expect(complexComp.find('h1').length).toEqual(2);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
            expect(complexComp.find('h1')[1].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Counter: 1');
        });

        it('Import Module Schema - Full #3', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mountModule: {
                        imports: [ShallowModule1, ShallowModule2, ShallowModule3],
                        schemas: [CUSTOM_ELEMENTS_SCHEMA]
                    }
                });

            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Counter: 1</p>');
            expect(complexComp.find('h1').length).toEqual(2);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
            expect(complexComp.find('h1')[1].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Counter: 1');

            expect(complexComp.module().schemas[0]).toEqual(CUSTOM_ELEMENTS_SCHEMA);
            expect(resolveModule(complexComp.module().imports[0]).schemas[0])
                .toEqual(CUSTOM_ELEMENTS_SCHEMA);
        });
    });

    describe('Component Self Mock', () => {
        it('Simple Declaration - Mock', async () => {
            let simpleComp = await mount<SimpleComponent>(
                `<simple-component></simple-component>`,
                SimpleComponent, {
                    mockModule: {
                        declarations: [SimpleComponent]
                    }
                });
            expect(simpleComp.element()).not.toEqual(null);
            expect(simpleComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(simpleComp.find('h1').length).toEqual(1);
        });

        it('Simple Declaration - Mock & Mount', async () => {
            let simpleComp = await mount<SimpleComponent>(
                `<simple-component></simple-component>`,
                SimpleComponent, {
                    mockModule: {
                        declarations: [SimpleComponent]
                    },
                    mountModule: {
                        declarations: [SimpleComponent]
                    }
                });
            expect(simpleComp.element()).not.toEqual(null);
            expect(simpleComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(simpleComp.find('h1').length).toEqual(1);
        });

        it('Complex Import Module - Mock & Mount', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mockModule: {
                        declarations: [ComplexComponent]
                    },
                    mountModule: {
                        imports: [ShallowModule1]
                    }
                });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Counter: 1</p>');
            expect(complexComp.find('h1').length).toEqual(2);
        });
    });

    describe('On-The-Fly Markup', () => {
        it('FlyComponent with Wrapper Module', async () => {
            @NgModule({
                declarations: [ComplexComponent],
                imports: [ShallowModule1]
            })
            class WrapperModule {}

            @Component({
                selector: `fly-component`,
                template: `<div>
                    <complex-component></complex-component>
                </div>`
            })
            class FlyComponent {}

            let flyComp = await mount<FlyComponent>(
                `<fly-component></fly-component>`,
                FlyComponent, {
                    mountModule: {
                        imports: [WrapperModule]
                    }
                });
            expect(flyComp.element()).not.toEqual(null);
            expect(flyComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(flyComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(flyComp.element().innerHTML).toContain('<p>Counter: 1</p>');
            expect(flyComp.find('h1').length).toEqual(2);
        });

        it('FlyComponent Low Level Access', async () => {
            @Component({
                selector: `fly-component`,
                template: `<div>
                    <complex-component></complex-component>
                </div>`
            })
            class FlyComponent {}

            let flyComp = await mount<FlyComponent>(
                `<fly-component></fly-component>`,
                FlyComponent, {
                    mountModule: {
                        declarations: [ComplexComponent],
                        imports: [ShallowModule1]
                    }
                });
            expect(flyComp.element()).not.toEqual(null);
            expect(flyComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(flyComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(flyComp.element().innerHTML).toContain('<p>Counter: 1</p>');
            expect(flyComp.find('h1').length).toEqual(2);
        });
    });

    describe('Instance Injector', () => {
        it('Simple Mount Render - Real Mounting', async () => {
            let complexComp = await mount(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mountModule: {
                        declarations: [SimpleComponent, TitleComponent]
                    }
                });
            expect(complexComp.instance()).toBeTruthy();

            let complexInstance = complexComp.instance(ComplexComponent);
            expect(complexInstance).toBeTruthy();
            expect(complexInstance).toBe(complexComp.instance());
            expect(complexInstance.counter).toBe(1);

            // Check the no instance argument case
            expect(complexComp.find('title-component')[0].instance()).toBe(complexComp.instance());

            let titleInstance = complexComp.find('title-component')[0].instance(TitleComponent);
            expect(titleInstance.subtitleOut).toBe('Counter: 1');

            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Counter: 1</p>');

            complexInstance.setCounter(2);

            await complexComp.update();
            expect(titleInstance.subtitleOut).toBe('Counter: 2');
            expect(complexComp.element().innerHTML).not.toContain('<p>Counter: 1</p>');
            expect(complexComp.element().innerHTML).toContain('<p>Counter: 2</p>');

            titleInstance.titleOut = 'Title 2';
            await complexComp.update();
            expect(complexComp.element().innerHTML).not.toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 2</h1>');
        });
    });

    describe('Complex Component - Access Component Internals', () => {

        it('Test #1', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mockModule: {
                        declarations: [SimpleComponent, TitleComponent]
                    }
                });
            expect(complexComp.instance()).not.toEqual(null);
            expect(complexComp.find('span')[0].element().innerHTML).toEqual('1');
            expect(complexComp.instance().counter).toEqual(1);
            expect(complexComp.instance().getCounter()).toEqual(1);

            complexComp.instance().counter = 2;
            await complexComp.update();

            expect(complexComp.find('span')[0].element().innerHTML).toEqual('2');
            expect(complexComp.instance().counter).toEqual(2);
            expect(complexComp.instance().getCounter()).toEqual(2);

            complexComp.instance().setCounter(3);
            await complexComp.update();

            expect(complexComp.find('span')[0].element().innerHTML).toEqual('3');
            expect(complexComp.instance().counter).toEqual(3);
            expect(complexComp.instance().getCounter()).toEqual(3);
        });
    });

    describe('Edge Case: Router', () => {

        it('RouterTestingModule #1 Mock', async () => {
            let simpleComp = await mount<SimpleComponent>(
                `<simple-component></simple-component>`,
                SimpleComponent, {
                    mockModule: {
                        imports: [RouterTestingModule]
                    }
                });

            expect(simpleComp.element()).not.toEqual(null);
        });

        it('RouterTestingModule #1 Mount', async () => {
            let simpleComp = await mount<SimpleComponent>(
                `<simple-component></simple-component>`,
                SimpleComponent, {
                    mountModule: {
                        imports: [RouterTestingModule]
                    }
                });

            expect(simpleComp.element()).not.toEqual(null);
        });

        it('RouterTestingModule #2 Mock', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mockModule: {
                        imports: [RouterTestingModule, ShallowModule3]
                    }
                });

            expect(complexComp.element()).not.toEqual(null);
        });

        it('RouterTestingModule #2 Mount', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mountModule: {
                        imports: [RouterTestingModule, ShallowModule3]
                    }
                });

            expect(complexComp.element()).not.toEqual(null);
        });

        it('RouterTestingModule #3 Mock', async () => {
            const routes: Routes = [
                {
                    path: '' , component: TestComponent1
                }, {
                    path: '**',
                    redirectTo: '/404'
                }
            ];

            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mockModule: {
                        declarations: [TestComponent1],
                        imports: [
                            RouterModule.forChild(routes),
                            ShallowModule3
                        ]
                    }
                });

            expect(complexComp.element()).not.toEqual(null);
        });

        it('RouterTestingModule #3 Mount', async () => {
            const routes: Routes = [
                {
                    path: '' , component: TestComponent1
                }, {
                    path: '**',
                    redirectTo: '/404'
                }
            ];

            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mountModule: {
                        declarations: [TestComponent1],
                        imports: [
                            RouterModule.forChild(routes),
                            ShallowModule3
                        ]
                    }
                });

            expect(complexComp.element()).not.toEqual(null);
        });
    });

    describe('Edge Case: NgModel', () => {

        it('NgModel #1', async () => {

            let simpleComp = await mount<SimpleComponent>(
                `<simple-component></simple-component>`,
                SimpleComponent, {
                    mockModule: {
                        declarations: [NgModel]
                    }
                });

            expect(simpleComp.element()).not.toEqual(null);
        });

        it('NgModel #2', async () => {
            let complexComp = await mount<ComplexComponent>(
                `<complex-component></complex-component>`,
                ComplexComponent, {
                    mountModule: {
                        declarations: [NgModel],
                        imports: [ShallowModule3]
                    }
                });

            expect(complexComp.element()).not.toEqual(null);
        });
    });

    describe('Edge Case: Tif Component', () => {

        it('Test #1', async () => {
            let tifComp = await mount<TifComponent1>(
                `<tif-component-1></tif-component-1>`,
                TifComponent1, {
                    mountModule: {
                        imports: [TifModule]
                    }
                });

            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h4>Test If 1</h4>');
            expect(tifComp.element().innerHTML).not.toContain('enabled');

            tifComp.instance().enable();
            await tifComp.update();
            expect(tifComp.element().innerHTML).toContain('enabled');

            tifComp.instance().disable();
            await tifComp.update();
            expect(tifComp.element().innerHTML).not.toContain('enabled');
        });

        it('Test #2', async () => {
            let tifComp = await mount<TifComponent2>(
                `<tif-component-2></tif-component-2>`,
                TifComponent2, {
                    mountModule: {
                        imports: [TifModule]
                    }
                });

            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h4>Test If 2</h4>');
            expect(tifComp.element().innerHTML).not.toContain('enabled');
        });
    });


    describe('Edge Case: PrimeNg Component', () => {

        it('SharedModule #1', async () => {
            let tifComp = await mount<SimpleComponent>(
                `<simple-component></simple-component>`,
                SimpleComponent, {
                    mountModule: {
                        imports: [SharedModule, EditorModule]
                    }
                });

            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
        });

        it('SharedModule #2', async () => {
            let tifComp = await mount<SimpleComponent>(
                `<simple-component></simple-component>`,
                SimpleComponent, {
                    mountModule: {
                        imports: [EditorModule, SharedModule]
                    }
                });

            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
        });
    });

    describe('Edge Case: PrimeNg Directive', () => {

        it('Test #1 Default', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                    EmbeddedItemDirective
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    DirectiveModule1
                ],
                exports: [
                    DirectiveComponent,
                    EmbeddedItemDirective
                ],
                providers: []
            })
            class NavigatorModule {}

            let tifComp = await mount<DirectiveComponent>(
                `<directive-component></directive-component>`,
                DirectiveComponent, {
                    mountModule: {
                        imports: [
                            CommonModule,
                            ToolbarModule,
                            DirectiveModule1,
                            NavigatorModule
                        ]
                    }
                });

            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<span>Default Brand</span>');
        });

        it('Test #1 Branded', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    DirectiveModule1
                ],
                exports: [
                    DirectiveComponent,
                ],
                providers: []
            })
            class NavigatorModule {}

            let tifComp = await mount<DirectiveComponent>(
                `<directive-component>
                    <ng-template #brand>
                        <span>Plumbline Brand</span>
                    </ng-template>
                </directive-component>`,
                DirectiveComponent, {
                    mountModule: {
                        imports: [
                            CommonModule,
                            ToolbarModule,
                            NavigatorModule
                        ]
                    }
                });

            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<span>Plumbline Brand</span>');
        });

        it('Test #1 None Case Mount', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                    // EmbeddedItemDirective
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    DirectiveModule1
                ],
                exports: [
                    DirectiveComponent,
                    // EmbeddedItemDirective
                ],
                providers: []
            })
            class NavigatorModule {}

            let tifComp = await mount<SimpleComponent>(
                `<simple-component></simple-component>`,
                SimpleComponent, {
                    mountModule: {
                        imports: [
                            CommonModule,
                            ToolbarModule,
                            NavigatorModule
                        ]
                    },
                });

            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
        });

        it('Test #1 None Case Mount Duplicates', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                    DirectiveComponent,
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    DirectiveModule1,
                    DirectiveModule1
                ],
                exports: [
                    DirectiveComponent,
                    DirectiveComponent,
                ],
                providers: []
            })
            class NavigatorModule1 {}

            @NgModule({
                imports: [
                    NavigatorModule1
                ],
            })
            class NavigatorModule2 {}

            let tifComp = await mount<SimpleComponent>(
                `<simple-component></simple-component>`,
                SimpleComponent, {
                    mountModule: {
                        imports: [
                            CommonModule,
                            ToolbarModule,
                            NavigatorModule2
                        ]
                    },
                });

            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
        });

        it('Test #1 None Case Mock', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    DirectiveModule1
                ],
                exports: [
                    DirectiveComponent,
                ],
                providers: []
            })
            class NavigatorModule1 {}

            @NgModule({
                imports: [
                    NavigatorModule1
                ],
            })
            class NavigatorModule2 {}

            let tifComp = await mount<SimpleComponent>(
                `<simple-component></simple-component>`,
                SimpleComponent, {
                    mockModule: {
                        imports: [
                            CommonModule,
                            ToolbarModule,
                            NavigatorModule2
                        ]
                    },
                });

            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
        });

        it('Test #1 None Case Mock Duplicates', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                    DirectiveComponent,
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    DirectiveModule1,
                    DirectiveModule1
                ],
                exports: [
                    DirectiveComponent,
                    DirectiveComponent,
                ],
                providers: []
            })
            class NavigatorModule1 {}

            @NgModule({
                imports: [
                    NavigatorModule1
                ],
            })
            class NavigatorModule2 {}

            let tifComp = await mount<SimpleComponent>(
                `<simple-component></simple-component>`,
                SimpleComponent, {
                    mockModule: {
                        imports: [
                            CommonModule,
                            ToolbarModule,
                            NavigatorModule2
                        ]
                    },
                });

            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
        });

        it('Test #2', async () => {

            @Component({
                selector: 'directive-component-2',
                template: `
                    <directive-component>
                        <ng-template #brand>
                            <span>Plumbline Brand</span>
                        </ng-template>
                    </directive-component>
                `
            })
            class DirectiveComponent2 {}


            @NgModule({
                declarations: [
                    DirectiveComponent,
                    EmbeddedItemDirective
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    DirectiveModule1
                ],
                exports: [
                    DirectiveComponent,
                    EmbeddedItemDirective
                ],
                providers: []
            })
            class NavigatorModule {}

            let tifComp = await mount<DirectiveComponent2>(
                `<directive-component-2></directive-component-2>`,
                DirectiveComponent2, {
                    mountModule: {
                        imports: [
                            CommonModule,
                            ToolbarModule,
                            NavigatorModule
                        ]
                    }
                });

            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<span>Plumbline Brand</span>');
        });
    });
});
