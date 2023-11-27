"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_Todo_List = exports.get_Todo_List = void 0;
let myList = [];
let get_Todo_List = (req, res, next) => {
    console.log("req came");
    res.json(myList);
};
exports.get_Todo_List = get_Todo_List;
let post_Todo_List = (req, res, next) => {
    myList.push({
        id: +(new Date()),
        task: req.body.task
    });
    console.log(req.body.task);
    res.json(myList);
};
exports.post_Todo_List = post_Todo_List;
