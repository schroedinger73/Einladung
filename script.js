const invitationConfig = {
  birthdayPersonName: "Alex Beispiel",
  age: 34,
  date: "Samstag, 18. April 2026",
  time: "19:00 Uhr",
  location: "Atelierhaus Nord, Berlin",
  dressCode: "Unauffaellig festlich",
  rsvpLine: "Bitte kurze Zusage bis 10. April per Nachricht.",
  unlockCode: "34",
  riddleText: "Die benoetigte Zahl entspricht dem Alter, das Gegenstand der Verhandlung wird, sobald der Tatvorwurf rechtswirksam festgestellt ist.",
  offenseIncrementText: "+1 Lebensjahr",
  witnessTitle: "Verhandlung des Geburtstags",
};

const storageKey = "birthday-invitation-unlocked";

const fieldMap = {
  name: invitationConfig.birthdayPersonName,
  age: invitationConfig.offenseIncrementText,
  ageInline: String(invitationConfig.age),
  date: invitationConfig.date,
  dateDetail: invitationConfig.date,
  time: invitationConfig.time,
  location: invitationConfig.location,
  locationDetail: invitationConfig.location,
  dresscode: invitationConfig.dressCode || "Keine besondere dienstliche Anordnung.",
  rsvp: invitationConfig.rsvpLine || "Keine Rueckmeldung erforderlich.",
  riddle: invitationConfig.riddleText,
  inviteTitle: `${invitationConfig.witnessTitle} von ${invitationConfig.birthdayPersonName}`,
  settlement: `Von weiteren Massnahmen kann abgesehen werden, wenn Sie am ${invitationConfig.date} um ${invitationConfig.time} in ${invitationConfig.location} erscheinen, gratulieren und durch angemessene Mitwirkung an Speisen, Getraenken und Gespraechen zur endgueltigen Erledigung des Verfahrens beitragen.`,
  caseRef: createCaseReference(invitationConfig),
  offenseCode: `Abschnitt AG-${String(invitationConfig.age).padStart(2, "0")}`,
};

const notice = document.querySelector(".notice");
const invitationSection = document.getElementById("invitation-section");
const form = document.getElementById("unlock-form");
const codeInput = document.getElementById("unlock-code");
const feedback = document.getElementById("unlock-feedback");
const resetButton = document.getElementById("reset-button");

hydrateContent();
restoreState();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const normalized = codeInput.value.replace(/\D/g, "");

  if (normalized === invitationConfig.unlockCode) {
    setUnlocked(true);
    feedback.textContent = "Freigabe erteilt. Die gesperrte Anlage wurde geoeffnet.";
    feedback.className = "feedback success";
    codeInput.value = normalized;
    codeInput.setAttribute("aria-invalid", "false");
    return;
  }

  feedback.textContent = "Der eingegebene Code konnte dem Vorgang nicht eindeutig zugeordnet werden.";
  feedback.className = "feedback error";
  codeInput.setAttribute("aria-invalid", "true");
  codeInput.classList.remove("shake");
  form.classList.remove("shake");

  window.requestAnimationFrame(() => {
    codeInput.classList.add("shake");
    form.classList.add("shake");
  });
});

resetButton.addEventListener("click", () => {
  setUnlocked(false);
  feedback.textContent = "Der Vorgang wurde erneut gesperrt.";
  feedback.className = "feedback";
  codeInput.value = "";
});

function hydrateContent() {
  Object.entries(fieldMap).forEach(([key, value]) => {
    document.querySelectorAll(`[data-${key}]`).forEach((node) => {
      node.textContent = value;
    });
  });
}

function restoreState() {
  let unlocked = false;

  try {
    unlocked = window.localStorage.getItem(storageKey) === "true";
  } catch {
    unlocked = false;
  }

  setUnlocked(unlocked, false);
}

function setUnlocked(isUnlocked, moveFocus = true) {
  notice.classList.toggle("unlocked", isUnlocked);
  invitationSection.classList.toggle("locked", !isUnlocked);
  invitationSection.classList.toggle("revealed", isUnlocked);
  invitationSection.setAttribute("aria-hidden", String(!isUnlocked));
  codeInput.setAttribute("aria-invalid", "false");

  if (isUnlocked) {
    persistState("true");
    if (moveFocus) {
      invitationSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    persistState(null);
  }
}

function createCaseReference(config) {
  const digits = String(config.age).padStart(2, "0");
  return `ZS-VL-${new Date().getFullYear()}-${digits}${config.unlockCode}`;
}

function persistState(value) {
  try {
    if (value === null) {
      window.localStorage.removeItem(storageKey);
    } else {
      window.localStorage.setItem(storageKey, value);
    }
  } catch {
    // localStorage may be unavailable in private contexts; the page remains functional.
  }
}
