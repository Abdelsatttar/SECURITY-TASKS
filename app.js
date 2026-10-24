"use strict";
window.SecurityStore = {
  otpKeys: Object.create(null),
  users: Object.create(null),
  outbox: []
};

const taskInfo = {
  1: { title: "Caesar Cipher", description: "Shift letters in a message to encrypt or decrypt it." },
  2: { title: "Caesar Brute Force", description: "Try every possible Caesar key when the shift is unknown." },
  3: { title: "Hash Generator", description: "Generate repeatable MD5 and SHA digests with fixed output lengths." },
  4: { title: "One-Time Pad", description: "Generate a random pad, encrypt plaintext, and decrypt with its key ID." },
  5: { title: "Password Vault", description: "Register a demo user, keep a salted hash, and verify a login." },
  6: { title: "Message MAC", description: "Preview an HMAC tag before adding a message to the local outbox." }
};

const frame = document.getElementById("taskFrame");
const frameWrap = document.getElementById("frameWrap");
const navItems = Array.from(document.querySelectorAll(".nav-item"));
const title = document.getElementById("currentTitle");
const description = document.getElementById("currentDescription");
const counter = document.getElementById("taskCounter");
const toast = document.getElementById("toast");
let toastTimer = null;
let activeTask = 1;

function setActiveTask(task, updateHash) {
  const taskNumber = Math.min(6, Math.max(1, Number(task) || 1));
  activeTask = taskNumber;
  navItems.forEach(function (item) {
    const active = Number(item.dataset.task) === taskNumber;
    item.classList.toggle("active", active);
    item.setAttribute("aria-current", active ? "page" : "false");
  });
  title.textContent = taskInfo[taskNumber].title;
  description.textContent = taskInfo[taskNumber].description;
  counter.innerHTML = "TASK " + String(taskNumber).padStart(2, "0") + " <i></i>";
  const nextSrc = "task-" + taskNumber + ".html";
  if (!frame.src.endsWith("/" + nextSrc)) {
    frame.src = nextSrc;
    frameWrap.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (updateHash !== false) history.replaceState(null, "", "#task-" + taskNumber);
}

navItems.forEach(function (item) {
  item.addEventListener("click", function () {
    setActiveTask(item.dataset.task, true);
  });
});

document.getElementById("exploreBtn").addEventListener("click", function () {
  setActiveTask(1, true);
});

frame.addEventListener("load", function () {
  try { frame.contentWindow.postMessage({ type: "securelab-parent-ready" }, location.origin); } catch (error) {}
});

window.addEventListener("message", function (event) {
  if (event.source !== frame.contentWindow || !event.data || event.data.type !== "securelab-resize") return;
  const height = Number(event.data.height);
  if (Number.isFinite(height)) {
    frame.style.height = Math.max(380, Math.min(2600, height + 8)) + "px";
  }
  if (event.data.toast) showToast(event.data.toast, Boolean(event.data.error));
});

function showToast(message, isError) {
  toast.textContent = message;
  toast.classList.toggle("error", Boolean(isError));
  toast.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2600);
}

window.addEventListener("hashchange", function () {
  const match = location.hash.match(/^#task-([1-6])$/);
  if (match) setActiveTask(Number(match[1]), false);
});
const initialMatch = location.hash.match(/^#task-([1-6])$/);
if (initialMatch) setActiveTask(Number(initialMatch[1]), false);
else setActiveTask(1, false);
