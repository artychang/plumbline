'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
class Rendering {
    constructor(tester, fixture, bindings) {
        this.tester = tester;
        this.fixture = fixture;
        // Find the element in the markup
        if (this.fixture.componentInstance instanceof this.tester.testComponent) {
            this.element = this.fixture.debugElement;
        }
        else {
            this.element = this.fixture.debugElement.query(platform_browser_1.By.directive(this.tester.testComponent));
        }
        // Throw an error if the element was not found
        if (!this.element) {
            throw new Error(this.tester.testComponent.name + ' not found in html/template/markup');
        }
        this.instance = this.element.injector.get(this.tester.testComponent);
        this.bindings = bindings;
    }
}
exports.default = Rendering;
