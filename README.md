Angular Admin
=============



A simple admin tool to edit data from a restful service.


To get started, you must create a settings.js file in the root directory with a description of your database, and database settings (copy settings.sample.js and replace with your values).


### REST service description

The rest service should provide with the following calls:

* /architecture : 
 
```
{
  tableslug:{
    title: "Table Title",
    tableName: "sometable",
    rows: {
      id: {
        title: "ID"
      }
    }
  }
}
```


### Credits


This project was brought to you by [Samuel Delesque](http://samueldelesque.me).
