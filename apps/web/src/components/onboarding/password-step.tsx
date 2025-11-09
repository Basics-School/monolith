"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signupAction, sendVerificationOTPAction } from "@/actions/auth";

interface OnboardingPasswordProps {
    email: string;
    onNext: () => void;
    onBack: () => void;
}

export function OnboardingPassword({
    email,
    onNext,
    onBack,
}: OnboardingPasswordProps) {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) return;

        setLoading(true);
        setError("");

        // Create account
        const signupResult = await signupAction({
            email,
            password,
            name: email.split("@")[0], // Temporary name
        });

        if (!signupResult.success) {
            setError(signupResult.error || "Failed to create account");
            setLoading(false);
            return;
        }

        // Send verification OTP
        const otpResult = await sendVerificationOTPAction(email);

        if (!otpResult.success) {
            setError(otpResult.error || "Failed to send verification code");
            setLoading(false);
            return;
        }

        setLoading(false);
        onNext();
    };

    const handleEmailCode = () => {
        // TODO: Implement email code functionality
        console.log("Send email code");
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold">
                        Create your Oworthy Account
                    </h1>
                </div>

                <form onSubmit={ handleSubmit } className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <div className="text-sm text-muted-foreground">
                            { email }
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={ showPassword ? "text" : "password" }
                                placeholder="Create a password"
                                value={ password }
                                onChange={ (e) => setPassword(e.target.value) }
                                required
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={ () => setShowPassword(!showPassword) }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                { showPassword ? (
                                    <EyeOffIcon className="size-4" />
                                ) : (
                                    <EyeIcon className="size-4" />
                                ) }
                            </button>
                        </div>
                    </div>

                    { error && (
                        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                            { error }
                        </div>
                    ) }

                    <Button type="submit" className="w-full" disabled={ loading }>
                        { loading ? "Creating account..." : "Continue" }
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or
                            </span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={ handleEmailCode }
                    >
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
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        Continue with email code
                    </Button>

                    <button
                        type="button"
                        onClick={ onBack }
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
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
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Go back
                    </button>
                </form>
            </div>
        </div>
    );
}
