// Require the Fastify framework and instantiate it
const fastify = require("fastify")();

const { students, addToStudents, getStudentById, getStudents }=require("./lab-modules")
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax
fastify.get("/cit/student", (request, reply) => {

  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(getStudents());
});
fastify.post("/cit/student", (request, reply) => {
    console.log(request.body);
    const {first, last} =request.body
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(addToStudents(first, last));
});
// Start server and listen to requests using Fastify

fastify.get("/cit/student/:id", (request, reply) => {
    console.log(request.params)
const {id}= request.params
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(getStudentById(id));
  });
  fastify.get("*", (request, reply) => {
    reply
      .code(401)
      .header("Content-Type", "text/text; charset=utf-8")
      .send("<h1>route not found</h1>");
  });
  const listenIP = "localhost";
  const listenPort = 8080;
  fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });
