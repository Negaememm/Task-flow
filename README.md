# TaskFlow — Personal Task Manager

TaskFlow is a calm, responsive task manager for keeping everyday work in one place. Add tasks with a category and optional due date, then edit, complete, search, or remove them as your plans change. Your tasks and preferred light or dark theme stay saved in this browser between visits.

## Features

- Add, edit, delete, and complete tasks
- Filter tasks by All, In progress, and Completed
- Search by task title, description, or category
- Personal, Work, Study, and Urgent categories
- Optional due dates with overdue indicators
- Live total, remaining, and completed task counts
- Responsive desktop and mobile layouts with a mobile navigation drawer
- Light and dark themes, with the selected theme saved locally
- Starter tasks to make the first view useful; edit or delete them as you like
- No account or external service required

## Technologies

- React with functional components and hooks
- Vite for the development server and production build
- Plain CSS for responsive styling and theme variables
- Lucide React for interface icons
- Browser `localStorage` for persistence

## Run locally

Install a current version of Node.js, then open a terminal in the `taskflow` folder and run:

```bash
npm install
npm run dev
```

Open the local address printed by Vite (usually `http://localhost:5173`). To make and preview a production build:

```bash
npm run build
npm run preview
```

## Screenshots

Add your own screenshots to `screenshots/` after running the app. The folder's README lists useful views to capture. Replace this text with image links when you have them, for example `![TaskFlow dashboard](screenshots/dashboard.png)`.

## React concepts demonstrated

- **Functional components:** the app is split into `Sidebar`, `StatsCards`, `TaskForm`, `TaskList`, and `TaskItem`, each with one clear job.
- **Props and callbacks:** `App` passes task data and counts down to child components. Child buttons call callback props such as `onToggle` and `onSave` to ask the parent to update state.
- **`useState`:** stores tasks, the selected filter, search text, the theme, and whether the form or mobile menu is open.
- **`useEffect`:** keeps task and theme changes in `localStorage` and applies the selected theme to the document.
- **Controlled input:** the search field's displayed value comes from React state and its `onChange` handler updates that state. The task form uses named native form fields and `FormData` to keep the form easy to follow.
- **`map` and unique keys:** arrays of filters, categories, statistics, and tasks are rendered with `.map()`. Each repeated item has a stable `key`.
- **Conditional rendering:** the task list shows a helpful empty state when there are no matching tasks, and task appearance changes when completed.
- **Derived data:** counts and visible tasks are calculated from the task state, so the dashboard stays in sync after every action.

## Project structure

```text
taskflow/
├── screenshots/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── StatsCards.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   ├── App.jsx
│   ├── data.js
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Known limitations

- Data is stored in this browser only; it does not sync between devices or browsers.
- Clearing this site's browser storage removes saved tasks and resets the theme.
- There is no sign-in, cloud backup, recurring-task support, or collaboration.
- The starter tasks are sample content and can be edited or deleted.

