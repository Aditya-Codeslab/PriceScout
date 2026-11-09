-- ==============================================================================
-- PriceScout PostgreSQL / Supabase Schema
-- Tables: saved_products, price_alerts, student_verifications
-- Enforces Row-Level Security (RLS) so authenticated users only access their own rows.
-- ==============================================================================

-- 1. SAVED PRODUCTS TABLE
-- Stores user wishlist / bookmarked products
CREATE TABLE IF NOT EXISTS public.saved_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_user_product UNIQUE (user_id, product_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.saved_products ENABLE ROW LEVEL SECURITY;

-- Policies for saved_products
CREATE POLICY "Users can view their own saved products"
    ON public.saved_products
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved products"
    ON public.saved_products
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved products"
    ON public.saved_products
    FOR DELETE
    USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_saved_products_user ON public.saved_products(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_products_product ON public.saved_products(product_id);


-- 2. PRICE ALERTS TABLE
-- Stores automated price drop notification triggers
CREATE TABLE IF NOT EXISTS public.price_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    target_price NUMERIC(10, 2) NOT NULL,
    email TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    triggered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_user_product_alert UNIQUE (user_id, product_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.price_alerts ENABLE ROW LEVEL SECURITY;

-- Policies for price_alerts
CREATE POLICY "Users can view their own price alerts"
    ON public.price_alerts
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own price alerts"
    ON public.price_alerts
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own price alerts"
    ON public.price_alerts
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own price alerts"
    ON public.price_alerts
    FOR DELETE
    USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_price_alerts_user ON public.price_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_price_alerts_product ON public.price_alerts(product_id);
CREATE INDEX IF NOT EXISTS idx_price_alerts_active ON public.price_alerts(is_active) WHERE is_active = true;


-- 3. STUDENT VERIFICATIONS TABLE
-- Stores minimum verification data (status: pending, verified, failed)
CREATE TABLE IF NOT EXISTS public.student_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    college_email TEXT NOT NULL,
    institution_name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'verified', 'failed')) DEFAULT 'pending',
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.student_verifications ENABLE ROW LEVEL SECURITY;

-- Policies for student_verifications
CREATE POLICY "Users can view their own student verification"
    ON public.student_verifications
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can submit their student verification"
    ON public.student_verifications
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their student verification"
    ON public.student_verifications
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_student_verifications_user ON public.student_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_student_verifications_status ON public.student_verifications(status);
