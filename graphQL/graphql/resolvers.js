module.exports = {
    createUser: async function(args,req){
        const emmail = args.userInput.email;
        // ... logic...
        return {
            _id : "id by mongoose",
            name : "Himanshu",
            email : "him@gmil.com",
            password : "pass",
            status : "nope",
            post : []
        }
    }
}