"use client";

import { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@workspace/ui/components/input-otp";
import { verifyEmailOTPAction } from "@/actions/auth";

interface OnboardingVerifyProps {
    email: string;
    onNext: () => void;
    onBack: () => void;
}

export function OnboardingVerify({
    email,
    onNext,
    onBack,
}: OnboardingVerifyProps) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleComplete = async (code: string) => {
        setLoading(true);
        setError("");

        const result = await verifyEmailOTPAction(email, code);

        if (!result.success) {
            setError(result.error || "Invalid one-time code");
            setLoading(false);
            setTimeout(() => {
                setValue("");
                setError("");
            }, 1500);
            return;
        }

        setLoading(false);
        onNext();
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary">
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
                    <h1 className="text-2xl font-semibold">Verify your email</h1>
                </div>

                <div className="space-y-6">
                    <div className="rounded-lg bg-muted/30 p-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Enter the code sent to
                        </p>
                        <p className="mt-1 font-medium">{ email }</p>

                        <div className="mt-6 flex justify-center">
                            <InputOTP
                                maxLength={ 6 }
                                value={ value }
                                onChange={ (newValue) => {
                                    setValue(newValue);
                                    setError("");
                                    if (newValue.length === 6) {
                                        handleComplete(newValue);
                                    }
                                } }
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={ 0 } />
                                    <InputOTPSlot index={ 1 } />
                                    <InputOTPSlot index={ 2 } />
                                    <InputOTPSlot index={ 3 } />
                                    <InputOTPSlot index={ 4 } />
                                    <InputOTPSlot index={ 5 } />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        { error && (
                            <p className="mt-3 text-sm text-destructive">
                                { error }
                            </p>
                        ) }
                    </div>

                    <button
                        type="button"
                        onClick={ onBack }
                        className="flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
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
                        Back to sign-in
                    </button>
                </div>
            </div>
        </div>
    );
}
