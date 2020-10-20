'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const common_1 = require("@angular/common");
const Renderer_1 = require("./models/Renderer");
const Tester_1 = require("./models/Tester");
class PlumblineRenderer {
    constructor(testComponent, testModule) {
        this.neverMock = [common_1.CommonModule, platform_browser_1.BrowserModule];
        this.tester = new Tester_1.Tester(testComponent, testModule);
        this.tester.dontMock.push(...this.neverMock);
    }
    render(html, renderOptions) {
        let renderer = new Renderer_1.default(this.tester);
        return renderer.render(html, renderOptions);
    }
}
exports.default = PlumblineRenderer;
