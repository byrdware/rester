# Rester

REST API Test Runner

[![NPM Version](https://badge.fury.io/js/%40byrdware%2Frester.svg)](https://www.npmjs.com/package/@byrdware/rester)
[![Build Status](https://travis-ci.org/byrdware/rester.svg?branch=master)](https://travis-ci.org/byrdware/rester)
[![Coverage Status](https://coveralls.io/repos/github/byrdware/rester/badge.svg?branch=master)](https://coveralls.io/github/byrdware/rester?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

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

Initially the format of this configuration file is simply a postman export
file. I am currently reviewing Insomnia export files and planning support in
a future release, pull requests are welcome.

## Installation

  `npm install @byrdware/rester`

## Usage

    $ rester postman ./test/test-suite.js
    
      Login User
        √ POST http://localhost:3369/user/login
      Create Records
        √ POST http://localhost:3369/create/
      Retrieve All Records
        √ GET http://localhost:3369/
      Retrieve N Records
        √ GET http://localhost:3369/10/
      Search for Records
        √ GET http://localhost:3369/search
      Update Record
        √ PUT http://localhost:3369/update/L1SEzUhTQ3WNPyKMO1vA
      Delete Record
        √ DELETE http://localhost:3369/delete/uLAkVuFVWvLN1OGp21RQ
      Logout User
        √ GET http://localhost:3369/user/logout

      Tests complete
        8 passing (61 ms)

## Command Line Options

The CLI is further configured with the following command line options:

    Usage: rester [options] [command]

    General Options:
      -V, --version             Output the version number
      -h, --help                Output usage information

    Commands:
      postman [options] <file>  Send test items from a postman export file

    Postman Options:
      -t, --test <name>         Send only named test

## File Format

This tools supports a file format with a minimal subset of the schema
described here:

[https://schema.getpostman.com/json/collection/v2.1.0/collection.json](https://schema.getpostman.com/json/collection/v2.1.0/collection.json)


## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
