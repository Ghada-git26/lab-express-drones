const express = require("express");
const router = express.Router();
const Drone = require("../models/Drone.model");

// require the Drone model here
// get /drones then data from db then render .hbs file.
router.get("/drones", (req, res, next) => {
    // Iteration #2: List the drones
    Drone.find()
        // dbRes : response of drone database.
        .then((dbRes) => {
            res.render("drones/list.hbs", {
                drones: dbRes,
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

// get /drones/create then render /drones/create-forms.hbs
router.get("/drones/create", (req, res, next) => {
    // Iteration #3: Add a new drone
    res.render("drones/create-form.hbs");
});

router.post("/drones/create", (req, res, next) => {
    console.log(req.body);
    Drone.create(req.body)
        .then((createdDrone) => {
            res.redirect("/drones");
        })
        .catch((error) => {
            console.log(error);
            res.redirect("/drones/create");
        });


});


router.get("/drones/:id/edit", (req, res, next) => {
    Drone.findById(req.params.id)
        .then((dbRes) => {
            res.render("drones/update-form.hbs", {
                drone: dbRes
            });
        })
        .catch((error) => {
            console.log(error);
        });

});

router.post("/drones/:id/edit", (req, res, next) => {
    // Iteration #4: Update the drone
    Drone.findByIdAndUpdate(req.params.id, req.body)
        .then((droneDocument) => {
            res.redirect("/drones/" + droneDocument._id);
        })
        .catch((error) => {
            console.log(error);
        });
});

router.post("/drones/:id/delete", (req, res, next) => {
    // Iteration #5: Delete the drone
    Drone.findByIdAndRemove(req.params.id)
        .then((rslt) => {
            console.log('aaaaaaaaaaaaaaaa' + rslt);
            res.redirect("/drones");
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;