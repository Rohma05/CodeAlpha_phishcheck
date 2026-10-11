# PhishCheck

**An interactive, multi-page course that teaches people to spot phishing emails, texts and phone scams.**

Live site: https://YOUR-USERNAME.github.io/phishcheck/

PhishCheck is a security awareness project built with plain HTML, CSS and JavaScript. There is nothing to install and no backend, so it runs in any browser and on any phone.

## What's inside

| Page | What it does |
|------|--------------|
| Home | Overview of the course and a quick look at a fake inbox |
| Types of phishing | Email, spear phishing, smishing, vishing, fake websites and CEO fraud, plus the psychological tricks attackers use |
| Red flags | Click through four examples (suspicious email, genuine email, fake invoice, scam text) and see why each detail is or isn't a warning sign |
| Real cases | Podesta 2016, RSA 2011, Twitter 2020 and the Google/Facebook invoice fraud |
| Stay safe | Everyday habits and a step-by-step plan for what to do after clicking |
| Glossary | Plain-English definitions of common security terms |
| Checklist | A printable "before you click" list |
| Quiz | 20 scenario questions with shuffled order and answers, instant feedback and a review at the end |

## Design choices
- The quiz includes genuine messages, so learners practise telling real from fake instead of assuming everything is a scam.
- Answer options are written to be similar in length, and their positions are shuffled each attempt, so the right answer can't be guessed from its shape.
- Keyboard-friendly, with visible focus, a skip link, and support for reduced-motion settings.
- Responsive layout for phones, tablets and desktops.

## Run it locally
1. Download or clone this repository.
2. Open `index.html` in your browser.

Optional: in VS Code, install the Live Server extension, right-click `index.html` and choose Open with Live Server.

## Project structure
```
phishcheck/
  index.html, types.html, red-flags.html, cases.html,
  stay-safe.html, glossary.html, checklist.html, quiz.html
  css/style.css
  js/redflags.js    red-flag explorer
  js/quiz.js        quiz questions and logic
```

## Editing the quiz
Questions live in the `Q` array at the top of `js/quiz.js`. Each one has the question text, four options, the index of the correct answer (`a`, counting from 0) and an explanation. Keep the options a similar length.

## Built with
HTML5, CSS3, vanilla JavaScript. Fonts: Bricolage Grotesque and IBM Plex Sans via Google Fonts.

## Disclaimer
For education only. All email addresses, links and phone numbers in the examples are invented. The case studies summarise publicly reported incidents.

## Author
Made by Rohma Kashaf. Feel free to open an issue with suggestions.
