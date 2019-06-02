import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import * as util from '../util'

interface Shop {
    name: String;
    location: String;
    type: String;
}

class ShopRouter {

    public router = express.Router()
    public shops: Map<String, Shop> = new Map()

    constructor() {
        this.shops.set("netto-stornord", {name: "Netto", location: "coordinates", type: "grocery-store"})
        this.shops.set("matkant", {name: "MatKant", location: "coordinates", type: "cafeteria"})
        this.init()
    }

    private init(): void {
        this.router.get('/', (req, res, next) => {
            res.json({"shops": util.strMapToObj(this.shops)})
        })
        this.router.get('/:id', (req,res,next) => {
            let id = req.params['id']
            if(this.shops.has(id)) {
                let shop = this.shops.get(id)
                 res.status(200).json(shop)
            }
            else res.status(404).send()
        })
        this.router.delete('/:id', (req, res, next) => {
            let id = req.params['id']
            let resu = this.shops.delete(id)
            if(resu) res.status(200).send()
            else res.status(404).send()
        })
        this.router.post('/',(req,res,next) => {
            let ob = req.body
            let id = ob['id']
            if(this.shops.has(id)) res.status(409).send()
            else { 
                this.shops.set(id, ob)
                res.status(201).send()
            }
        })
    }
}

export default new ShopRouter();