"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShallowWrapper_1 = require("./ShallowWrapper");
function shallow(node, testComponent, testModule, options) {
    return (new ShallowWrapper_1.ShallowWrapper()).create(node, testComponent, testModule, options).render();
}
exports.shallow = shallow;
