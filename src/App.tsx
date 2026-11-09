/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ProductPage } from './pages/ProductPage';
import { ComparePage } from './pages/ComparePage';
import { AssistantPage } from './pages/AssistantPage';
import { SavedPage } from './pages/SavedPage';
import { AuthPage } from './pages/AuthPage';
import { StudentPage } from './pages/StudentPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { DealsPage } from './pages/DealsPage';
import { AboutPage } from './pages/static/AboutPage';
import { DisclosurePage } from './pages/static/DisclosurePage';
import { PrivacyPage } from './pages/static/PrivacyPage';
import { TermsPage } from './pages/static/TermsPage';
import { ContactPage } from './pages/static/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AffiliateRedirectPage } from './pages/AffiliateRedirectPage';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/go/:offerId" element={<AffiliateRedirectPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/disclosure" element={<DisclosurePage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
