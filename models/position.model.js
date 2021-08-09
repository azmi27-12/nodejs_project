
const sql = require('../config/config.js')
const fs = require('fs');
const path = require('path');

// constructor
const Position = function(position) {
  this.city = position.city;
  this.cap = position.cap;
  this.photo = position.photo;
};

Position.create = (newPosition, result) => {
  sql.query("INSERT INTO position SET ?", newPosition, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("new position inserited: ", { id: res.insertId, ...newPosition });
    result(null, { id: res.insertId, ...newPosition });
  });
};

Position.findById = (positionId, result) => {
  sql.query("SELECT * FROM position WHERE id = ? ",positionId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found position: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found position with the id
    result({ kind: "not_found" }, null);
  });
};


Position.findByIdImage = (positionId, result) =>{
  sql.query(`SELECT photo FROM position WHERE id = ?`,positionId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

   if (res.length) {
    result(null, res[0]);
    let oldPhoto = res[0].photo;
    
    fs.unlink(`./src/image/${oldPhoto}`, (err) => {
    if (err) throw err;
    console.log('successfully deleted');
    });

    return;
    }

    // not found position with the id
    result({ kind: "not_found" }, null);
  });

}


Position.getAll = result => {
  sql.query("SELECT * FROM position", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("position: ", res);
    result(null, res);
  });
};

Position.updateById = (id, position, result) => {

  sql.query(
    "UPDATE position SET city = ?, cap = ?, photo = ? WHERE id = ?",
    [position.city, position.cap, position.photo, id],
    

    (err, res) => {
   
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found position with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated position: ", { id: id, ...position });
      result(null, { id: id, ...position });

    
    }
  );
};


Position.remove = (id, result) => {

 sql.query(`SELECT photo FROM position WHERE id = ?`,id, (err,res)=>{
   if(err){
     console.log("error: ", err);
   }
   if (res.length) {
    result(null, res[0]);
    let oldPhoto = res[0].photo;
    
  
    fs.unlink(`./src/image/${oldPhoto}`, (err) => {
    if (err) throw err;
    console.log('successfully deleted');
    });

    
    }
 })
  
  sql.query("DELETE FROM position WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found position with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted position with id: ", id);
    //result(null, res);
  });
};

Position.removeAll = result => {
  sql.query("DELETE FROM position", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} position`);
    result(null, res);
  });
  
  //Delete image from folder
  fs.readdir('./src/image', (err , files)=>{
    if(err) throw err;
    for(const file of files){
      fs.unlink(path.join('./src/image',file), err =>{
        if(err) throw err;
      })
    }
  })

};

module.exports = Position;
