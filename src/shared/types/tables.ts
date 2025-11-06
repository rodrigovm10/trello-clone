import { Enums, Tables } from './supabase'

export type Workspace = Tables<'workspace'>
export type Board = Tables<'board'>
export type Task = Tables<'task'>
export type Activity = Tables<'activity'>
export type WorkspaceMember = Tables<'workspace_members'>
export type RoleMember = Enums<'role_member'>
