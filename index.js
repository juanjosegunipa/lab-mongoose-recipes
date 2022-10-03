const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Pabellon",
      level: "Anyone",
      ingredients: [
        "Rice",
        "beef",
        "black beans"
      ],
      cuisine: "Venezuelan",
      dishType: "main_course",
      duration: 50,
      creator: "a Venezuelan guy"
    })
      .then(created => {
        console.log(created.title)
        return Recipe.insertMany(data)
          .then((created) => {
            console.log(created)
            return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
              .then((recipe) => {
                console.log('Rigatoni alla Genovese was updated')
                return Recipe.deleteOne({ title: "Carrot Cake" })
                  .then(() => {
                    console.log('Carrot Cake was deleted')
                  })
              })
          })
      })
      .catch(err => console.log(err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
