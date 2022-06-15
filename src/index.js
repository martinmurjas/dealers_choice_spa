const axios = require("axios");
const weekdayPlan = document.querySelector("#weekday-plan");
const selectDay = document.querySelector("#selectDay");
const selectWorkout = document.querySelector("#selectWorkout");
const inputMeasure = document.querySelector("#inputMeasure");
const addWorkoutForm = document.querySelector("form");
const state = {};

addWorkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const weekdayId = selectDay.value;
  const exerciseId = selectWorkout.value;
  const measure = inputMeasure.value;
  try {
    await axios.post("/api/workouts", {
      weekdayId,
      exerciseId,
      measure,
    });
    fetchWeekdayPlan();
    inputMeasure.value = "";
  } catch (err) {
    console.log(err);
  }
});

weekdayPlan.addEventListener("click", (e) => {
  if (e.target.closest("A") && e.target.tagName !== "BUTTON") {
    const id = e.target.closest("A").getAttribute("day-id");
    window.location.hash = id;
  }
});

weekdayPlan.addEventListener("click", async (e) => {
  if (e.target.tagName === "BUTTON") {
    const workoutId = e.target.getAttribute("workout-id");
    try {
      await axios.delete("/api/workouts", {
        data: {
          id: workoutId,
        },
      });
      fetchWeekdayPlan();
      renderWeekdayPlan();
    } catch (err) {
      console.log(err);
    }
  }
});

window.addEventListener("hashchange", () => {
  renderWeekdayPlan();
});

const renderWeekdayPlan = () => {
  const selectedDay = window.location.hash.slice(1) * 1;

  const html = `
		${state.weekdayPlan
      .sort((a, b) => a.id - b.id)
      .map((weekday) => {
        return `
					<a day-id = '${weekday.id}' ${
          selectedDay === weekday.id ? "class='selected'" : ""
        }>
						<h2>${weekday.name}</h2>
						<ul>
							${
                weekday.workouts
                  .map((workout) => {
                    return workout.exercise.focu.name;
                  })
                  .filter((focus, index, array) => {
                    return array.indexOf(focus) === index;
                  })
                  .map((focus) => {
                    return `<li>${focus}</li>
										${
                      selectedDay === weekday.id
                        ? weekday.workouts
                            .filter((workout) => {
                              return workout.exercise.focu.name === focus;
                            })
                            .map(
                              (workout) =>
                                `<p>${workout.exercise.name} for ${workout.measure} ${workout.exercise.type.unit}<button workout-id = '${workout.id}'>x</button></p>`
                            )
                            .join("")
                        : ""
                    }
										`;
                  })
                  .join("") || "Rest Day"
              }
						</ul>
					</a>
				`;
      })
      .join("")}
	`;
  weekdayPlan.innerHTML = html;
};

const renderExercises = () => {
  const html = `
		${state.exercises.map(
      (exercise) => `<option value=${exercise.id}>${exercise.name}</option>`
    )}
	`;
  selectWorkout.innerHTML = html;
};

const renderWeekdays = () => {
  const html = `
		${state.weekdayPlan.map(
      (weekday) => `<option value=${weekday.id}>${weekday.name}</option>`
    )}
	`;
  selectDay.innerHTML = html;
};

const fetchExercises = async () => {
  try {
    const response = await axios.get("/api/exercises");
    const data = response.data;
    state.exercises = data;
    renderExercises();
  } catch (err) {
    console.log(err);
  }
};

const fetchWeekdayPlan = async () => {
  try {
    const response = await axios.get("/api/weekdayPlan");
    const data = response.data;
    state.weekdayPlan = data;
    renderWeekdayPlan();
    renderWeekdays();
  } catch (err) {
    console.log(err);
  }
};

fetchExercises();
fetchWeekdayPlan();
