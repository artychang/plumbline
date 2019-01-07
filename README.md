Plumbline
==========

Plumbline is a Javascript testing utility that simplifies shallow mounting components in Angular and makes it easier to assert and traverse DOM elements.  Inspired by the Enzyme API for React.

Plumbline also assists in the TestBed module compilation process by:
* Eliminating duplicate component appearances (between different modules) into a single higher-level module.
* Allowing the tester to specify whether individual components are to be mounted or mocked.
* Mocking entire root modules for quick error free mounting.

### Prerequisites

The current version of Plumbline is only tested to work with Angular 5, Jasmine and Karma.

### Installation

To include Plumbline your Angular application, first install with npm

```
npm i --save-dev plumbline
```


Basic Usage
--------

#### mount

An Angular component is mounted as follows and returns a Promise containing PlumblineWrapper.

```javascript
mount<T>(
    markup: any,
    testComponent: any,
    testModule?: any,
    options?: any): Promise<PlumblineWrapper<T>>
```

**markup:**  DOM markup as it would appear in your application. <br/>
**testComponent:**  Reference to the main component that will be rendered. <br/>
**testModule:**  Mount and mock scheme describing how directives, modules and providers should be rendered. <br/>
**options:**  Additional options for render (e.g. bindings).

The testModule use "mountModule" and "mockModule" parameters to optimize the render process.  "mountModule" will shallow render processes associated with that component.  "mockModule" will mock a component with empty methods and variable.  This is done to save on computation and render time.

```javascript
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
```


PlumblineWrapper Methods
---------

#### .find(selector)
*@input selector takes CSS*  <br/>
*@return PlumblineWrapper[]*

Gets a list of descendants from the current PlumblineWrapper reference filtered by a selector.


#### .element()
*@return NativeNode of element*

Gets the native element of the current PlumblineWrapper reference.


#### .parent()
*@return PlumblineWrapper*

Gets the parent node of the current PlumblineWrapper reference.


#### .instance(component?)
*@input selector takes component class reference*  <br/>
*@return instance of component*

Gets the injected instance of the current PlumblineWrapper reference.


#### .update()
*@return Promise of current PlumblineWrapper*

Runs ngOnChanges, detectChanges and whenStable for changes in Angular.  You may also use await on this method to keep your process stack in sync.


Specific Examples
---------

For many more examples of mount and testing schemes, you can review the specs of the github project.  There I have written out many unit tests that actually show the capabilities of the package.

An Angular component can be mounted simply by providing raw markup and its class reference.

```javascript
import {
    Component,
    Input,
    OnChanges,
    OnInit
} from '@angular/core';
import {mount} from './mount';

describe('Mount', () => {
    @Component({
        selector: 'simple-component',
        template: '<h1>This is Simple</h1>'
    })
    class SimpleComponent {}

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
    });
});
```

In addition, raw markup can include dynamic bindings passed in via the 4th parameter of mount.

```javascript
describe('Mount', () => {
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

    describe('Simple Component', () => {
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
    });
});
```

An example of mixed mocking and mounting.

```javascript
describe('Mixed Mount and Mock', () => {
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
```


