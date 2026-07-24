import { useState, useEffect, useRef, useCallback } from "react"
import nodemailer from 'nodemailer';
import NewsAggregation from "./projects/NewsAggregation";
import Pokemon from "./projects/Pokemon";
import CollegeCourseManager from "./projects/Course"
import HomePage from "./home.tsx"
import { Routes, Route } from "react-router-dom";

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/projects/news-aggregation"
        element={<NewsAggregation />}
      />
      <Route
        path="/projects/pokemon"
        element={<Pokemon />}
      />
      <Route
        path="/projects/course"
        element={<CollegeCourseManager />}
      />
    </Routes>
  );
}