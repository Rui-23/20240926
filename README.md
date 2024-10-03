<div align="center">
  <h2 align="center">PDF Page Rotator</h2>
  <div align="center">A clone of <a href="https://pdf.ai/tools/rotate-pdf" target="_blank"><b>PDF.ai</b></a> product, PDF Page Rotator allows users to upload or drag and drop PDF files, rotate individual pages or all pages at once, and download the modified version.</div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

The **PDF Page Rotator** web app provides an easy and intuitive way to manipulate PDF files. Users can simply upload or drag and drop a PDF, click to rotate pages, and download the rotated version. This is especially useful when dealing with scanned documents or misaligned pages.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PDF Handling**: react-pdf

## <a name="features">🔋 Features</a>

- **Drag and Drop Support**: Upload a PDF file from your local computer by dragging it into the app or using the file input.
- **Rotate Pages**: Click on any individual page to rotate it by 90-degree increments.
- **Rotate All Pages**: Apply rotation to all pages at once with a 'Rotate All' button.
- **Zoom In/Out**: Scale PDF pages with zoom buttons, providing feedback when zooming hits the max or min.
- **Download Rotated PDF**: After rotating pages, users can download the new version of the PDF.
- **Smooth Animations**: Pages rotate smoothly while maintaining their structure.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/Rui-23/20240926
cd 20240926
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
