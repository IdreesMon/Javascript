function doit()
{
    return new Promise((resolve, reject)=>{
        var bool = true
        if(bool == true) resolve(`This worked`)
        else reject(`You have an error`)

    })
}





// var myPromise = new Promise((resolve,reject)=>{
//     var bool = true
//     if(bool == true) resolve(`This worked`)
//     else reject(`You have an error`)
// })



// myPromise
//     .then((data)=>{console.log(data + `1`);return data})
//     .then((data)=>{console.log(data + `2`)})
//     .catch((data)=>{console.log(data)})

async function junk()
{
    var day = await doit()
    var newData = await (data)=>data +`1`
    console.log(data + `2`);
    

}

junk()