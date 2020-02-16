var body_parser = require('body-parser');
var db = require('../persistence/db');
var clientCassandra = require('../persistence/cassandraDB')
exports.assignRoutes = function(app) {
    app.use(body_parser.urlencoded({ extended: true }));

    //REALIZA LA CONEXION Y LA INSERCION DE DATOS EN MONGO 
    //db.connectDB();

    ///// Inicia conexion base de datos cassandra
    clientCassandra.createTable()
    db.getFeaturedPost(3, (result)=>{
        clientCassandra.loadFeaturedPost(result);
    });
    
   // clientCassandra.loadFeaturedPost(db.getFeaturedPost(3));

    //*************SOLICITUDES GET******************
    app.get('/person', db.getperson);
    app.post('/person', db.postPerson);
    app.delete('/person/:id_person', db.removePerson);
    app.put('/person', db.UpdatePerson);
    app.get('/meetPersons', db.getMeetPersons);
    app.post('/login', db.login);

    app.get('/publications', db.getpublications);
    app.post('/publications', db.postPublications);
    app.get('/namePublications', db.getpublicationsName);
    /*   
        app.get('/blogs', db.getblogs);
        app.get('/comments', db.getcomments);
      
     
        //*************SOLICITUDES POST******************
        app.post('/blogs', db.postBlogs);
        app.post('/comments', db.postComments);
      
    
        //*************SOLICITUDES REMOVE******************
        app.delete('/blogs/:id_blog', db.removeBlogs);
        app.delete('/comments', db.removeComments);
        app.delete('/publications/:id_publication', db.removePublications);
    
        //*************SOLICITUDES REMOVE******************
        app.put('/blogs', db.UpdateBlogs);
        app.put('/comments', db.UpdateComments);
        app.put('/publications', db.UpdatePublications);
        */
}