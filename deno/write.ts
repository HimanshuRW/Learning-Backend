let msg : string;

msg = "Hellow there";

console.log(msg);

let encoder = new TextEncoder() !;

let toWrite : string= encoder.encode("my hame is himanshu") !;

Deno.writeFile("myfile.txt", toWrite).then(()=>{
    console.log("ho gaya");
})