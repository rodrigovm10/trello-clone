-- Drop existing incomplete policy
DROP POLICY IF EXISTS "Authenticated workspace owners can create boards" ON public.board;

-- Enable RLS (should already be enabled, but ensuring it)
ALTER TABLE public.board ENABLE ROW LEVEL SECURITY;

-- Policy: Users can SELECT boards from workspaces they own
CREATE POLICY "Users can select boards from their workspaces"
ON public.board
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.workspace
    WHERE workspace.id = board.workspace_id
      AND workspace.user_id = auth.uid()
  )
);

-- Policy: Users can INSERT boards into workspaces they own
CREATE POLICY "Users can create boards in their workspaces"
ON public.board
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.workspace
    WHERE workspace.id = board.workspace_id
      AND workspace.user_id = auth.uid()
  )
);

-- Policy: Users can UPDATE boards in workspaces they own
CREATE POLICY "Users can update boards in their workspaces"
ON public.board
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.workspace
    WHERE workspace.id = board.workspace_id
      AND workspace.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.workspace
    WHERE workspace.id = board.workspace_id
      AND workspace.user_id = auth.uid()
  )
);

-- Policy: Users can DELETE boards in workspaces they own
CREATE POLICY "Users can delete boards in their workspaces"
ON public.board
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.workspace
    WHERE workspace.id = board.workspace_id
      AND workspace.user_id = auth.uid()
  )
);

