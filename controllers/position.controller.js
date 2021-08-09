const Position = require("../models/position.model.js");

// Create and Save a new position
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Can not be empty!"
    });
  }

  // Create a position
  const position = new Position({
    city: req.body.city,
    cap: req.body.cap,
    photo: req.file.filename,
   });

  // Save position in the database
  Position.create(position, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while insert position."
      });
    else res.send(data);
  });
};

// Request all position from the database.
exports.findAll = (req, res) => {
  Position.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving position."
      });
    else res.send(data);
  });
};

// Find a single position with a positionId
exports.findOne = (req, res) => {
  Position.findById(req.params.positionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found position with id: ${req.params.positionId}.`
        });
      } else {
        res.status(500).send({
          message: "Error get position with id " + req.params.positionId
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Update a position by the positionId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

    Position.findByIdImage(req.params.positionId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found position with id: ${req.params.positionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error get position with id " + req.params.positionId
          });
        }
      }
    });

  
  Position.updateById(req.params.positionId,new Position({ 
      city: req.body.city,
      cap: req.body.cap,
      photo: req.file.filename
          }), (err, data) => 
      {

      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found position with id ${req.params.positionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating position with id " + req.params.positionId
          });
        }
      } else {
        res.send(data)
    };
    }
  );
};

// Delete all positions from the database.
exports.deleteAll = (req, res) => {
  Position.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all positions."
      });
    else res.send({ message: `All positions were deleted successfully!` });
  });
};

// Delete a position with the positionId in the request
exports.delete = (req, res) => {
  Position.remove(req.params.positionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found position with id ${req.params.positionId}.`
        });
      } else {
        res.status(500).send({
          message: "Not delete position with id " + req.params.positionId
        });
      }
    } else res.send({ message: `position was deleted successfully!` });
  });
};


