# Rester

REST API Test Runner

[![NPM Version](https://badge.fury.io/js/%40byrdware%2Frester.svg)](https://www.npmjs.com/package/@byrdware/rester)
[![Build Status](https://travis-ci.org/byrdware/rester.svg?branch=master)](https://travis-ci.org/byrdware/rester)
[![Coverage Status](https://coveralls.io/repos/github/byrdware/rester/badge.svg?branch=master)](https://coveralls.io/github/byrdware/rester?branch=master)

## Synopsis

An experimental REST API test runner that consumes a postman export file (in
JSON or JavaScript format), then runs each and every test item in the file in
sequential order, or optionally, a single, named item from the test.

## Motivation

Testing REST API's and microservices is tedious and time-consuming. Perhaps a
more thorough search is required, but no good tools have been found to easily
and quickly automate a test script for checking and validating an API while
under development. This project is an attempt to solve this problem by
providing a simple tool, driven by an easily configured JSON/JavaScript file.

## Installation

  `npm install @byrdware/rester`

## Usage

    $ rester postman [-t 'Item Name'] ./rest/test-suite.json
  
## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## License

A short snippet describing the license (MIT, Apache, etc.)