
import { initMongoose } from "../../lib/mongoose";
import Product from '../../models/Product'

const handle = async (request: Request, response: Response) =>{
    await initMongoose();
    const data = await Product.find().exec();
    response.json(data);
}

export default handle;