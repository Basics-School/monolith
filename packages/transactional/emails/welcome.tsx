import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';

interface WelcomeEmailProps {
    companyName?: string;
    logoUrl?: string;
    dashboardUrl?: string;
    docsUrl?: string;
    supportUrl?: string;
    companyAddress?: string;
}

export type { WelcomeEmailProps };

export const WelcomeEmail = ({
    companyName = 'Our Platform',
    logoUrl,
    dashboardUrl = '#',
    docsUrl = '#',
    supportUrl = '#',
    companyAddress,
}: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>You're now ready to make live transactions with { companyName }!</Preview>
        <Tailwind>
            <Body className="bg-gray-50 font-sans">
                <Container className="mx-auto mb-16 bg-white px-0 pb-12 pt-5">
                    <Section className="px-12">
                        { logoUrl && (
                            <Img
                                src={ logoUrl }
                                width="49"
                                height="21"
                                alt={ companyName }
                            />
                        ) }
                        <Hr className="my-5 border-gray-200" />
                        <Text className="text-left text-[16px] leading-6 text-gray-600">
                            Thanks for submitting your account information. You're now ready to
                            make live transactions with { companyName }!
                        </Text>
                        <Text className="text-left text-[16px] leading-6 text-gray-600">
                            You can view your payments and a variety of other information about
                            your account right from your dashboard.
                        </Text>
                        <Button
                            className="block w-full rounded bg-indigo-600 px-2.5 py-2.5 text-center text-[16px] font-bold text-white no-underline"
                            href={ dashboardUrl }
                        >
                            View your { companyName } Dashboard
                        </Button>
                        <Hr className="my-5 border-gray-200" />
                        <Text className="text-left text-[16px] leading-6 text-gray-600">
                            If you haven't finished your integration, you might find our{ ' ' }
                            <Link className="text-indigo-600" href={ docsUrl }>
                                docs
                            </Link>{ ' ' }
                            handy.
                        </Text>
                        <Text className="text-left text-[16px] leading-6 text-gray-600">
                            Once you're ready to start accepting payments, you'll just need to
                            use your live API keys instead of your test API keys. Your account can
                            simultaneously be used for both test and live requests, so you can
                            continue testing while accepting live payments.
                        </Text>
                        <Text className="text-left text-[16px] leading-6 text-gray-600">
                            We'll be here to help you with any step along the way. You can find
                            answers to most questions and get in touch with us on our{ ' ' }
                            <Link className="text-indigo-600" href={ supportUrl }>
                                support site
                            </Link>
                            .
                        </Text>
                        <Text className="text-left text-[16px] leading-6 text-gray-600">
                            — The { companyName } team
                        </Text>
                        <Hr className="my-5 border-gray-200" />
                        { companyAddress && (
                            <Text className="text-[12px] leading-4 text-gray-500">
                                { companyAddress }
                            </Text>
                        ) }
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

WelcomeEmail.PreviewProps = {
    companyName: 'Acme Corp',
    logoUrl: '/static/company-logo.png',
    dashboardUrl: 'https://dashboard.example.com/login',
    docsUrl: 'https://docs.example.com',
    supportUrl: 'https://support.example.com',
    companyAddress: 'Acme Corp, 123 Business St, San Francisco, CA 94105',
} as WelcomeEmailProps;

export default WelcomeEmail;
