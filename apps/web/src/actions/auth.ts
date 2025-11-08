"use server";

import { auth } from "@workspace/better-auth";
import { headers } from "next/headers";

export interface SignupData {
	email: string;
	password: string;
	name: string;
}

export interface CreateOrganizationData {
	name: string;
	slug?: string;
}

/**
 * Sign up a new user with email and password
 */
export async function signupAction(data: SignupData) {
	try {
		const response = await auth.api.signUpEmail({
			body: {
				email: data.email,
				password: data.password,
				name: data.name,
			},
			headers: await headers(),
		});

		if (!response) {
			return {
				success: false,
				error: "Failed to create account",
			};
		}

		return {
			success: true,
			data: response,
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "An error occurred during signup",
		};
	}
}

/**
 * Send verification OTP to email
 */
export async function sendVerificationOTPAction(email: string) {
	try {
		await auth.api.sendVerificationOtp({
			body: {
				email,
				type: "email-verification",
			},
			headers: await headers(),
		});

		return {
			success: true,
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Failed to send verification code",
		};
	}
}

/**
 * Verify email with OTP code
 */
export async function verifyEmailOTPAction(email: string, otp: string) {
	try {
		const response = await auth.api.verifyEmail({
			body: {
				email,
				otp,
			},
			headers: await headers(),
		});

		return {
			success: true,
			data: response,
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Invalid verification code",
		};
	}
}

/**
 * Update user profile information
 */
export async function updateUserAction(data: { name?: string }) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return {
				success: false,
				error: "Not authenticated",
			};
		}

		const response = await auth.api.updateUser({
			body: {
				name: data.name,
			},
			headers: await headers(),
		});

		return {
			success: true,
			data: response,
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Failed to update profile",
		};
	}
}

/**
 * Create a new organization for the user
 */
export async function createOrganizationAction(data: CreateOrganizationData) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return {
				success: false,
				error: "Not authenticated",
			};
		}

		const response = await auth.api.createOrganization({
			body: {
				name: data.name,
				slug: data.slug,
			},
			headers: await headers(),
		});

		return {
			success: true,
			data: response,
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Failed to create organization",
		};
	}
}

/**
 * Send invitation emails to team members
 */
export async function inviteTeamMembersAction(
	organizationId: string,
	emails: string[],
) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return {
				success: false,
				error: "Not authenticated",
			};
		}

		// Send invitations for each email
		const invitations = await Promise.all(
			emails.map((email) =>
				auth.api.inviteMember({
					body: {
						organizationId,
						email,
						role: "member",
					},
					headers: headers(),
				}),
			),
		);

		return {
			success: true,
			data: invitations,
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Failed to send invitations",
		};
	}
}

/**
 * Get current user session
 */
export async function getSessionAction() {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		return {
			success: true,
			data: session,
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Failed to get session",
		};
	}
}
