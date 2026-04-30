-- Roles enum + user_roles table (security: roles separate from profiles)
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to avoid recursive RLS
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Users can see their own roles; admins can see all
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Shared updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Portfolio sections (categories)
CREATE TABLE public.portfolio_sections (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sections are public"
  ON public.portfolio_sections FOR SELECT
  USING (true);

CREATE POLICY "Admins manage sections"
  ON public.portfolio_sections FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_portfolio_sections_updated
  BEFORE UPDATE ON public.portfolio_sections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Portfolio projects
CREATE TABLE public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id TEXT NOT NULL REFERENCES public.portfolio_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are public"
  ON public.portfolio_projects FOR SELECT
  USING (true);

CREATE POLICY "Admins manage projects"
  ON public.portfolio_projects FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_portfolio_projects_updated
  BEFORE UPDATE ON public.portfolio_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_portfolio_projects_section ON public.portfolio_projects(section_id, sort_order);

-- Contact messages
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a contact message
CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

-- Only admins can view/update/delete
CREATE POLICY "Admins view messages"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update messages"
  ON public.contact_messages FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete messages"
  ON public.contact_messages FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed sections
INSERT INTO public.portfolio_sections (id, title, subtitle, sort_order) VALUES
  ('social-media', 'Social Media Post Designs', 'Scroll-stopping posts crafted to grow brands and drive engagement.', 1),
  ('church-media', 'Church Media Post Designs', 'Reverent, welcoming flyers built around clarity and message.', 2),
  ('brand-identity', 'Brand Identity Design', 'Logo systems and visual identities that build trust and recall.', 3),
  ('business-card', 'Business Card Design', 'Professional, print-ready cards that leave a lasting impression.', 4);

-- Seed projects (image_url stored as the bundled-asset key; frontend resolves via import.meta.glob)
INSERT INTO public.portfolio_projects (section_id, title, image_url, sort_order) VALUES
  ('social-media', 'Imole Hairline — Brand Post', 'asset:social/sm-1.jpg', 1),
  ('social-media', 'Promotional Social Post', 'asset:social/sm-2.jpg', 2),
  ('social-media', 'Brand Campaign Post', 'asset:social/sm-4.jpg', 3),
  ('church-media', 'Church Event Flyer', 'asset:church/ch-1.jpg', 1),
  ('church-media', 'Sunday Service Design', 'asset:church/ch-2.jpg', 2),
  ('church-media', 'The Glorious Family Ministries', 'asset:church/ch-3.jpg', 3),
  ('church-media', 'Church Program Flyer', 'asset:church/ch-4.jpg', 4),
  ('brand-identity', 'Annie — Logo Mockup', 'asset:brand/brand-1.jpg', 1),
  ('brand-identity', 'Brand Identity Concept', 'asset:brand/brand-2.jpg', 2),
  ('brand-identity', 'Logo Presentation Mockup', 'asset:brand/brand-3.jpg', 3),
  ('business-card', 'Business Card Design', 'asset:business/biz-1.jpg', 1);