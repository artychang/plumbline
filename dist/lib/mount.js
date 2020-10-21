"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mount = void 0;
const PlumblineWrapper_1 = require("./PlumblineWrapper");
function mount(node, testComponent, testModule, options) {
    return (new PlumblineWrapper_1.PlumblineWrapper()).create(node, testComponent, testModule, options).render();
}
exports.mount = mount;
