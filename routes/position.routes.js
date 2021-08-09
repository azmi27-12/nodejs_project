module.exports = app => {
  const position = require("../controllers/position.controller.js");

  const multer = require('multer');
  const path = require('path');
  


  const storage = multer.diskStorage({
    destination : './src/image/',
    filename : (req, file, cb)=>{
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },
    
  })
  
  const upload = multer({
    storage : storage
  })


  // Create a new position
  app.post("/position/insert", upload.single('photo'), position.create);

  // get all position
  app.get("/position/view", position.findAll);
 
  // get a single position with positionId
  app.get("/position/view/:positionId", position.findOne);

  // Update a position with positionId
  app.put("/position/update/:positionId", upload.single('photo'), position.update);

  // Delete a position with positionId
  app.delete("/position/remove/:positionId", position.delete);

  // delete all position
  app.delete("/position/removeall", position.deleteAll);
};
