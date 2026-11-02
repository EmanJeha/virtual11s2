/* Questions for both games. Edit text here; keep the structure.
   Question types:
     mc    – multiple choice (options + answer index)
     order – tap tiles into the right order
     line  – tap a line of code
     bins  – sort each item into one of two (or three) groups
   Any question can have its own "seconds". */
window.SITE_INFO = {
 badge: "Grade 11 · Unit 3 · Sprint 3.1 · Session 2 · Virtual",
 titleText: "SDLC Calculator Games",
 warmup: { label: "Warm-up", sub: "Guess today’s topic" },
 wrapup: { label: "Wrap-up", sub: "Prove you can plan an app" },
 lab: { label: "Explore", name: "Calculator Lab", sub: "Design it, colour it, test it" },
 titleHTML: "<span class=\"c1\">S</span><span class=\"c2\">D</span><span class=\"c3\">L</span><span class=\"c4\">C</span> <span class=\"c5\">G</span><span class=\"c1\">a</span><span class=\"c2\">m</span><span class=\"c3\">e</span><span class=\"c4\">s</span>"
};

const CALC_CODE = [
 "def calculate(a, op, b):",
 "    try:",
 "        if op == \"+\":",
 "            return a + b",
 "        if op == \"-\":",
 "            return a - b",
 "        if op == \"*\":",
 "            return a * b",
 "        if op == \"/\":",
 "            return a / b",
 "    except ZeroDivisionError:",
 "        return \"Cannot divide by 0\"",
 "",
 "print(calculate(8, \"/\", 2))",
 "print(calculate(5, \"/\", 0))"
];

window.GAMES = {
 warmup: {
  badge: "Unit 3 · Sprint 3.1 · Session 2 · Warm-up",
  name: "Build It Step by Step!",
  titleHTML: "<span class=\"c1\">B</span><span class=\"c2\">u</span><span class=\"c3\">i</span><span class=\"c4\">l</span><span class=\"c5\">d</span> <span class=\"c1\">I</span><span class=\"c2\">t</span><br><span class=\"c3\">S</span><span class=\"c4\">t</span><span class=\"c5\">e</span><span class=\"c1\">p</span> <span class=\"c2\">b</span><span class=\"c3\">y</span> <span class=\"c4\">S</span><span class=\"c5\">t</span><span class=\"c1\">e</span><span class=\"c2\">p</span>",
  intro: "Two teams, one painting, and a hidden topic. Every correct answer flips two letters. Answer fast, build a streak, and crack the topic for +200!",
  rules: [
   "Play on your own device (or with your breakout partner)",
   "Faster answers = more points",
   "3 right in a row = 🔥 streak bonus",
   "Crack the topic early: +200",
   "Watch your name climb on the teacher’s screen"
  ],
  seconds: 40,
  points: 100,
  floaters: ["+", "−", "×", "÷", "=", "√", "%", "7"],
  topic: "SDLC for a Calculator App",
  mystery: {
   label: "Today’s mystery topic",
   phrase: "SDLC CALCULATOR",
   order: [14, 6, 10, 2, 12, 8, 0, 11, 5, 13, 1, 9, 3, 7],
   perCorrect: 2,
   bonus: 200,
   accept: ["sdlc calculator", "sdlc for a calculator app", "sdlc calculator app", "calculator app", "sdlc", "software development life cycle", "calculator", "sdlc for calculator app"],
   finalQ: "Put all the clues together. What is today’s topic?",
   finalOptions: ["Binary Search", "SDLC for a Calculator App", "Cyber security", "Databases"],
   finalAnswer: 1,
   finalWhy: "Every clue was about building software in steps, through planning, requirements, design, coding, testing, deployment and maintenance. Today we use the SDLC to plan a Calculator App."
  },
  questions: [
   {
    type: "mc", ctx: "Painting A", skill: "Understand",
    q: "Team A sketches the WHOLE picture roughly, then improves all of it again and again. Which approach is this?",
    scene: "<span class=\"chip\" style=\"background:#9AA3C4\">✏️ sketch</span><span class=\"arrow\">→</span><span class=\"chip\" style=\"background:#FF8A3D\">🎨 colour</span><span class=\"arrow\">→</span><span class=\"chip\" style=\"background:#10C6B4\">✨ detail</span>",
    options: ["Iterative", "Incremental", "Random", "Waterfall"], answer: 0,
    why: "Iterative: build a rough version of the whole product first, then improve all of it in each cycle."
   },
   {
    type: "mc", ctx: "Painting B", skill: "Understand",
    q: "Team B finishes ONE part of the picture completely, then adds the next finished part. Which approach is this?",
    scene: "<span class=\"chip\" style=\"background:#FF5C8A\">🌞 sky ✓</span><span class=\"arrow\">+</span><span class=\"chip\" style=\"background:#2F80FF\">🏠 house ✓</span><span class=\"arrow\">+</span><span class=\"chip dim\">🌳 tree</span>",
    options: ["Iterative", "Incremental", "Testing", "Deployment"], answer: 1,
    why: "Incremental: build one finished piece at a time, adding complete parts until the whole product is ready."
   },
   {
    type: "bins", ctx: "Sort it", skill: "Analyze", seconds: 50,
    q: "Iterative or incremental? Sort each sentence.",
    bins: ["Iterative", "Incremental"],
    items: [
     { t: "A rough version of the whole app, improved each cycle", b: 0 },
     { t: "Login page finished first, then the shop page, then payments", b: 1 },
     { t: "Every cycle makes all features a little better", b: 0 },
     { t: "Add one complete feature in each release", b: 1 }
    ],
    why: "Iterative = improve the WHOLE thing each round. Incremental = add one COMPLETE part each round."
   },
   {
    type: "mc", ctx: "Same idea", skill: "Evaluate",
    q: "What do iterative AND incremental approaches have in common?",
    options: ["Users only see the app at the very end", "Software is delivered in steps and users give feedback early", "They skip testing", "They never need planning"], answer: 1,
    why: "Both deliver software in steps, so users give feedback early and problems are found sooner."
   },
   {
    type: "order", ctx: "First steps", skill: "Remember",
    q: "Every SDLC model starts the same way. Put the first four phases in order.",
    sub: "Tap the tiles in order.",
    tiles: ["Design", "Planning", "Coding", "Requirements"],
    answer: ["Planning", "Requirements", "Design", "Coding"],
    why: "Planning → Requirements → Design → Coding, then Testing, Deployment and Maintenance."
   },
   {
    type: "mc", ctx: "Bug hunt", skill: "Apply",
    q: "A calculator crashes when someone types 5 ÷ 0. In which phase should this be found BEFORE users see it?",
    scene: "<span class=\"chip\" style=\"background:#FF5C8A\">5 ÷ 0 = 💥</span>",
    options: ["Planning", "Design", "Testing", "Maintenance"], answer: 2,
    why: "Testing tries edge cases like dividing by zero, so bugs are fixed before release."
   },
   {
    type: "mc", ctx: "Start here", skill: "Understand",
    q: "You want to build a calculator app. What should the team do FIRST?",
    options: ["Write the code", "Plan: purpose, features, team and timeline", "Publish it on the app store", "Fix bugs"], answer: 1,
    why: "Planning comes first: decide the purpose, the features, the team and the timeline."
   }
  ],
  endHTML: "<div class=\"reveal\"><span class=\"pill\">Today's topic</span><div class=\"big\">SDLC: Calculator App</div><p class=\"lede\">Follow the 7 SDLC phases to plan a Calculator App from idea to release.</p></div>\n<div class=\"recap\"><div><b>Iterative</b>Improve the whole thing each cycle</div><div><b>Incremental</b>Add one finished part at a time</div><div><b>7 phases</b>Plan · Require · Design · Code · Test · Deploy · Maintain</div></div>"
 },

 wrapup: {
  badge: "Unit 3 · Sprint 3.1 · Session 2 · Wrap-up",
  name: "SDLC Showdown",
  titleHTML: "<span class=\"c1\">S</span><span class=\"c2\">D</span><span class=\"c3\">L</span><span class=\"c4\">C</span><br><span class=\"c5\">S</span><span class=\"c1\">h</span><span class=\"c2\">o</span><span class=\"c3\">w</span><span class=\"c4\">d</span><span class=\"c5\">o</span><span class=\"c1\">w</span><span class=\"c2\">n</span>",
  intro: "Ten challenges on the Calculator App: order the phases, sort the requirements, read the code and test it. Prove you can plan an app!",
  rules: [
   "Play on your own device (or with your breakout partner)",
   "Faster answers = more points",
   "3 right in a row = 🔥 streak bonus",
   "Sort cards into groups and tap code lines",
   "Watch your name climb on the teacher’s screen"
  ],
  seconds: 50,
  points: 100,
  floaters: ["SRS", "UI", "try", "÷0", "v1.1", "bug", "test", "✓"],
  topic: "SDLC for a Calculator App",
  exit: {
   q: "Name the 7 SDLC phases in order. What does the SRS contain? Give one edge case you would test on a calculator.",
   placeholder: "1. Planning, 2. ...",
   model: "Planning, Requirements, Design, Coding (implementation), Testing, Deployment, Maintenance. The SRS (Software Requirements Specification) lists the functional and non-functional requirements, the user interface, input and output, technical specifications, error handling and testing requirements. Edge cases: dividing by zero, very large numbers like 10**20, negatives like -7 × 3, decimals like 0.1 + 0.2."
  },
  questions: [
   {
    type: "order", ctx: "The cycle", skill: "Remember", seconds: 60,
    q: "Put all 7 SDLC phases in order.",
    sub: "Tap the tiles in order.",
    tiles: ["Testing", "Planning", "Maintenance", "Design", "Requirements", "Deployment", "Coding"],
    answer: ["Planning", "Requirements", "Design", "Coding", "Testing", "Deployment", "Maintenance"],
    why: "Planning → Requirements → Design → Coding → Testing → Deployment → Maintenance, and then the cycle starts again."
   },
   {
    type: "bins", ctx: "SRS", skill: "Analyze", seconds: 55,
    q: "Functional or non-functional? Sort the calculator requirements.",
    bins: ["Functional · WHAT it does", "Non-functional · HOW WELL"],
    items: [
     { t: "Adds, subtracts, multiplies and divides", b: 0 },
     { t: "Shows the result in under 1 second", b: 1 },
     { t: "Has a square root (sqrt) button", b: 0 },
     { t: "Easy to read for people with colour vision deficiency", b: 1 }
    ],
    why: "Functional requirements describe WHAT the app does. Non-functional requirements describe HOW WELL it works: speed, usability, accessibility."
   },
   {
    type: "mc", ctx: "Planning", skill: "Remember",
    q: "What is the OUTPUT of the planning phase for the Calculator App?",
    options: ["The finished app", "A requirement document that answers the big questions", "A list of bugs", "An app-store page"], answer: 1,
    why: "Planning answers questions like the purpose, the type of calculator and its features, and records them in a requirement document."
   },
   {
    type: "mc", ctx: "SRS", skill: "Remember",
    q: "What does SRS stand for?",
    options: ["Software Requirements Specification", "Simple Release Schedule", "System Repair Service", "Source Review Sheet"], answer: 0,
    why: "SRS = Software Requirements Specification: the document that defines exactly what the software must do."
   },
   {
    type: "mc", ctx: "Design", skill: "Understand",
    q: "In the DESIGN phase, what do you create for the calculator?",
    options: ["A UI diagram, a flowchart and a task list", "The final Python code", "App-store reviews", "Test results"], answer: 0,
    why: "Design turns the requirements into a blueprint: the user interface diagram, a flowchart and a task list."
   },
   {
    type: "mc", ctx: "Inclusive", skill: "Evaluate",
    q: "Which button design is BEST for users with colour vision deficiency?",
    scene: "<span class=\"chip\" style=\"background:#FF5C8A\">7</span><span class=\"chip\" style=\"background:#2F80FF\">+</span><span class=\"chip\" style=\"background:#FF8A3D\">=</span><span class=\"chip\" style=\"background:#10C6B4\">√</span>",
    options: ["All buttons the same light grey", "Red and green buttons only", "Four clearly contrasting colours with white labels", "No labels, just colours"], answer: 2,
    why: "Four clearly contrasting colours with white labels can be told apart by people with or without colour vision deficiency."
   },
   {
    type: "line", ctx: "Errors", skill: "Analyze",
    q: "Tap the line that CATCHES the divide-by-zero error.",
    code: CALC_CODE, answer: 10,
    why: "except ZeroDivisionError: catches the error, so the app returns a message instead of crashing."
   },
   {
    type: "mc", ctx: "Output", skill: "Apply",
    q: "What does line 15 print?",
    show: CALC_CODE,
    options: ["0", "Cannot divide by 0", "ZeroDivisionError (crash)", "5.0"], answer: 1,
    why: "5 / 0 raises ZeroDivisionError, the except block catches it and returns \"Cannot divide by 0\"."
   },
   {
    type: "mc", ctx: "Edge cases", skill: "Evaluate",
    q: "Which one is NOT an edge case for testing a calculator?",
    options: ["5 ÷ 0", "10**20", "0.1 + 0.2", "2 + 2"], answer: 3,
    why: "2 + 2 is a normal case. Edge cases sit at the limits: dividing by zero, huge numbers, negatives and decimals (0.1 + 0.2 gives 0.30000000000000004!)."
   },
   {
    type: "mc", ctx: "Maintenance", skill: "Understand",
    q: "Users ask for a % button after release. What happens next?",
    options: ["Nothing: the project is finished", "The feedback becomes a new requirement, so the cycle starts again", "The app is deleted", "Only the colours change"], answer: 1,
    why: "In maintenance, user feedback becomes new requirements, so the SDLC cycle starts again."
   }
  ],
  endHTML: "<div class=\"recap\"><div><b>Plan + Require</b>Questions → requirement document → SRS</div><div><b>Design + Code</b>UI, flowchart, Python with try-except</div><div><b>Test + Deploy + Maintain</b>Edge cases, release, feedback → new cycle</div></div>"
 }
};
