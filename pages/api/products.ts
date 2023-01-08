import { initMongoose } from "../../lib/mongoose";
import Product from '../../models/Product'

const handle = async (request: Request, response: Response) =>{
    await initMongoose();
    response.json(await Product.find().exec());
}

export default handle;