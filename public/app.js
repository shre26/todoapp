import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addButton = document.getElementById("addTaskBtn");

const db = window.db; // should be defined by index.html first
const tasksCol = collection(db, "tasks");

addButton.addEventListener("click", async () => {
  console.log("Add button clicked");
  const task = taskInput.value.trim();
  if (task !== "") {
    await addDoc(tasksCol, { text: task });
    taskInput.value = "";
  }
});

onSnapshot(tasksCol, (snapshot) => {
  taskList.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const li = document.createElement("li");
    li.textContent = docSnap.data().text;

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => deleteDoc(doc(tasksCol, docSnap.id));

    li.appendChild(btn);
    taskList.appendChild(li);
  });
});
