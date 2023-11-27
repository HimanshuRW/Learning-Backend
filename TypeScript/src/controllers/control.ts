let myList: { id : number, task : string}[] = [];

let get_Todo_List = (req: any,res: any,next: any)=>{
    console.log("req came");
    res.json(myList);
}

let post_Todo_List = (req:any,res:any,next:any)=>{
    myList.push({
        id : +(new Date()),
        task : req.body.task
    })
    console.log(req.body.task);
    res.json(myList);
}

export {get_Todo_List,post_Todo_List};