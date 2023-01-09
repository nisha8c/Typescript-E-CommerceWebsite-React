import type { NextApiRequest, NextApiResponse } from 'next'
import { initMongoose } from "../../lib/mongoose";
import Product from '../../models/Product'

const handle = async (_request: NextApiRequest, response: NextApiResponse) =>{
    await initMongoose();
    const data = await Product.find().exec();
    response.status(200).json(data);
}

export default handle;

