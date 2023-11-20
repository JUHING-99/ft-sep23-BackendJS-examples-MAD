const supertest = require("supertest");
const server = require("../server");  // importa módulo servidor
const mongoose = require("../config/db_mongo"); // lanza la bbdd
const request = supertest(server);// lanza servidor

//beforeAll
//beforeEach
//afterEach

afterAll(async () => {
  await server.close();
  await mongoose.connection.close();
});

it("Probando jest", () => {
  expect(1).toBe(1);
});

describe("GET all products", () => {
  it("gets the test endpoint /", async () => {
    await request
            .get("/api/products")
            .expect(200);
  });
  //...
  //otros tests GET /
  //...
});

describe("GET one product", () => {
  it("dame un producto en concreto", async () => {
    const response = await request
                          .get("/api/products/999")
                          .expect(200);
    expect(response.body).not.toEqual({});
  });

  it("dame un producto que no exista", async () => {
    const response = await request
      .get("/api/products/-1") // Devuelve {}?
      .expect(200)
    // 3 Maneras de hacer lo mismo
    expect(response.body).toEqual({});
    expect(response.res.text).toBe("{}");
    expect(response.body).toEqual(expect.objectContaining({}));
  })

  it("busca un producto pasando un string", async () => {
    const response = await request
      .get("/api/products/tortilla") // Devuelve {}?
      .expect(400)
    // INCOMPLETO
    // Comprobar que devuelve clave msj con el error (pendiente alumnos!){msj:"ERROR:....."}
    //expect(response.body).toEqual({});
  })

});

describe("POST one product", () => {
    it("Se envia un producto", (done) => {
      request
        .post("/api/products?API_KEY=123abc")
        .send({
          id: 998,
          title: "Cervezas Tardeo TB",
          price: 0,
          description: "vente de tarde y conoce a DS,FS,CYB,DevOps,UXUI,MKT",
          image: "https://i.pravatar.jpg",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
});