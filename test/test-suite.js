const test = {
  info: {
    name: 'rester-test-suite',
  },
  item: [
    {
      name: 'Login User',
      request: {
        method: 'POST',
        header: [
          {
            key: 'Content-Type',
            name: 'Content-Type',
            value: 'application/json',
            type: 'text'
          }
        ],
        body: {
          mode: 'raw',
          raw: '{\n\t"email": "nobody@nowhere.net",\n\t"password": "0123456789abcdef"\n}'
        },
        url: {
          raw: 'http://localhost:3369/user/login',
          protocol: 'http',
          host: [
            'localhost'
          ],
          port: '3369',
          path: [
            'user',
            'login'
          ]
        }
      },
      response: []
    },
    {
      name: 'Create Records',
      request: {
        method: 'POST',
        header: [
          {
            key: 'Content-Type',
            name: 'Content-Type',
            value: 'application/json',
            type: 'text'
          },
          {
            key: 'x-access-token',
            value: '',
            type: 'text'
          }
        ],
        body: {
          mode: 'raw',
          raw: '{\n\t"books": [{\n        "title": "Harry Potter",\n        "author": "JK Rowling",\n        "rating": 5,\n        "synopsis": "A young boy locked under some stairs escapes to a fake reality full of wizards.",\n        "numPages": 500,\n        "pubDate": "Wed Nov 07 2018 15:43:54 GMT-0700 (Mountain Standard Time)",\n        "cover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADSCAMAAABThmYtAAAAXVB"\n    },{\n        "title": "Harry Potter 2",\n        "author": "JK Rowling",\n        "rating": 5,\n        "synopsis": "A young boy locked under some stairs escapes to a fake reality full of wizards.",\n        "numPages": 500,\n        "pubDate": "Wed Nov 07 2018 15:43:54 GMT-0700 (Mountain Standard Time)",\n        "cover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADSCAMAAABThmYtAAAAXVB"\n    },\n    {\n        "title": "Harry Potter 3",\n        "author": "JK Rowling",\n        "rating": 5,\n        "synopsis": "A young boy locked under some stairs escapes to a fake reality full of wizards.",\n        "numPages": 500,\n        "pubDate": "Wed Nov 07 2018 15:43:54 GMT-0700 (Mountain Standard Time)",\n        "cover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADSCAMAAABThmYtAAAAXVB"\n    },\n    {\n        "title": "Harry Potter 4",\n        "author": "JK Rowling",\n        "rating": 5,\n        "synopsis": "A young boy locked under some stairs escapes to a fake reality full of wizards.",\n        "numPages": 500,\n        "pubDate": "Wed Nov 07 2018 15:43:54 GMT-0700 (Mountain Standard Time)",\n        "cover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADSCAMAAABThmYtAAAAXVB"\n    },\n    {\n        "title": "Cujo",\n        "author": "Stephen King",\n        "rating": 5,\n        "synopsis": "Beethoven gets rabies.",\n        "numPages": 250,\n        "pubDate": "Wed Nov 07 2018 15:43:54 GMT-0700 (Mountain Standard Time)",\n        "cover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADSCAMAAABThmYtAAAAXVB"\n    }]\n}'
        },
        url: {
          raw: 'http://localhost:3369/create/',
          protocol: 'http',
          host: [
            'localhost'
          ],
          port: '3369',
          path: [
            'create',
            ''
          ]
        }
      },
      response: []
    },
    {
      name: 'Retrieve All Records',
      request: {
        method: 'GET',
        header: [
          {
            key: 'x-access-token',
            value: '',
            type: 'text'
          },
          {
            key: 'Content-Type',
            value: 'application/json',
            type: 'text'
          }
        ],
        url: {
          raw: 'http://localhost:3369/',
          protocol: 'http',
          host: [
            'localhost'
          ],
          port: '3369',
          path: [],
          query: [],
          variable: []
        }
      },
      response: []
    },
    {
      name: 'Retrieve N Records',
      request: {
        method: 'GET',
        header: [
          {
            key: 'x-access-token',
            value: '',
            type: 'text'
          },
          {
            key: 'Content-Type',
            value: 'application/json',
            type: 'text'
          }
        ],
        url: {
          raw: 'http://localhost:3369/:numResults/',
          protocol: 'http',
          host: [
            'localhost'
          ],
          port: '3369',
          path: [
            ':numResults',
            ''
          ],
          query: [],
          variable: [
            {
              key: 'numResults',
              value: '10'
            }
          ]
        }
      },
      response: []
    },
    {
      name: 'Search for Records',
      request: {
        method: 'GET',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json',
            description: 'x',
            type: 'text'
          },
          {
            key: 'x-access-token',
            value: '',
            type: 'text'
          }
        ],
        url: {
          raw: 'http://localhost:3369/search?title=Harry',
          protocol: 'http',
          host: [
            'localhost'
          ],
          port: '3369',
          path: [
            'search'
          ],
          query: [
            {
              key: 'title',
              value: 'Harry'
            }
          ]
        }
      },
      response: []
    },
    {
      name: 'Update Record',
      request: {
        method: 'PUT',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json',
            type: 'text'
          },
          {
            key: 'x-access-token',
            value: '',
            type: 'text'
          }
        ],
        body: {
          mode: 'raw',
          raw: '{\n\t"title": "taco saladddd",\n\t"author": "Martha",\n\t"rating": "5",\n\t"synopsis": "GOOD BOOK",\n\t"numPages": "300",\n\t"pubDate": "02-22-1994",\n\t"cover": ""\n}'
        },
        url: {
          raw: 'http://localhost:3369/update/:id',
          protocol: 'http',
          host: [
            'localhost'
          ],
          port: '3369',
          path: [
            'update',
            ':id'
          ],
          variable: [
            {
              key: 'id',
              value: 'L1SEzUhTQ3WNPyKMO1vA'
            }
          ]
        }
      },
      response: []
    },
    {
      name: 'Delete Record',
      request: {
        method: 'DELETE',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json',
            type: 'text'
          },
          {
            key: 'x-access-token',
            value: '',
            type: 'text'
          }
        ],
        url: {
          raw: 'http://localhost:3369/delete/:id',
          protocol: 'http',
          host: [
            'localhost'
          ],
          port: '3369',
          path: [
            'delete',
            ':id'
          ],
          query: [],
          variable: [
            {
              key: 'id',
              value: 'uLAkVuFVWvLN1OGp21RQ'
            }
          ]
        }
      },
      response: []
    },
    {
      name: 'Logout User',
      protocolProfileBehavior: {
        disableBodyPruning: true
      },
      request: {
        method: 'GET',
        header: [
          {
            key: 'Content-Type',
            name: 'Content-Type',
            type: 'text',
            value: 'application/json'
          }
        ],
        body: {
          mode: 'raw',
          raw: '{}'
        },
        url: {
          raw: 'http://localhost:3369/user/logout',
          protocol: 'http',
          host: [
            'localhost'
          ],
          port: '3369',
          path: [
            'user',
            'logout'
          ]
        }
      },
      response: []
    }
  ]
};

module.exports = test;