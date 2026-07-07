// Default values (used when a field is left blank)
const defaults = {
  firstName: "Taylor",
  middleName: "",
  nickname: "",
  lastName: "Stewart",
  mascotAdj: "Tough",
  mascotAnimal: "Serval",
  divider: "||",
  ackStatement: "I agree that everything I post here is publicly viewable and won't put anything I don't want public here. ",
  ackDate: "2026/05/20",
  linkedin: "https://www.linkedin.com/in/taylor-stewart-0992003ab/",
  github: "https://github.com/Brainrot0570",
  githubio: "https://brainrot0570.github.io/",
  courseSite: "https://webpages.charlotte.edu/tstewa60/",
  freecode: "https://www.freecodecamp.org/tstewa60",
  codecademy: "https://www.codecademy.com/profiles/dev8070233007",
  photo: "images/4wheeler.jpeg",
  caption: "In my free time, I enjoy riding ATVs",
  photoAlt: "riding a four wheeler/ATV",
  summary: "My name is Taylor and I came to UNC Charlotte this previous fall to study Computer Science with a concentration in Cyber Security. Outside of computer science, my hobbies include art, music, and riding ATVs. I have some coding experience in java and c, as well as a small amount of experience with python.",
  personal: "I enjoy riding ATVs, such as four-wheelers and side-by-sides. I also enjoy drawing and painting in both digital and traditional styles. I try to challenge myself often and learn new things; I am always adopting new hobbies and learning new skills.",
  professional: "Previously I have mostly worked in customer service at small businesses. Working in customer service has taught me how to be patient and communicate with people. I have also worked in home-repair, which taught me a lot of valuable, hands-on skills that I will likely use for the rest of my life.",
  academic: "I'm a Computer Science major with a concentration in Cyber Security.",
  subjectBackground: "None at all! I have never worked with HTML or CSS before, but I am enjoying learning it!",
  platform: "My main computer is a Thinkpad X1 running Arch Linux.",
  backupComputer: "When I have compatibility issues with linux, my backup is a laptop running Windows 11(though Windows 10 is much better in my opinion).",
  from: "I have lived in NC for my entire life, though I had not spent much time in the Charlotte area prior to being admitted to UNC Charlotte. Over the summer, I am taking only online classes, but during Spring and Fall semesters I commute to campus. So far, I have enjoyed campus and the surrounding area. There are so many interesting things to see and do!",
  quote: "I have two Microsoft Outlooks, and neither one of those are working.",
  quoteAuthor: "Artemis II Astronaut",
  classes: [
    {
      name: "Front-End Web Application Development",
      number: "ITIS3135",
      reason: "This course! I am taking this class both because it is required and because I am interested in web development."
    },
    {
      name: "Software Engineering",
      number: "ITSC3155",
      reason: "Required for my degree, this course focuses on development, design, and the overall process of engineering software."
    },
    {
      name: "Intro to Prob & Stat",
      number: "STAT2122",
      reason: "Required math for my degree, I am taking it as a 4 week course. If anyone reading this is considering STAT 2122 as a 4 week course, I implore you to consider the more reasonable 8 week option."
    }
  ]
};

// Helper: return the input's value, or a fallback default if it's blank
function valueOrDefault(id, fallback) {
  return document.getElementById(id).value.trim() || fallback;
}

// Show output / hide form
function showOutput() {
  document.getElementById("formSection").style.display = "none";
  document.querySelector("body > main").style.display = "none";
  document.getElementById("siteFooter").style.display = "none";
  document.getElementById("resetBtn").style.display = "inline-block";
}

// Include: fetch external HTML files referenced via data-include
// Usage in markup: <div data-include="../components/header.html"></div>
// Scans `root` for every [data-include] element, fetches the referenced
// file, and swaps it in as that element's innerHTML. Returns a Promise
// that resolves once every include has finished (success or failure).
function processIncludes(root) {
  const includeEls = root.querySelectorAll("[data-include]");
  const promises = Array.from(includeEls).map(function (el) {
    const filePath = el.getAttribute("data-include");
    return fetch(filePath)
      .then(function (res) {
        if (!res.ok) {
          throw new Error("Could not load " + filePath + " (" + res.status + ")");
        }
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html;
      })
      .catch(function (err) {
        console.error(err);
        el.innerHTML = "";
      });
  });
  return Promise.all(promises);
}

// Load the page-level header/footer includes as soon as the DOM is ready
// (the header at the top of <body>, and the footer near the bottom, both
// live outside of #output and aren't touched by renderOutput's own include
// pass, so they need to be processed once on initial page load.)
processIncludes(document);

// Add a new class item
document.getElementById("addClassBtn").addEventListener("click", function () {
  const div = document.createElement("div");
  div.className = "classItem";
  div.innerHTML =
    "<input type='text' class='className' placeholder='Class name' />" +
    "<input type='text' class='classNumber' placeholder='Class number' />" +
    "<input type='text' class='classReason' placeholder='Reason for taking it' />" +
    "<button type='button' class='deleteClassBtn'>Delete</button>";
  document.getElementById("classList").appendChild(div);
});

// Delete a class item (event delegation so it works on new items too)
document.getElementById("classList").addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteClassBtn")) {
    e.target.closest(".classItem").remove();
  }
});

// Submit
document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop page from refreshing

  const firstName = valueOrDefault("firstNameInput", defaults.firstName);
  const middleName = valueOrDefault("middleNameInput", defaults.middleName);
  const nickname = valueOrDefault("nicknameInput", defaults.nickname);
  const lastName = valueOrDefault("lastNameInput", defaults.lastName);

  // Build the full name
  let name = firstName;
  if (middleName) name += " " + middleName;
  if (nickname) name += " \"" + nickname + "\"";
  name += " " + lastName;

  const mascotAdj = valueOrDefault("mascotAdjInput", defaults.mascotAdj);
  const mascotAnimal = valueOrDefault("mascotAnimalInput", defaults.mascotAnimal);
  const divider = valueOrDefault("dividerInput", defaults.divider);

  const caption = valueOrDefault("captionInput", defaults.caption);
  const photoAlt = valueOrDefault("photoAltInput", defaults.photoAlt);
  const summary = valueOrDefault("summaryInput", defaults.summary);
  const personal = valueOrDefault("personalInput", defaults.personal);
  const professional = valueOrDefault("professionalInput", defaults.professional);
  const academic = valueOrDefault("academicInput", defaults.academic);
  const subjectBackground = valueOrDefault("subjectBackgroundInput", defaults.subjectBackground);
  const platform = valueOrDefault("platformInput", defaults.platform);
  const backupComputer = valueOrDefault("backupComputerInput", defaults.backupComputer);
  const from = valueOrDefault("fromInput", defaults.from);
  const funny = document.getElementById("funnyInput").value.trim();
  const share = document.getElementById("shareInput").value.trim();
  const ackStatement = valueOrDefault("ackStatementInput", defaults.ackStatement);
  const ackDate = valueOrDefault("ackDateInput", defaults.ackDate);
  const quote = valueOrDefault("quoteInput", defaults.quote);
  const quoteAuthor = valueOrDefault("quoteAuthorInput", defaults.quoteAuthor);
  const linkedin = valueOrDefault("linkedinInput", defaults.linkedin);
  const github = valueOrDefault("githubInput", defaults.github);
  const githubio = valueOrDefault("githubioInput", defaults.githubio);
  const courseSite = valueOrDefault("courseSiteInput", defaults.courseSite);
  const freecode = valueOrDefault("freecodeInput", defaults.freecode);
  const codecademy = valueOrDefault("codecademyInput", defaults.codecademy);

  // Gather classes; fall back to defaults.classes if every row is empty
  const classNameInputs = document.querySelectorAll(".className");
  const classNumberInputs = document.querySelectorAll(".classNumber");
  const classReasonInputs = document.querySelectorAll(".classReason");

  let classes = [];
  for (let i = 0; i < classNameInputs.length; i++) {
    const cName = classNameInputs[i].value.trim();
    const cNumber = classNumberInputs[i].value.trim();
    const cReason = classReasonInputs[i].value.trim();
    if (cName || cNumber || cReason) {
      classes.push({
        name: cName || "Course Name",
        number: cNumber || "Course Number",
        reason: cReason || "Reason for taking it"
      });
    }
  }
  if (classes.length === 0) classes = defaults.classes;

  let classesHTML = "";
  classes.forEach(function (c) {
    classesHTML +=
      "<li><strong>" + c.number + " - " + c.name + ":</strong> " + c.reason + "</li>";
  });

  // Build the final markup
  function renderOutput(photoSrc) {
    document.getElementById("output").innerHTML =
      "<main>" +
      "<h2>Introduction Form</h2>" +
      "<h3>" + name + " " + divider + " " + mascotAdj + " " + mascotAnimal + "</h3>" +
      "<figure>" +
      "<img src='" + photoSrc + "' height='400' alt='" + name + " " + photoAlt + "'>" +
      "<figcaption>" + caption + "</figcaption>" +
      "</figure>" +
      "<p>" + summary + "</p>" +
      "<div class='offwhiteleft'>" +
      "<ul>" +
      "<li><strong>Personal Background: </strong>" + personal + "</li>" +
      "<li><strong>Professional Background: </strong>" + professional + "</li>" +
      "<li><strong>Academic Background:</strong>" + academic + "</li>" +
      "<li><strong>Background in this Subject:</strong>" + subjectBackground + "</li>" +
      "<li><strong>Primary Computer Platform: </strong>" + platform + "</li>" +
      "<li><strong>Backup Work Computer & Location Plan: </strong>" + backupComputer + "</li>" +
      "<li><strong>Courses I'm Taking & Why: </strong>" +
      "<ul>" + classesHTML + "</ul>" +
      "</li>" +
      "<li><strong>Where I'm From: </strong>" + from + "</li>" +
      (funny ? "<li><strong>Funny Thing: </strong>" + funny + "</li>" : "") +
      (share ? "<li><strong>Something I Would Like to Share: </strong>" + share + "</li>" : "") +
      "</ul>" +
      "</div>" +
      "<q>" + quote + "</q>" +
      "<p class='author'><i>- " + quoteAuthor + "</i></p>" +
      "<p class='agreement'><i>" + ackStatement + " " + ackDate + "</i></p>" +
      "</main>" +
      "<p>" +
      "<a href='" + github + "' target='_blank'>GitHub</a> " +
      "<a href='" + githubio + "' target='_blank'>CLT Web</a> " +
      "<a href='" + courseSite + "' target='_blank'>GitHub.io</a> " +
      "<a href='" + freecode + "' target='_blank'>freeCodeCamp</a> " +
      "<a href='" + codecademy + "' target='_blank'>Codecademy</a> " +
      "<a href='" + linkedin + "' target='_blank'>LinkedIn</a>" +
      "</p>" +
      "<div class='copyright'>" +
      "<p>Site Designed by <a href = 'taylorstewartdesigns.com'>Taylor Stewart Designs&copy; 2026</a></p>" +
      "<p><a href='https://validator.w3.org/check?uri=referer'><button>Validate HTML</button></a><a href='https://jigsaw.w3.org/css-validator/check/referer'><button>Validate CSS</button></a></p>" +
      "</div>";
  }

  // Handle photo: uploaded file, or fall back to default image path
  const fileInput = document.getElementById("myPhoto");
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function () {
      renderOutput(reader.result);
      showOutput();
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    renderOutput(defaults.photo);
    showOutput();
  }
});


// Clear: empty all text inputs and textareas 
document
  .querySelector("#clearBtn")
  .addEventListener("click", function (event) {
    Array.from(document.querySelectorAll("#myForm input[type='text'], #myForm textarea, #myForm input[type='url']"))
      .forEach((input) => {
        input.value = "";
      });
    // Also clear the file input so the chosen photo is removed
    document.getElementById("myPhoto").value = "";
  });
document.getElementById("resetBtn").addEventListener("click", function () {
  document.getElementById("output").innerHTML = "";
  document.getElementById("formSection").style.display = "block";
  document.querySelector("body > main").style.display = "block";
  document.getElementById("siteFooter").style.display = "block";
  document.getElementById("resetBtn").style.display = "none";
  document.getElementById("myForm").reset();
});