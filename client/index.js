// import { createClient } from 'redis';
require('dotenv').config()
let Redis = require("redis");

const client = Redis.createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASS}@127.0.0.1:6379`
  });

client.on('error', err => console.log('Redis Client Error', err));
async function run() {
    await client.connect();
    await client.set('test', 'valuez');
    const value = await client.get('test');  
    console.log("logging value:");
    console.log(value);

    await client.hSet('user-session:234', {
        name: 'Chevalia',
        surname: 'Tleilaxu',
        company: 'Torties Corps',
        age: 4
    })
    
    let userSession = await client.hGetAll('user-session:234');
    console.log(JSON.stringify(userSession, null, 2));
    // console.log(client);
}

run();