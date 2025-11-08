"use client";

import { useState } from "react";
import { OnboardingEmail } from "@/components/onboarding/email-step";
import { OnboardingPassword } from "@/components/onboarding/password-step";
import { OnboardingVerify } from "@/components/onboarding/verify-step";
import { OnboardingProfile } from "@/components/onboarding/profile-step";
import { OnboardingInvite } from "@/components/onboarding/invite-step";

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */ }
            <header className="flex items-center justify-between p-4 sm:p-6">
                <div className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
                        <svg
                            className="size-6 text-primary-foreground"
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
                    <span className="text-xl font-semibold">Oworthy</span>
                </div>
                { step === 1 && (
                    <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                    >
                        Want to learn more?{ " " }
                        <span className="underline">Schedule a demo</span>
                    </a>
                ) }
            </header>

            {/* Main Content */ }
            <main className="flex flex-1 items-center justify-center p-4">
                <div className="w-full max-w-6xl">
                    { step === 1 && (
                        <OnboardingEmail
                            onNext={ (emailValue) => {
                                setEmail(emailValue);
                                setStep(2);
                            } }
                        />
                    ) }
                    { step === 2 && (
                        <OnboardingPassword
                            email={ email }
                            onNext={ () => setStep(3) }
                            onBack={ () => setStep(1) }
                        />
                    ) }
                    { step === 3 && (
                        <OnboardingVerify
                            email={ email }
                            onNext={ () => setStep(4) }
                            onBack={ () => setStep(2) }
                        />
                    ) }
                    { step === 4 && (
                        <OnboardingProfile
                            email={ email }
                            onNext={ () => setStep(5) }
                        />
                    ) }
                    { step === 5 && (
                        <OnboardingInvite
                            onNext={ () => {
                                // Redirect to dashboard
                                window.location.href = "/dashboard";
                            } }
                            onSkip={ () => {
                                // Redirect to dashboard
                                window.location.href = "/dashboard";
                            } }
                        />
                    ) }
                </div>
            </main>

            {/* Footer */ }
            <footer className="flex items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <div className="flex size-5 items-center justify-center rounded bg-muted">
                        <svg
                            className="size-3"
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
                    <span className="font-medium text-foreground">Oworthy</span>
                </div>
                <span className="text-muted-foreground/50">curated by</span>
                <span className="font-semibold text-foreground">Mobbin</span>
            </footer>
        </div>
    );
}
