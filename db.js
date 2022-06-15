const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize;

//Connect to db
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_express_spa"
);

//Define Tables
const Weekday = conn.define("weekday", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

const Focus = conn.define("focus", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

const Type = conn.define("type", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  unit: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const Exercise = conn.define("exercise", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

const Workout = conn.define("workout", {
  measure: {
    type: INTEGER,
  },
});

//Set up table associations/relations
Exercise.belongsTo(Focus);
Exercise.belongsTo(Type);
Exercise.hasMany(Workout);

Workout.belongsTo(Weekday);
Workout.belongsTo(Exercise);

Weekday.hasMany(Workout);

//Initialize syncAndSeed Fucntion
const syncAndSeed = async () => {
  await conn.sync({ force: true });

  //Insert data into Weekday table
  const [sunday, monday, tuesday, wednesday, thursday, friday, saturday] =
    await Promise.all([
      Weekday.create({ name: "Sunday" }),
      Weekday.create({ name: "Monday" }),
      Weekday.create({ name: "Tuesday" }),
      Weekday.create({ name: "Wednesday" }),
      Weekday.create({ name: "Thursday" }),
      Weekday.create({ name: "Friday" }),
      Weekday.create({ name: "Saturday" }),
    ]);

  //Insert data into Focus table
  const [cardio, legs, arms, chest, back, shoulders, abs] = await Promise.all([
    Focus.create({ name: "Cardio" }),
    Focus.create({ name: "Legs" }),
    Focus.create({ name: "Arms" }),
    Focus.create({ name: "Chest" }),
    Focus.create({ name: "Back" }),
    Focus.create({ name: "Shoulders" }),
    Focus.create({ name: "Abs" }),
  ]);

  //Insert data into Type table
  const [time, rep] = await Promise.all([
    Type.create({ name: "Time Based", unit: "Min" }),
    Type.create({ name: "Rep Based", unit: "Reps" }),
  ]);

  //Insert data into Exercise table
  const [
    running,
    jogging,
    jumpRope,
    burpees,
    kettlebellSwings,
    squats,
    lunges,
    bulgarianSquats,
    legPress,
    calfRaises,
    pullUps,
    chinUps,
    bicepCurls,
    tricepPushdowns,
    tricepExtensions,
    pushUps,
    benchPress,
    chestDip,
    butterfly,
    deadlift,
    latPulldown,
    cableRow,
    dumbellRow,
    overheadPress,
    seatedRow,
    shoulderPress,
    crunches,
    situps,
    planks,
    hangingLegRaises,
  ] = await Promise.all([
    Exercise.create({
      name: "Running",
      focuId: cardio.id,
      typeId: time.id,
    }),
    Exercise.create({
      name: "Jogging",
      focuId: cardio.id,
      typeId: time.id,
    }),
    Exercise.create({
      name: "Jump Rope",
      focuId: cardio.id,
      typeId: time.id,
    }),
    Exercise.create({
      name: "Burpees",
      focuId: cardio.id,
      typeId: time.id,
    }),
    Exercise.create({
      name: "Kettlebell Swings",
      focuId: cardio.id,
      typeId: time.id,
    }),
    Exercise.create({
      name: "Squats",
      focuId: legs.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Lunges",
      focuId: legs.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Bulgarian Squats",
      focuId: legs.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Leg Press",
      focuId: legs.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Calf Raises",
      focuId: legs.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Pull-Ups",
      focuId: arms.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Chin-Ups",
      focuId: arms.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Bicep Curls",
      focuId: arms.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Tricep Pushdowns",
      focuId: arms.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Tricep Extensions",
      focuId: arms.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Push-Ups",
      focuId: chest.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Bench Press",
      focuId: chest.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Chest Dip",
      focuId: chest.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Butterfly",
      focuId: chest.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Deadlift",
      focuId: back.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Lat Pulldown",
      focuId: back.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Cable Row",
      focuId: back.id,
      typeId: time.id,
    }),
    Exercise.create({
      name: "Dumbell Row",
      focuId: back.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Overhead Press",
      focuId: shoulders.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Seated Row",
      focuId: shoulders.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Shoulder Press",
      focuId: shoulders.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Crunches",
      focuId: abs.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Situps",
      focuId: abs.id,
      typeId: rep.id,
    }),
    Exercise.create({
      name: "Planks",
      focuId: abs.id,
      typeId: time.id,
    }),
    Exercise.create({
      name: "Hanging Leg Raises",
      focuId: abs.id,
      typeId: rep.id,
    }),
  ]);

  //Insert data into Workout table
  await Promise.all([
    Workout.create({
      weekdayId: sunday.id,
      exerciseId: running.id,
      measure: 30,
    }),
    Workout.create({
      weekdayId: sunday.id,
      exerciseId: jumpRope.id,
      measure: 15,
    }),
    Workout.create({
      weekdayId: monday.id,
      exerciseId: squats.id,
      measure: 30,
    }),
    Workout.create({
      weekdayId: monday.id,
      exerciseId: lunges.id,
      measure: 30,
    }),
    Workout.create({
      weekdayId: tuesday.id,
      exerciseId: pushUps.id,
      measure: 30,
    }),
    Workout.create({
      weekdayId: tuesday.id,
      exerciseId: benchPress.id,
      measure: 30,
    }),
    Workout.create({
      weekdayId: tuesday.id,
      exerciseId: crunches.id,
      measure: 30,
    }),
    Workout.create({
      weekdayId: wednesday.id,
      exerciseId: pullUps.id,
      measure: 30,
    }),
    Workout.create({
      weekdayId: wednesday.id,
      exerciseId: bicepCurls.id,
      measure: 30,
    }),
    Workout.create({
      weekdayId: wednesday.id,
      exerciseId: tricepExtensions.id,
      measure: 30,
    }),
    Workout.create({
      weekdayId: friday.id,
      exerciseId: situps.id,
      measure: 30,
    }),
    Workout.create({
      weekdayId: friday.id,
      exerciseId: planks.id,
      measure: 5,
    }),
    Workout.create({
      weekdayId: friday.id,
      exerciseId: crunches.id,
      measure: 30,
    }),
  ]);
};

//export syncAndSeed function along with tables
module.exports = { syncAndSeed, Weekday, Workout, Exercise };
