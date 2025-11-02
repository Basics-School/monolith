import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Tailwind,
    Text,
} from '@react-email/components';

interface MagicLinkEmailProps {
    loginCode?: string;
    loginUrl?: string;
    companyName?: string;
    logoUrl?: string;
}

export type { MagicLinkEmailProps };

export const MagicLinkEmail = ({
    loginCode,
    loginUrl = '#',
    companyName = 'Our Platform',
    logoUrl,
}: MagicLinkEmailProps) => (
    <Html>
        <Head />
        <Preview>Log in with this magic link</Preview>
        <Tailwind>
            <Body className="bg-white font-sans">
                <Container className="mx-auto px-3 py-0">
                    <Heading className="my-10 px-0 text-[24px] font-bold text-gray-800">
                        Login
                    </Heading>
                    <Link
                        href={ loginUrl }
                        target="_blank"
                        className="mb-4 block text-[14px] text-blue-600 underline"
                    >
                        Click here to log in with this magic link
                    </Link>
                    <Text className="mb-3.5 text-[14px] text-gray-800">
                        Or, copy and paste this temporary login code:
                    </Text>
                    <Text className="mb-0 inline-block w-[90.5%] rounded border border-gray-200 bg-gray-50 px-4 py-4 text-gray-800">
                        { loginCode }
                    </Text>
                    <Text className="mb-4 mt-3.5 text-[14px] text-gray-500">
                        If you didn&apos;t try to login, you can safely ignore this email.
                    </Text>
                    <Text className="mb-10 mt-3 text-[14px] text-gray-500">
                        Hint: You can set a permanent password in your account settings.
                    </Text>
                    { logoUrl && (
                        <Img
                            src={ logoUrl }
                            width="32"
                            height="32"
                            alt={ `${companyName} Logo` }
                        />
                    ) }
                    <Text className="mb-6 mt-3 text-[12px] leading-[22px] text-gray-500">
                        <Link
                            href={ loginUrl }
                            target="_blank"
                            className="text-gray-500"
                        >
                            { companyName }
                        </Link>
                        , your all-in-one workspace
                        <br />
                        for productivity and collaboration.
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

MagicLinkEmail.PreviewProps = {
    loginCode: 'sparo-ndigo-amurt-secan',
    loginUrl: 'https://example.com/login',
    companyName: 'Acme Corp',
    logoUrl: '/static/company-logo.png',
} as MagicLinkEmailProps;

export default MagicLinkEmail;
