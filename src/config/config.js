import {config} from 'dotenv';
config();



if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI is not defined in the environment variables');
}
if(!process.env.JWT_SECRET){
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

const _config ={

    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}

// const _config

export default Object.freeze(_config);//Object.freeze ye karta kya he ? makes the thing immutable, so that no one can change the value of the object. 