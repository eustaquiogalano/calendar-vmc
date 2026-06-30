# School Online Service — School Document Request & Academic Calendar Web App

A web application built for [School Name] that digitizes two student-facing services: an academic calendar and an online document request system. The project was developed as a college capstone to address the inefficiencies of the current manual, onsite-only document request process.

## Overview

Students previously had to visit the registrar's office in person just to request academic documents (e.g., Transcript of Records, Certificate of Enrollment, Good Moral Certificate), even before the document was ready. This system removes that initial onsite step — students can now submit a request online, track its status, and only visit in person once the document is confirmed ready for pickup.

The system also includes an academic calendar module, giving students a centralized place to view upcoming and past school events without relying on physical postings or announcements.

## Features

### Student
- Register and log in to a personal dashboard
- View upcoming and past academic calendar events
- Submit a document request from a fixed list of document types
- Track the status of submitted requests (Pending → Processing → Ready for Pickup → Completed)

### Admin
- Log in to a dedicated admin dashboard
- Create, edit, and delete academic calendar events
- Manage the list of requestable document types
- View and update the status of incoming document requests

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui
- **Backend / Auth / Database:** Supabase
- **Deployment:** Cloudflare Pages
- **Version Control:** Git, GitHub

## Status Flow

Document requests move through the following stages, set by the admin:

```
Pending → Processing → Ready for Pickup → Completed
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm
- A Supabase project (URL and anon key)

### Installation

```bash
git clone https://github.com/eustaquiogalano/[repo-name].git
cd [repo-name]
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

## Usage

- **Students** register with their school email and can immediately log in to view the calendar and submit document requests.
- **Admins** log in through a separate admin account to manage events, document types, and request statuses.

## Project Structure

```
src/
├── components/      # Reusable UI components (shadcn/ui based)
├── pages/           # Student and admin dashboard pages
├── context/         # Auth and state management
├── lib/             # Supabase client and helper functions
└── assets/          # Images and static assets
```

## Known Limitations

- **No online payment** — document fees are paid in cash upon pickup.
- **No automated email/SMS notification yet** — students currently need to check their dashboard manually to see if a request status has changed. *(Email notification on "Ready for Pickup" is planned — see Future Enhancements.)*
- Document pickup itself still requires an onsite visit; only the initial request step has been moved online.

## Future Enhancements

- Email notification to students when their document is marked "Ready for Pickup"
- Optional online payment integration
- SMS notification as an alternative to email
- Admin analytics/reporting on request volume and turnaround time

## Author

Eustaquio
Developed as a capstone project, [2025]

## Acknowledgments

- School Registrar's Office, for process insights during requirements gathering