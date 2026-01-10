let user={
    name:"rj",
    number:9654321,
    amount:4000,
    greeting:function(){
        console.log(`hello from my side to Mr.${this.name}`);
    }

}
console.log(user)
console.log(user.name)
user.name="rishu";
console.log(user)
user.adhar=2345679;
console.log(user);

delete user.adhar;
console.log(user)
// this is used to delete any particular property of any object


console.log(Object.keys(user))
// this is used to get the names of keys of any object
console.log(Object.values(user))
console.log(Object.entries(user))

for(let key in user){
    console.log(key,user[key])
}

const {name,number}=user;
console.log(name+","+number); //this is destructing used to create variables from object outside

for(let keys of Object.keys(user)){
    console.log(keys);
}
for(let keys of Object.entries(user)){
    console.log(keys);
}

// this method of for of loop is preffered instead of for in loop while traversing any object
user.greeting();

// this keyword is used when we want to use one property in multiple objects but as their own


const user2={...user}; // here we used spread operator which is used to create a seprate copy. so if we make any change in user 2 it will not change user 1
// this creates a shallow copy means one level is copied but nested ones will be changed both by doing only one;


user2.name="king";
console.log(user);
console.log(user2);
delete user2.greeting;
const user3=structuredClone(user2);
user3.name="hello";
console.log(user3);