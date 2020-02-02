const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
    contactPoints: ['localhost:3005'],
    localDataCenter: 'datacenter1',
    keyspace: 'soundartdb'
});

const createDB = `CREATE TABLE publications(
    id_publication BIGINT, 
    title TEXT, 
    description TEXT, 
    likes_list list<TEXT>,
    nickname_author TEXT,
    PRIMARY KEY(id_publication)
)`

exports.createTable = function () {
    client.execute(createDB)
    .then((results)=> {
        console.log('Tablas creadas correctamente')
    }).catch((error) => {
        console.log('Fallo en la creacion de tablas ' , error.message)
    });    
}


/**
 * Docker 
 * Iniciar contenedor 
 * docker run --name sounArtDB -d -p 127.0.0.1:3005:9042 cassandra:latest
 * 
 * Iniciar cliente cassandra
 * docker exec -it soundArtDB cqlsh
 * 
 * Crear base de datos 
 * create keyspace soundArtDB with replication = {'class':'SimpleStrategy','replication_factor':1}; 
 */