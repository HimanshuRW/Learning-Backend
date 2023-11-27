const port = 3000;

const handler = (req : Request) : Response =>{
    const body = `hey himanshu :  
    ${req.headers.get("user-agent") ?? "Unknown"} `;
    return new Response(body, {status : 200});
}

console.log("listening to post 3000...");

Deno.serve({port:port},handler);

golden temple 3rd- nomal,,,
bombsy se nizamudin... normal waiting.......
 ac premium tatkal --- night ...

rac...


