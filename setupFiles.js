// Make Enzyme functions available in all test files without importing
//Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.

// const { shallow, render, mount } = require('enzyme');
import {shallow, render, mount }  from 'enzyme';
import Sinon from 'sinon';
import { expect }  from 'chai';
import React from 'react';
import chai from 'chai';
import chaihttp from 'chai-http';

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;
global.sinon = Sinon;
global.chai = chai;
global.expect = expect;
global.chaihttp = chaihttp;


const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);


// Skip createElement warnings but fail tests on any other warning
console.error = message => {
    if (!/(React.createElement: type should not be null)/.test(message)) {
        throw new Error(message);
    }
};
