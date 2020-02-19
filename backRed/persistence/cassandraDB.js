const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
    contactPoints: ['192.168.43.246:3005'],
    localDataCenter: 'datacenter1',
    keyspace: 'soundartdb'
});

const createDB = `CREATE TABLE publications(
    id varchar, 
    title TEXT, 
    description TEXT, 
    link_Sound TEXT,
    nickname_author TEXT,
    date TIMESTAMP,
    countLikes INT,
    PRIMARY KEY(id)
)`

exports.createTable = function () {
    client.execute(createDB)
    .then((results)=> {
        console.log('Tablas creadas correctamente')
    }).catch((error) => {
        console.log('Fallo en la creacion de tablas ' , error.message)
    });    
}
/*
Obtener publicaciones de base de datos
*/
exports.getPublications = function (req, res) {
    const query = 'SELECT * FROM publications;'
    console.log(query);
    
    client.execute(query, (err, results) => {
        if(err){
            console.log('Error al obtener los datos de bd cassandra', err);
        }else {
            res.send(results.rows);
        }
    })
}

/**
 * AGREGA PUBLICACIONES A LA CASSANDRADB
 */
loadFeaturedPost = function(posts) {
    console.log(posts);
    const queryAdd = 'INSERT INTO PUBLICATIONS (id, title, description, link_Sound, nickname_author, date, countLikes) VALUES (?, ?, ?, ?, ?, ?, ?)'
    var queries = [];
    posts.forEach(element => {
        queries.push({query: queryAdd, params: [`${element._id}`, element.tittle, element.description, 
                        element.link_Sound, element.nicknameAutor, element.date, element.countLikes]})
    });

    console.log(queries);
    client.batch(queries, {prepare: true}, (err) => {
        if(err) {
            console.log(':(' , err);
        } else {
            console.log('Datos insertados correctamente');
        }
    })
}

exports.removeandSaveCassandraPubs = function (posts){
    const query = 'Truncate publications;';
    client.execute(query, [], (err, results) => {
        if(err) {
            console.log(err);
        }else{
            loadFeaturedPost(posts);
        }
    }) 
}

/**
 * Docker 
 * Iniciar contenedor 
 * docker run --name soundArtDB -d -p 127.0.0.1:3005:9042 cassandra:latest
 * 
 * Iniciar cliente cassandra
 * docker exec -it soundArtDB cqlsh
 * 
 * Crear base de datos 
 * create keyspace soundArtDB with replication = {'class':'SimpleStrategy','replication_factor':1}; 
 */