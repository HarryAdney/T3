# Authentication Setup Guide

This guide explains how to set up and use the new authentication system for the Thoralby Through Time site.

## Overview

The site now has role-based access control with three user roles:

- **Viewer**: Can only view published content (default for new users)
- **Editor**: Can edit and publish content using the Puck editor
- **Admin**: Full access including user management and all editor permissions

## Features Implemented

### 1. Database

- `user_profiles` table stores user information and roles
- Automatic profile creation when users sign up
- Row Level Security (RLS) policies enforce role-based access

### 2. Authentication Methods

- **Email/Password**: Traditional login with email and password
- **Magic Link**: Passwordless login via email link

### 3. Protected Routes

- `/editor` - Requires authentication + editor or admin role
- `/admin` - Requires authentication + admin role

### 4. User Interface

- Login screen with tabbed interface for password/magic link
- Editor page shows user info and logout button
- Admin panel for managing user roles
- Access denied screens for unauthorized users

## Getting Started

### Step 1: Create Your First Admin User

Since new users default to the "viewer" role, you'll need to create an admin user directly in the Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Users**
3. Click **Add User** and create a new user with email/password
4. Note the user's ID from the users list
5. Go to **Table Editor** > **user_profiles**
6. Find the row with that user ID
7. Change the `role` field from `viewer` to `admin`
8. Save the changes

### Step 2: Sign In

1. Visit `/editor` or `/admin` on your site
2. You'll be redirected to the login page
3. Sign in with your admin credentials

### Step 3: Manage Users (Admin Only)

Once signed in as an admin:

1. Visit `/admin` to access the user management panel
2. You'll see a list of all registered users
3. Use the dropdown menu to change user roles:
   - Set users to **Editor** to let them edit content
   - Set users to **Admin** to give them full access
   - Set users to **Viewer** to remove editing permissions

## Using the Editor

To edit site content:

1. Make sure your user has the **Editor** or **Admin** role
2. Visit `/editor` on your site
3. Sign in if not already authenticated
4. Use the Puck visual editor to modify content
5. Click **Publish** to save changes

The editor page displays your email and current role in the top right corner.

## User Signup

New users can be added in two ways:

1. **Via Supabase Dashboard** (recommended for admins):
   - Go to Authentication > Users
   - Click "Add User"
   - User profile is created automatically with "viewer" role
   - Admin can then upgrade the role via `/admin`

2. **Via Magic Link** (for existing users):
   - Users can request a magic link at the login page
   - They'll need an admin to upgrade their role afterward

## Security Notes

- All database operations are protected by Row Level Security (RLS)
- Only editors and admins can modify content
- Only admins can change user roles
- Users cannot change their own role
- Magic link emails redirect to `/editor` by default

## Troubleshooting

### "Access Denied" on Editor Page

- Verify your user role in Supabase dashboard
- Make sure it's set to "editor" or "admin"
- Try signing out and back in

### Magic Link Not Working

- Check your Supabase email settings
- Verify the redirect URL is correct
- Look for the email in spam folder

### Cannot Save Changes

- Ensure you're signed in
- Check that you have editor or admin role
- Look for error messages in the browser console

## Important Files

- `/src/contexts/AuthContext.tsx` - Authentication logic
- `/src/components/Login.tsx` - Login interface
- `/src/pages/Editor.tsx` - Protected editor page
- `/src/pages/Admin.tsx` - User management interface
- `/supabase/migrations/*user_profiles*` - Database setup

## Next Steps

Consider:

- Setting up custom email templates in Supabase
- Adding password reset functionality
- Implementing invitation system for new users
- Adding audit logs for user actions
- Creating role-specific dashboards
