import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';

interface VerifyIdentityEmailProps {
    validationCode?: string;
    companyName?: string;
    logoUrl?: string;
    supportEmail?: string;
    verificationContext?: string;
}

export type { VerifyIdentityEmailProps };

export const VerifyIdentityEmail = ({
    validationCode,
    companyName = 'Our Platform',
    logoUrl,
    supportEmail = 'support@example.com',
    verificationContext = 'complete your verification',
}: VerifyIdentityEmailProps) => (
    <Html>
        <Head />
        <Tailwind>
            <Body className="bg-white font-sans">
                <Container className="mx-auto mt-5 max-w-[360px] rounded border border-gray-200 bg-white px-0 py-[68px] shadow-lg">
                    { logoUrl && (
                        <Img
                            src={ logoUrl }
                            width="212"
                            height="88"
                            alt={ companyName }
                            className="mx-auto"
                        />
                    ) }
                    <Text className="mx-2 my-4 h-4 text-center text-[11px] font-bold uppercase tracking-normal text-blue-600">
                        Verify Your Identity
                    </Text>
                    <Heading className="mx-0 mb-0 mt-0 inline-block text-center text-[20px] font-medium text-black">
                        Enter the following code to { verificationContext }.
                    </Heading>
                    <Section className="mx-auto my-4 w-[280px] rounded bg-gray-50 align-middle">
                        <Text className="mx-auto my-0 inline-block w-full py-2 text-center text-[32px] font-bold tracking-[6px] text-black">
                            { validationCode }
                        </Text>
                    </Section>
                    <Text className="mx-10 my-0 text-center text-[15px] text-gray-600">
                        Not expecting this email?
                    </Text>
                    <Text className="mx-10 my-0 text-center text-[15px] text-gray-600">
                        Contact{ ' ' }
                        <Link href={ `mailto:${supportEmail}` } className="text-gray-600 underline">
                            { supportEmail }
                        </Link>{ ' ' }
                        if you did not request this code.
                    </Text>
                </Container>
                <Text className="mx-0 mt-5 text-center text-[12px] font-extrabold uppercase text-black">
                    Securely powered by { companyName }.
                </Text>
            </Body>
        </Tailwind>
    </Html>
);

VerifyIdentityEmail.PreviewProps = {
    validationCode: '144833',
    companyName: 'Acme Corp',
    logoUrl: '/static/company-logo.png',
    supportEmail: 'support@acme.com',
    verificationContext: 'finish linking your account',
} as VerifyIdentityEmailProps;

export default VerifyIdentityEmail;
