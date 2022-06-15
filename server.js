const express = require("express");
const app = express();
const path = require("path");
const { syncAndSeed, Weekday, Workout, Exercise } = require("./db");

app.use(express.json());

//routes for static files
app.use("/assets", express.static("assets"));
app.use("/dist", express.static("dist"));

app.get("/api/exercises", async (req, res, next) => {
  try {
    res.send(await Exercise.findAll());
  } catch (err) {
    next(err);
  }
});

app.post("/api/workouts", async (req, res, next) => {
  try {
    res.status(201).send(await Workout.create(req.body));
  } catch (err) {
    next(err);
  }
});

app.get("/api/weekdayPlan", async (req, res, next) => {
  try {
    res.send(
      await Weekday.findAll({
        include: {
          all: true,
          nested: true,
        },
      })
    );
  } catch (err) {
    next(err);
  }
});

app.delete("/api/workouts", async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.body.id);
    workout.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//Homepage route
app.get("/", async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "index.html"));
  } catch (err) {
    next(err);
  }
});

//Build and seed tables followed by setting up port
const initialize = async () => {
  try {
    await syncAndSeed();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

initialize();
