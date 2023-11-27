const http = require("http");

function reqListener(req,res){
    // --- handle request ----
    // console.log(req.url);
    // console.log(req.method);
    // console.log(req.headers);
    
    // ---- routing -----
    if (req.url=="/") {
        res.setHeader("Content-Type","text/html");
        res.write("<html>");
        res.write("<head><title>My Server</title></head>");
        res.write("<body><h1>My Server</h1></body>");
    res.write("</body>");
    res.write(`<form action="/msg" method="POST"><input type="text" name="userId"><input type="submit" value="Submit"></form>`);
    res.write("</html>");
    res.end();
    } 
    else if (req.url=="/msg" && req.method=="POST"){
        //  data in request comes in stream 
        let body = "";
        req.on("data",(chunk)=>{
            console.log("-------- chunk ---------");
            console.log(chunk.toString());
            body += chunk;
        });
        req.on("end",()=>{
            console.log("---- end ------");
            console.log(body);
        })
    }else {
        
    }

    // --- response object ----
    // res.setHeader("Content-Type","text/html");
    // res.write("<html>");
    // res.write("<head><title>My Server</title></head>");
    // res.write("<body><h1>My Server</h1></body>");
    // res.write("</html>");
    // res.end();
}

const server = http.createServer(reqListener);
server.listen(3000);