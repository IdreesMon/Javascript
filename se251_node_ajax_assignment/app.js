//SERVER


const express = require(`express`)
const app = express()
const fs = require(`fs`);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.get('/favicon.ico', (req, res) => res.status(204));

const readFile = (path)=>{
  return new Promise(
    (resolve, reject)=>
    {
      fs.readFile(path, `utf8`, (err, data) => {
        if (err) {
         reject(err)
        }
        else
        {
          resolve(data)
        }
      });
    })
}


app.get(`/add`, (req, res)=>{
  const filePath = path.join(__dirname, `public`, `testform.html`)
  res.sendFile(filePath);
})

app.get('/jeep', async (req, res) => { //grabs testform.html and sends it to the client
  var data = await readFile(`./data/jeep.json`);
  res.send(JSON.parse(data));
  });

app.post('/jeep', async (req, res) => { //sort then splice out the one with the correct index number, stringy then rewrite it 
    var oldData =  await readFile(`./data/jeep.json`)
    var newData =  await JSON.parse(oldData)
    newData.push(req.body)
    const jsonString = JSON.stringify(newData);
    await fs.writeFile('./data/jeep.json', jsonString, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
    });
    res.send(jsonString);
});

app.post('/delete', async (req, res) => {
  try {
      // Read in the current data
      var oldData = await readFile('./data/jeep.json');
      var newData = await JSON.parse(oldData);

      // The index to delete comes from req.body.index
      const indexToDelete = req.body.index;

      // Check if the index is valid
      if (indexToDelete >= 0 && indexToDelete < newData.length) {
          // Remove the item at the specified index
          newData.splice(indexToDelete, 1);

          // Write the updated data back to the file
          const jsonString = JSON.stringify(newData);
          await fs.writeFile('./data/jeep.json', jsonString, (err) => {
              if (err) {
                  console.log('Error writing file', err);
              } else {
                  console.log('Successfully updated file');
              }
          });

          // Send back success response
          res.status(200).send(jsonString);
      } else {
          res.status(400).send({ error: 'Invalid index' });
      }
  } catch (err) {
      console.error('Error in /delete route', err);
      res.status(500).send({ error: 'Server error' });
  }
});

//Start up the server on port 3000.
var port = process.env.PORT || 80
app.listen(port, ()=>{
    console.log("Server Running at Localhost:80")
})