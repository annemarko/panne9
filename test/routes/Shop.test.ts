import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import Shop from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

const route = "/shop/";

describe('shopRoute', () => {

  it('should be json', () => {
    return chai.request(Shop).get(route)
      .then(res => {
        expect(res.type).to.eql('application/json');
      });
  });

  it('should list shops', () => {
    let response = {
      "shops": {
        "matkant": {
          name: "MatKant",
          location: "coordinates",
          type: "cafeteria",
        },
        "netto-stornord" : {
          name: "Netto",
          location: "coordinates",
          type: "grocery-store",
        }
      }
    };
    return chai.request(Shop).get(route)
      .then(res => {
        expect(res.body).to.eql(response);
      });
  });
  it('should be possible to delete shop', () => {
    let response = {
      "shops": {
        "netto-stornord" : {
          name: "Netto",
          location: "coordinates",
          type: "grocery-store",
        }
      }
    };
    chai.request(Shop).del(route +'matkant')
      .then(res => {
        expect(res).to.have.status(200)
        chai.request(Shop).get(route).then(res => {expect(res.body).to.eql(response)})
    })
  })
  it('should not be possible to delete shop that isnt there', () => {
    return chai.request(Shop).del(route +'bla').then(res => {expect(res).to.have.status(404)})
  })
  it('should add shop', () => {
    let response = {
      "shops": {
        "matkant": {
          name: "MatKant",
          location: "coordinates",
          type: "cafeteria",
        },
        "netto-stornord" : {
          name: "Netto",
          location: "coordinates",
          type: "grocery-store",
        },
        "rema-trøjborg": {
          name: "Rema",
          location: "coordinates",
          type: "grocery-store",
        }
      }
    };
    chai.request(Shop).post(route).send({
      id: "rema-trøjborg",
      name: "Rema",
      location: "coordinates",
      type: "grocery-store",
    }).then(res => {expect(res).to.have.status(201)
      chai.request(Shop).get(route).then(res => expect(res.body).to.eql(response))
    })
  })
  it('should not be possible to add a store that is already there', () => {
    return chai.request(Shop).post(route).send({
      id: "rema-trøjborg",
      name: "Rema",
      location: "coordinates",
      type: "grocery-store",
    }).then(res => expect(res).to.have.status(409))
  })
  it('should get one shop with id', () => {
    let response = {
      name: "Netto",
      location: "coordinates",
      type: "grocery-store",
      } 
    return chai.request(Shop).get(route +'/netto-stornord').then(res => expect(res.body).to.eql(response))
  })
  it('should not fail if the shop does not exists', () => {
    return chai.request(Shop).get(route +'/bla').then(res => expect(res).to.have.status(404))
  })
});

