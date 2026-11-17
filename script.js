// ===============================
// STUDYSYNC - STUDENT STUDY PLANNER
// ===============================


// ===============================
// LOGIN
// ===============================

function login() {

    let name = document.getElementById("studentName").value.trim();
    let email = document.getElementById("studentEmail").value.trim();
    let password = document.getElementById("studentPassword").value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields.");
        return;
    }

    let registeredStudent =
        JSON.parse(localStorage.getItem("registeredStudent"));

    // If account exists, check email and password
    if (registeredStudent) {

        if (registeredStudent.email !== email) {
            alert("Email is not registered. Please Sign Up first.");
            return;
        }

        if (registeredStudent.password !== password) {
            alert("Incorrect password.");
            return;
        }

        name = registeredStudent.name;
    }

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentEmail", email);

    openWebsite(name);
}


// ===============================
// OPEN WEBSITE
// ===============================

function openWebsite(name) {

    document.getElementById("loginPage").classList.add("hidden");

    let signupPage = document.getElementById("signupPage");
    let forgotPage = document.getElementById("forgotPage");
    let otpPage = document.getElementById("otpPage");
    let resetPage = document.getElementById("resetPage");

    if (signupPage) signupPage.classList.add("hidden");
    if (forgotPage) forgotPage.classList.add("hidden");
    if (otpPage) otpPage.classList.add("hidden");
    if (resetPage) resetPage.classList.add("hidden");

    document.getElementById("website").classList.remove("hidden");

    document.getElementById("welcomeName").innerText =
        name.split(" ")[0];

    document.getElementById("profileName").innerText =
        name;

    document.getElementById("topName").innerText =
        name;

    // Change avatar
    let avatar = document.querySelector(".avatar");

    if (avatar) {
        avatar.innerText =
            name.charAt(0).toUpperCase();
    }

    loadTasks();
    loadTimetable();
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("studentName");
    localStorage.removeItem("studentEmail");

    document.getElementById("website").classList.add("hidden");

    document.getElementById("loginPage").classList.remove("hidden");

    document.getElementById("studentPassword").value = "";
}

```javascript
// ===============================
// PAGE NAVIGATION
// ===============================

function showPage(pageName) {

    // Get all pages
    const pages = document.querySelectorAll(".page");

    // Hide all pages
    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    // Show selected page
    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    // Change topbar title
    const titles = {

        dashboard: "Dashboard",

        timetable: "Timetable",

        tasks: "Tasks",

        completed: "Tasks Completed",

        advice: "Study Advice",

        accuracy: "Accuracy"

    };

    const pageTitle =
        document.getElementById("pageTitle");

    if (pageTitle) {

        pageTitle.innerText =
            titles[pageName] || "Dashboard";

    }

    // Reload timetable whenever timetable page opens
    if (pageName === "timetable") {
        loadTimetable();
    }

    // Reload tasks whenever task-related pages open
    if (
        pageName === "tasks" ||
        pageName === "completed" ||
        pageName === "dashboard"
    ) {
        loadTasks();
    }
}
```

// ===============================
// SIGN UP
// ===============================

function showSignup() {

    document.getElementById("loginPage")
        .classList.add("hidden");

    document.getElementById("website")
        .classList.add("hidden");

    document.getElementById("forgotPage")
        ?.classList.add("hidden");

    document.getElementById("signupPage")
        .classList.remove("hidden");
}


function signup() {

    let name =
        document.getElementById("signupName")
        .value.trim();

    let email =
        document.getElementById("signupEmail")
        .value.trim();

    let password =
        document.getElementById("signupPassword")
        .value;

    let confirmPassword =
        document.getElementById("confirmPassword")
        .value;


    if (name === "") {

        alert("Please enter your name.");

        return;

    }


    if (email === "") {

        alert("Please enter your email.");

        return;

    }


    if (password.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;

    }


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }


    let existingStudent =
        JSON.parse(
            localStorage.getItem("registeredStudent")
        );


    if (
        existingStudent &&
        existingStudent.email === email
    ) {

        alert(
            "This email is already registered."
        );

        return;

    }


    let student = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "registeredStudent",
        JSON.stringify(student)
    );


    alert(
        "Account created successfully! 🎉"
    );


    showLogin();

    document.getElementById("studentName").value =
        name;

    document.getElementById("studentEmail").value =
        email;
}


// ===============================
// SHOW LOGIN
// ===============================

function showLogin() {

    document.getElementById("signupPage")
        ?.classList.add("hidden");

    document.getElementById("forgotPage")
        ?.classList.add("hidden");

    document.getElementById("otpPage")
        ?.classList.add("hidden");

    document.getElementById("resetPage")
        ?.classList.add("hidden");

    document.getElementById("loginPage")
        .classList.remove("hidden");
}


// ===============================
// FORGOT PASSWORD
// ===============================

let generatedOTP = "";

let resetEmail = "";


function showForgotPassword() {

    document.getElementById("loginPage")
        .classList.add("hidden");

    document.getElementById("signupPage")
        ?.classList.add("hidden");

    document.getElementById("forgotPage")
        .classList.remove("hidden");
}


function sendOTP() {

    let email =
        document.getElementById("forgotEmail")
        .value.trim();

    if (email === "") {

        alert("Please enter your email.");

        return;

    }


    let student =
        JSON.parse(
            localStorage.getItem("registeredStudent")
        );


    if (!student) {

        alert(
            "No account found. Please Sign Up first."
        );

        return;

    }


    if (student.email !== email) {

        alert(
            "This email is not registered."
        );

        return;

    }


    generatedOTP =
        Math.floor(
            100000 +
            Math.random() * 900000
        ).toString();


    resetEmail = email;


    // DEMO OTP
    alert(
        "Your OTP is: " + generatedOTP
    );


    document.getElementById("forgotPage")
        .classList.add("hidden");

    document.getElementById("otpPage")
        .classList.remove("hidden");
}


// ===============================
// VERIFY OTP
// ===============================

function verifyOTP() {

    let enteredOTP =
        document.getElementById("otpInput")
        .value.trim();


    if (enteredOTP === "") {

        alert("Please enter OTP.");

        return;

    }


    if (enteredOTP !== generatedOTP) {

        alert("Incorrect OTP ❌");

        return;

    }


    alert(
        "OTP verified successfully! ✅"
    );


    document.getElementById("otpPage")
        .classList.add("hidden");

    document.getElementById("resetPage")
        .classList.remove("hidden");
}


// ===============================
// RESET PASSWORD
// ===============================

function resetPassword() {

    let newPassword =
        document.getElementById("newPassword")
        .value;

    let confirmPassword =
        document.getElementById("confirmNewPassword")
        .value;


    if (newPassword.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;

    }


    if (newPassword !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        return;

    }


    let student =
        JSON.parse(
            localStorage.getItem("registeredStudent")
        );


    if (!student) {

        alert("Account not found.");

        return;

    }


    student.password = newPassword;


    localStorage.setItem(
        "registeredStudent",
        JSON.stringify(student)
    );


    alert(
        "Password reset successfully! 🎉"
    );


    generatedOTP = "";

    resetEmail = "";


    document.getElementById("otpInput").value = "";

    document.getElementById("newPassword").value = "";

    document.getElementById("confirmNewPassword").value = "";


    showLogin();
}


// ===============================
// TASK DATA
// ===============================

let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [

        {
            name: "Complete Python Assignment",

            subject: "Python",

            done: false
        },

        {
            name: "Revise Data Structures",

            subject: "DS",

            done: false
        },

        {
            name: "Prepare COA Notes",

            subject: "COA",

            done: true
        }

    ];


// ===============================
// LOAD TASKS
// ===============================

function loadTasks() {

    let taskList =
        document.getElementById("taskList");

    let dashboardList =
        document.getElementById(
            "dashboardTaskList"
        );

    let completedList =
        document.getElementById(
            "completedList"
        );


    if (!taskList) return;


    taskList.innerHTML = "";

    dashboardList.innerHTML = "";

    completedList.innerHTML = "";


    tasks.forEach(function(task, index) {

        let html = `

        <div class="task">

            <input
                type="checkbox"
                ${task.done ? "checked" : ""}
                onchange="completeTask(${index})"
            >

            <div class="task-info">

                <strong>
                    ${task.name}
                </strong>

                <small>
                    ${task.subject}
                </small>

            </div>

            <button
                onclick="deleteTask(${index})"
                style="
                border:none;
                background:none;
                cursor:pointer;
                font-size:16px;
                "
            >
                🗑️
            </button>

        </div>

        `;


        taskList.innerHTML += html;


        if (!task.done) {

            dashboardList.innerHTML += html;

        }


        if (task.done) {

            completedList.innerHTML += html;

        }

    });


    updateStatistics();
}


// ===============================
// COMPLETE TASK
// ===============================

function completeTask(index) {

    tasks[index].done =
        !tasks[index].done;


    saveTasks();

    loadTasks();
}


// ===============================
// DELETE TASK
// ===============================

function deleteTask(index) {

    let confirmDelete =
        confirm(
            "Delete this task?"
        );


    if (!confirmDelete) return;


    tasks.splice(index, 1);

    saveTasks();

    loadTasks();
}


// ===============================
// SAVE TASKS
// ===============================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// ===============================
// ADD TASK
// ===============================
function addTask() {

    const taskName = prompt("Enter task name:");

    if (taskName === null || taskName.trim() === "") {
        return;
    }

    const subject = prompt("Enter subject:");

    tasks.push({
        name: taskName.trim(),
        subject: subject && subject.trim() !== ""
            ? subject.trim()
            : "General",
        done: false
    });

    saveTasks();
    loadTasks();

    alert("Task added successfully! ✅");
}


// ===============================
// STATISTICS
// ===============================

function updateStatistics() {

    let total =
        tasks.length;


    let completed =
        tasks.filter(
            task => task.done
        ).length;


    let pending =
        total - completed;


    let accuracy =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    let totalTask =
        document.getElementById(
            "totalTask"
        );

    let pendingTask =
        document.getElementById(
            "pendingTask"
        );

    let doneTask =
        document.getElementById(
            "doneTask"
        );


    if (totalTask)
        totalTask.innerText = total;


    if (pendingTask)
        pendingTask.innerText = pending;


    if (doneTask)
        doneTask.innerText = completed;


    document.getElementById(
        "todayTasks"
    ).innerText = pending;


    document.getElementById(
        "completedTasks"
    ).innerText = completed;


    document.getElementById(
        "accuracyValue"
    ).innerText =
        accuracy + "%";


    document.getElementById(
        "bigAccuracy"
    ).innerText =
        accuracy + "%";


    document.getElementById(
        "completionPercentage"
    ).innerText =
        accuracy + "%";


    document.getElementById(
        "completionText"
    ).innerText =
        completed +
        " of " +
        total +
        " tasks completed.";


    document.getElementById(
        "taskBar"
    ).style.width =
        accuracy + "%";


    document.getElementById(
        "taskBarText"
    ).innerText =
        accuracy + "%";


    document.getElementById(
        "consistencyBar"
    ).style.width =
        accuracy + "%";


    document.getElementById(
        "consistencyText"
    ).innerText =
        accuracy + "%";


    // Circular progress
    let circle =
        document.querySelector(".circle");


    if (circle) {

        circle.style.background =
            `conic-gradient(
                #8d315b ${accuracy * 3.6}deg,
                #eee ${accuracy * 3.6}deg
            )`;

    }


    let bigCircle =
        document.querySelector(".big-circle");


    if (bigCircle) {

        bigCircle.style.background =
            `conic-gradient(
                #8d315b ${accuracy * 3.6}deg,
                #eee ${accuracy * 3.6}deg
            )`;

    }
}


// ===============================
// TIMETABLE DATA
// ===============================

let timetable =
    JSON.parse(
        localStorage.getItem(
            "timetable"
        )
    ) || [

        {
            time: "09:00 AM",

            subject: "Data Structures",

            room: "204",

            day: "Monday"

        },

        {
            time: "11:00 AM",

            subject: "Python",

            room: "Lab 2",

            day: "Monday"

        },

        {
            time: "02:00 PM",

            subject: "COA",

            room: "105",

            day: "Tuesday"

        }

    ];

```javascript
// ===============================
// LOAD TIMETABLE
// ===============================

function loadTimetable() {

    const timetableBody =
        document.getElementById("timetableBody");

    if (!timetableBody) {
        return;
    }

    timetableBody.innerHTML = "";

    timetable.forEach(function(item, index) {

        const row = 
            <tr>

                <td>
                    ${item.time}
                </td>

                <td>
                    ${item.subject}
                </td>

                <td>
                    ${item.room}
                </td>

                <td>
                    ${item.day}
                </td>

                <td>

                    <button
                        onclick="deleteClass(${index})"
                        style="
                            border:none;
                            background:none;
                            cursor:pointer;
                            font-size:16px;
                        "
                    >
                        🗑️
                    </button>

                </td>

            </tr>
        ;

        timetableBody.innerHTML += row;

    });
}
```


// ===============================
// ADD CLASS
// ===============================

function addClass() {

    let subject =
        prompt(
            "Enter subject:"
        );


    if (!subject) return;


    let time =
        prompt(
            "Enter time:"
        );


    if (!time) return;


    let room =
        prompt(
            "Enter room:"
        );


    if (!room) {

        room = "-";

    }


    let day =
        prompt(
            "Enter day:"
        );


    if (!day) {

        day = "Monday";

    }


    timetable.push({

        time: time,

        subject: subject,

        room: room,

        day: day

    });


    localStorage.setItem(
        "timetable",
        JSON.stringify(timetable)
    );


    loadTimetable();


    alert(
        "Class added successfully! 📅"
    );
}


// ===============================
// DELETE CLASS
// ===============================

function deleteClass(index) {

    if (
        !confirm(
            "Delete this class?"
        )
    ) return;


    timetable.splice(index, 1);


    localStorage.setItem(
        "timetable",
        JSON.stringify(timetable)
    );


    loadTimetable();
}


// ===============================
// PAGE LOAD
// ===============================

window.onload = function() {

    let savedName =
        localStorage.getItem(
            "studentName"
        );


    if (savedName) {

        document.getElementById(
            "loginPage"
        ).classList.add("hidden");


        document.getElementById(
            "website"
        ).classList.remove("hidden");


        document.getElementById(
            "welcomeName"
        ).innerText =
            savedName.split(" ")[0];


        document.getElementById(
            "profileName"
        ).innerText =
            savedName;


        document.getElementById(
            "topName"
        ).innerText =
            savedName;


        let avatar =
            document.querySelector(
                ".avatar"
            );


        if (avatar) {

            avatar.innerText =
                savedName
                .charAt(0)
                .toUpperCase();

        }

    }


    loadTasks();

    loadTimetable();

};