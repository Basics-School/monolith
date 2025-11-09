"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { updateUserAction, createOrganizationAction } from "@/actions/auth";

interface OnboardingProfileProps {
    email: string;
    onNext: () => void;
}

export function OnboardingProfile({ email, onNext }: OnboardingProfileProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName || !lastName || !organizationName) return;

        setLoading(true);
        setError("");

        // Update user name
        const fullName = `${firstName} ${lastName}`;
        const updateResult = await updateUserAction({ name: fullName });

        if (!updateResult.success) {
            setError(updateResult.error || "Failed to update profile");
            setLoading(false);
            return;
        }

        // Create organization
        const slug = organizationName.toLowerCase().replace(/\s+/g, "-");
        const orgResult = await createOrganizationAction({
            name: organizationName,
            slug,
        });

        if (!orgResult.success) {
            setError(orgResult.error || "Failed to create organization");
            setLoading(false);
            return;
        }

        setLoading(false);
        onNext();
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
                <div className="flex flex-col items-center space-y-3">
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-primary">
                        <svg
                            className="size-8 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={ 2 }
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold">
                        Tell us a bit more about you
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex size-5 items-center justify-center rounded-full bg-muted">
                            <span className="text-xs">{ email?.[0]?.toUpperCase() || "U" }</span>
                        </div>
                        <span>{ email }</span>
                    </div>
                </div>

                <form onSubmit={ handleSubmit } className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="firstName"
                                className="text-sm font-medium"
                            >
                                First name
                            </label>
                            <Input
                                id="firstName"
                                type="text"
                                placeholder="Alex"
                                value={ firstName }
                                onChange={ (e) => setFirstName(e.target.value) }
                                required
                                autoFocus
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="lastName"
                                className="text-sm font-medium"
                            >
                                Last name
                            </label>
                            <Input
                                id="lastName"
                                type="text"
                                placeholder="Smith"
                                value={ lastName }
                                onChange={ (e) => setLastName(e.target.value) }
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="organizationName" className="text-sm font-medium">
                            Organization name
                        </label>
                        <Input
                            id="organizationName"
                            type="text"
                            placeholder="alex-mobbin"
                            value={ organizationName }
                            onChange={ (e) => setOrganizationName(e.target.value) }
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            Your organization name may be displayed to your customers.
                        </p>
                    </div>

                    { error && (
                        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                            { error }
                        </div>
                    ) }

                    <Button type="submit" className="w-full" disabled={ loading }>
                        { loading ? "Setting up..." : "Continue" }
                        <svg
                            className="size-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={ 2 }
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Button>
                </form>
            </div>
        </div>
    );
}
