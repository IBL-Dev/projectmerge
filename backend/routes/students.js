const router = require("express").Router();
let Student = require("../models/Student");

// Add a new student
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;

  const newStudent = new Student({
    name,
    age,
    gender,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error adding student", error: err.message });
    });
});

// Get all students
router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error fetching students", error: err.message });
    });
});

// Update a student by ID
router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { name, age, gender } = req.body;

  const updateStudent = {
    name,
    age,
    gender,
  };

  try {
    const updatedStudent = await Student.findByIdAndUpdate(userId, updateStudent, { new: true });
    res.status(200).send({ status: "User updated", user: updatedStudent });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error updating data", error: err.message });
  }
});

// Delete a student by ID
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;
  try {
    await Student.findByIdAndDelete(userId);
    res.status(200).send({ status: "User deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error deleting user", error: err.message });
  }
});

// Get a single student by ID
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  try {
    const user = await Student.findById(userId);
    res.status(200).send({ status: "User fetched", user: user });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error fetching user", error: err.message });
  }
});

module.exports = router;