-- Add explicit restrictive policies on user_roles to make it impossible for
-- non-admin authenticated users to insert/update/delete rows (e.g. self-grant admin).
-- The existing "Admins can manage roles" ALL policy already restricts via has_role,
-- but adding explicit per-command policies makes intent clear and defense-in-depth.

-- Drop and recreate the ALL policy as explicit per-command policies for clarity
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));