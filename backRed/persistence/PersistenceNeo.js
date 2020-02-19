const neo4j = require('neo4j-driver');

// Create Driver
const driver = new neo4j.driver("bolt://localhost:7687",
    neo4j.auth.basic('Prueba', 'a123'));

const session = driver.session();

exports.createPerson = (id_person, nickname, firstName, lastName, email) => {
    session.run(`CREATE (a:Person {id_person: $id, nickname: $nickname, firstName: $firstName, lastName: $lastName, email: $email})
                            RETURN a`,
        {id: id_person, nickname: nickname, firstName: firstName, lastName: lastName, email: email})
        .then(result => {
            console.log(result.records);
        }).catch(err => {
        console.log(err);
    });
};

exports.updatePerson = (id_person, firstName, lastName, email) => {
    session.run(`MATCH (a:Person {id_person: $id})
                        SET a.firstName = $firstName, a.lastName = $lastName, a.email = $email
                        RETURN a`,
        {id: id_person, firstName: firstName, lastName: lastName, email: email})
        .then(result => {
            console.log(result.records);
        }).catch(err => {
        console.log(err);
    });
};

exports.followPerson = (id_person, id_follow, knowDate, likes) => {
    session.run(`MATCH (a:Person {id_person: $id_person}), (b:Person {id_person: $id_follow})
                        CREATE (a)-[f:Follow {knowDate: $knowDate, likes: $likes}]->(b)
                        RETURN f`,
        {id_person: id_person, id_follow: id_follow, knowDate: knowDate, likes: likes})
        .then(result => {
            console.log(result.records);
        }).catch(err => {
        console.log(err);
    });
};

exports.unfollowPerson = (idPerson, idFollowPerson) => {
    session.run(`MATCH (:Person {id_person: $id_person})-[r:Follow]->(:Person {id_person: $id_follow})
                        DELETE r`,
        {id_person: idPerson, id_follow: idFollowPerson})
        .then(result => {
            console.log(result.records);
        }).catch(err => {
        console.log(err);
    });
};

exports.personsFollow = (id) => {
    session.run(`MATCH (a:Person {id_person: $id})-->(persons:Person)
                        RETURN persons`,
        {id: id})
        .then(result => {
            console.log(result.records);
        }).catch(err => {
        console.log(err);
    });
};

exports.deletePerson = (id) => {
    session.run(`MATCH (a:Person {id_person: $id})
                        DETACH DELETE a`,
        {id: id})
        .then(result => {
            console.log(result.records);
        }).catch(err => {
        console.log(err);
    });
};